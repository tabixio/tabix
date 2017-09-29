<?php

namespace MongoDB\Tests\GridFS;

use MongoDB\Collection;
use MongoDB\BSON\Binary;
use MongoDB\BSON\ObjectId;
use MongoDB\BSON\UTCDateTime;
use MongoDB\Operation\BulkWrite;
use DateTime;
use Exception;
use IteratorIterator;
use LogicException;
use MultipleIterator;

/**
 * GridFS spec functional tests.
 *
 * @see https://github.com/mongodb/specifications/tree/master/source/gridfs/tests
 */
class SpecFunctionalTest extends FunctionalTestCase
{
    private $expectedChunksCollection;
    private $expectedFilesCollection;

    public function setUp()
    {
        parent::setUp();

        $this->expectedFilesCollection = new Collection($this->manager, $this->getDatabaseName(), 'expected.files');
        $this->expectedFilesCollection->drop();

        $this->expectedChunksCollection = new Collection($this->manager, $this->getDatabaseName(), 'expected.chunks');
        $this->expectedChunksCollection->drop();
    }

    /**
     * @dataProvider provideSpecificationTests
     */
    public function testSpecification(array $initialData, array $test)
    {
        $this->setName(str_replace(' ', '_', $test['description']));
        $this->initializeData($initialData);

        if (isset($test['arrange'])) {
            foreach ($test['arrange']['data'] as $dataModification) {
                $this->executeDataModification($dataModification);
            }
        }

        try {
            $result = $this->executeAct($test['act']);
        } catch (Exception $e) {
            $result = $e;
        }

        if (isset($test['assert'])) {
            $this->executeAssert($test['assert'], $result);
        }
    }

    public function provideSpecificationTests()
    {
        $testArgs = [];

        foreach (glob(__DIR__ . '/spec-tests/*.json') as $filename) {
            $json = json_decode(file_get_contents($filename), true);

            foreach ($json['tests'] as $test) {
                $testArgs[] = [$json['data'], $test];
            }
        }

        return $testArgs;
    }

    /**
     * Assert that the collections contain equivalent documents.
     *
     * This method will resolve references within the expected collection's
     * documents before comparing documents. Occurrences of "*result" in the
     * expected collection's documents will be replaced with the actual result.
     * Occurrences of "*actual" in the expected collection's documents will be
     * replaced with the corresponding value in the actual collection's document
     * being compared.
     *
     * @param Collection $expectedCollection
     * @param Collection $actualCollection
     * @param mixed      $actualResult
     */
    private function assertEquivalentCollections($expectedCollection, $actualCollection, $actualResult)
    {
        $mi = new MultipleIterator;
        $mi->attachIterator(new IteratorIterator($expectedCollection->find()));
        $mi->attachIterator(new IteratorIterator($actualCollection->find()));

        foreach ($mi as $documents) {
            list($expectedDocument, $actualDocument) = $documents;

            foreach ($expectedDocument as $key => $value) {
                if ( ! is_string($value)) {
                    continue;
                }

                if ($value === '*result') {
                    $expectedDocument[$key] = $actualResult;
                }

                if ( ! strncmp($value, '*actual_', 8)) {
                    $expectedDocument[$key] = $actualDocument[$key];
                }
            }

            $this->assertSameDocument($expectedDocument, $actualDocument);
        }
    }

    /**
     * Convert encoded types in the array and return the modified array.
     *
     * Nested arrays with "$oid" and "$date" keys will be converted to ObjectID
     * and UTCDateTime instances, respectively. Nested arrays with "$hex" keys
     * will be converted to a string or Binary object.
     *
     * @param param   $data
     * @param boolean $createBinary If true, convert "$hex" values to a Binary
     * @return array
     */
    private function convertTypes(array $data, $createBinary = true)
    {
        /* array_walk_recursive() only visits leaf nodes within the array, so we
         * need to manually recurse.
         */
        array_walk($data, function(&$value) use ($createBinary) {
            if ( ! is_array($value)) {
                return;
            }

            if (isset($value['$oid'])) {
                $value = new ObjectId($value['$oid']);
                return;
            }

            if (isset($value['$hex'])) {
                $value = $createBinary
                    ? new Binary(hex2bin($value['$hex']), Binary::TYPE_GENERIC)
                    : hex2bin($value['$hex']);

                return;
            }

            if (isset($value['$date'])) {
                $value = new UTCDateTime(new DateTime($value['$date']));
                return;
            }

            $value = $this->convertTypes($value, $createBinary);
        });

        return $data;
    }

    /**
     * Executes an "act" block.
     *
     * @param array $act
     * @return mixed
     * @throws LogicException if the operation is unsupported
     */
    private function executeAct(array $act)
    {
        $act = $this->convertTypes($act, false);

        switch ($act['operation']) {
            case 'delete':
                return $this->bucket->delete($act['arguments']['id']);

            case 'download':
                return stream_get_contents($this->bucket->openDownloadStream($act['arguments']['id']));

            case 'download_by_name':
                return stream_get_contents($this->bucket->openDownloadStreamByName(
                    $act['arguments']['filename'],
                    isset($act['arguments']['options']) ? $act['arguments']['options'] : []
                ));

            case 'upload':
                return $this->bucket->uploadFromStream(
                    $act['arguments']['filename'],
                    $this->createStream($act['arguments']['source']),
                    isset($act['arguments']['options']) ? $act['arguments']['options'] : []
                );

            default:
                throw new LogicException('Unsupported act: ' . $act['operation']);
        }
    }

    /**
     * Executes an "assert" block.
     *
     * @param array $assert
     * @param mixed $actualResult
     * @return mixed
     * @throws LogicException if the operation is unsupported
     */
    private function executeAssert(array $assert, $actualResult)
    {
        if (isset($assert['error'])) {
            $this->assertInstanceOf($this->getExceptionClassForError($assert['error']), $actualResult);
        }

        if (isset($assert['result'])) {
            $this->executeAssertResult($assert['result'], $actualResult);
        }

        if ( ! isset($assert['data'])) {
            return;
        }

        /* Since "*actual" may be used for an expected document's "_id", append
         * a unique value to avoid duplicate key exceptions.
         */
        array_walk_recursive($assert['data'], function(&$value) {
            if ($value === '*actual') {
                $value .= '_' . new ObjectId;
            }
        });

        foreach ($assert['data'] as $dataModification) {
            $this->executeDataModification($dataModification);
        }

        $this->assertEquivalentCollections($this->expectedFilesCollection, $this->filesCollection, $actualResult);
        $this->assertEquivalentCollections($this->expectedChunksCollection, $this->chunksCollection, $actualResult);
    }

    /**
     * Executes the "result" section of an "assert" block.
     *
     * @param mixed $expectedResult
     * @param mixed $actualResult
     * @throws LogicException if the result assertion is unsupported
     */
    private function executeAssertResult($expectedResult, $actualResult)
    {
        if ($expectedResult === 'void') {
            return $this->assertNull($actualResult);
        }

        if ($expectedResult === '&result') {
            // Do nothing; assertEquivalentCollections() will handle this
            return;
        }

        if (isset($expectedResult['$hex'])) {
            return $this->assertSame(hex2bin($expectedResult['$hex']), $actualResult);
        }

        throw new LogicException('Unsupported result assertion: ' . var_export($expectedResult, true));
    }

    /**
     * Executes a data modification from an "arrange" or "assert" block.
     *
     * @param array $dataModification
     * @return mixed
     * @throws LogicException if the operation or collection is unsupported
     */
    private function executeDataModification(array $dataModification)
    {
        foreach ($dataModification as $type => $collectionName) {
            break;
        }

        if ( ! in_array($collectionName, ['fs.files', 'fs.chunks', 'expected.files', 'expected.chunks'])) {
            throw new LogicException('Unsupported collection: ' . $collectionName);
        }

        $dataModification = $this->convertTypes($dataModification);
        $operations = [];

        switch ($type) {
            case 'delete':
                foreach ($dataModification['deletes'] as $delete) {
                    $operations[] = [ ($delete['limit'] === 1 ? 'deleteOne' : 'deleteMany') => [ $delete['q'] ] ];
                }

                break;

            case 'insert':
                foreach ($dataModification['documents'] as $document) {
                    $operations[] = [ 'insertOne' => [ $document ] ];
                }

                break;

            case 'update':
                foreach ($dataModification['updates'] as $update) {
                    $operations[] = [ 'updateOne' => [ $update['q'], $update['u'] ] ];
                }

                break;

            default:
                throw new LogicException('Unsupported arrangement: ' . $type);
        }

        $bulk = new BulkWrite($this->getDatabaseName(), $collectionName, $operations);

        return $bulk->execute($this->getPrimaryServer());
    }

    /**
     * Returns the exception class for the "error" section of an "assert" block.
     *
     * @param string $error
     * @return string
     * @throws LogicException if the error is unsupported
     */
    private function getExceptionClassForError($error)
    {
        switch ($error) {
            case 'FileNotFound':
            case 'RevisionNotFound':
                return 'MongoDB\GridFS\Exception\FileNotFoundException';

            case 'ChunkIsMissing':
            case 'ChunkIsWrongSize':
                /* Although ReadableStream throws a CorruptFileException, the
                 * stream wrapper will convert it to a PHP error of type
                 * E_USER_WARNING. */
                return 'PHPUnit_Framework_Error_Warning';

            default:
                throw new LogicException('Unsupported error: ' . $error);
        }
    }

    /**
     * Initializes data in the files and chunks collections.
     *
     * @param array $data
     */
    private function initializeData(array $data)
    {
        $data = $this->convertTypes($data);

        if ( ! empty($data['files'])) {
            $this->filesCollection->insertMany($data['files']);
            $this->expectedFilesCollection->insertMany($data['files']);
        }

        if ( ! empty($data['chunks'])) {
            $this->chunksCollection->insertMany($data['chunks']);
            $this->expectedChunksCollection->insertMany($data['chunks']);
        }
    }
}
