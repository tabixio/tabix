<?php

namespace MongoDB\Tests\Collection;

use MongoDB\Collection;
use MongoDB\Operation\FindOneAndReplace;
use IteratorIterator;
use LogicException;
use MultipleIterator;

/**
 * CRUD spec functional tests.
 *
 * @see https://github.com/mongodb/specifications/tree/master/source/crud/tests
 */
class CrudSpecFunctionalTest extends FunctionalTestCase
{
    private $expectedCollection;

    public function setUp()
    {
        parent::setUp();

        $this->expectedCollection = new Collection($this->manager, $this->getDatabaseName(), $this->getCollectionName() . '.expected');
        $this->expectedCollection->drop();
    }

    /**
     * @dataProvider provideSpecificationTests
     */
    public function testSpecification(array $initialData, array $test, $minServerVersion, $maxServerVersion)
    {
        $this->setName(str_replace(' ', '_', $test['description']));

        if (isset($minServerVersion) || isset($maxServerVersion)) {
            $this->checkServerVersion($minServerVersion, $maxServerVersion);
        }

        $expectedData = isset($test['outcome']['collection']['data']) ? $test['outcome']['collection']['data'] : null;
        $this->initializeData($initialData, $expectedData);

        $result = $this->executeOperation($test['operation']);
        $this->executeOutcome($test['operation'], $test['outcome'], $result);
    }

    public function provideSpecificationTests()
    {
        $testArgs = [];

        foreach (glob(__DIR__ . '/spec-tests/*/*.json') as $filename) {
            $json = json_decode(file_get_contents($filename), true);

            $minServerVersion = isset($json['minServerVersion']) ? $json['minServerVersion'] : null;
            $maxServerVersion = isset($json['maxServerVersion']) ? $json['maxServerVersion'] : null;

            foreach ($json['tests'] as $test) {
                $testArgs[] = [$json['data'], $test, $minServerVersion, $maxServerVersion];
            }
        }

        return $testArgs;
    }

    /**
     * Assert that the collections contain equivalent documents.
     *
     * @param Collection $expectedCollection
     * @param Collection $actualCollection
     */
    private function assertEquivalentCollections($expectedCollection, $actualCollection)
    {
        $mi = new MultipleIterator;
        $mi->attachIterator(new IteratorIterator($expectedCollection->find()));
        $mi->attachIterator(new IteratorIterator($actualCollection->find()));

        foreach ($mi as $documents) {
            list($expectedDocument, $actualDocument) = $documents;
            $this->assertSameDocument($expectedDocument, $actualDocument);
        }
    }

    /**
     * Checks that the server version is within the allowed bounds (if any).
     *
     * @param string|null $minServerVersion
     * @param string|null $maxServerVersion
     * @throws \PHPUnit_Framework_SkippedTestError
     */
    private function checkServerVersion($minServerVersion, $maxServerVersion)
    {
        $serverVersion = $this->getServerVersion();

        if (isset($minServerVersion) && version_compare($serverVersion, $minServerVersion, '<')) {
            $this->markTestSkipped(sprintf('Server version "%s" < minServerVersion "%s"', $serverVersion, $minServerVersion));
        }

        if (isset($maxServerVersion) && version_compare($serverVersion, $maxServerVersion, '>=')) {
            $this->markTestSkipped(sprintf('Server version "%s" >= maxServerVersion "%s"', $serverVersion, $maxServerVersion));
        }
    }

    /**
     * Executes an "operation" block.
     *
     * @param array $operation
     * @return mixed
     * @throws LogicException if the operation is unsupported
     */
    private function executeOperation(array $operation)
    {
        switch ($operation['name']) {
            case 'aggregate':
                return $this->collection->aggregate(
                    $operation['arguments']['pipeline'],
                    array_diff_key($operation['arguments'], ['pipeline' => 1])
                );

            case 'count':
            case 'find':
                return $this->collection->{$operation['name']}(
                    isset($operation['arguments']['filter']) ? $operation['arguments']['filter'] : [],
                    array_diff_key($operation['arguments'], ['filter' => 1])
                );

            case 'deleteMany':
            case 'deleteOne':
            case 'findOneAndDelete':
                return $this->collection->{$operation['name']}(
                    $operation['arguments']['filter'],
                    array_diff_key($operation['arguments'], ['filter' => 1])
                );

            case 'distinct':
                return $this->collection->distinct(
                    $operation['arguments']['fieldName'],
                    isset($operation['arguments']['filter']) ? $operation['arguments']['filter'] : [],
                    array_diff_key($operation['arguments'], ['fieldName' => 1, 'filter' => 1])
                );

            case 'findOneAndReplace':
                $operation['arguments'] = $this->prepareFindAndModifyArguments($operation['arguments']);
                // Fall through

            case 'replaceOne':
                return $this->collection->{$operation['name']}(
                    $operation['arguments']['filter'],
                    $operation['arguments']['replacement'],
                    array_diff_key($operation['arguments'], ['filter' => 1, 'replacement' => 1])
                );

            case 'findOneAndUpdate':
                $operation['arguments'] = $this->prepareFindAndModifyArguments($operation['arguments']);
                // Fall through

            case 'updateMany':
            case 'updateOne':
                return $this->collection->{$operation['name']}(
                    $operation['arguments']['filter'],
                    $operation['arguments']['update'],
                    array_diff_key($operation['arguments'], ['filter' => 1, 'update' => 1])
                );

            case 'insertMany':
                return $this->collection->insertMany(
                    $operation['arguments']['documents'],
                    array_diff_key($operation['arguments'], ['documents' => 1])
                );

            case 'insertOne':
                return $this->collection->insertOne(
                    $operation['arguments']['document'],
                    array_diff_key($operation['arguments'], ['document' => 1])
                );

            default:
                throw new LogicException('Unsupported operation: ' . $operation['name']);
        }
    }

    /**
     * Executes an "outcome" block.
     *
     * @param array $operation
     * @param array $outcome
     * @param mixed $actualResult
     * @return mixed
     * @throws LogicException if the operation is unsupported
     */
    private function executeOutcome(array $operation, array $outcome, $actualResult)
    {
        if (array_key_exists('result', $outcome)) {
            $this->executeAssertResult($operation, $outcome['result'], $actualResult);
        }

        if (isset($outcome['collection'])) {
            $actualCollection = isset($outcome['collection']['name'])
                ? new Collection($this->manager, $this->getDatabaseName(), $outcome['collection']['name'])
                : $this->collection;

            $this->assertEquivalentCollections($this->expectedCollection, $actualCollection);
        }
    }

    /**
     * Executes the "result" section of an "outcome" block.
     *
     * @param array $operation
     * @param mixed $expectedResult
     * @param mixed $actualResult
     * @throws LogicException if the operation is unsupported
     */
    private function executeAssertResult(array $operation, $expectedResult, $actualResult)
    {
        switch ($operation['name']) {
            case 'aggregate':
                /* Returning a cursor for the $out collection is optional per
                 * the CRUD specification and is not implemented in the library
                 * since we have no concept of lazy cursors. We will not assert
                 * the result here; however, assertEquivalentCollections() will
                 * assert the output collection's contents later.
                 */
                if ( ! \MongoDB\is_last_pipeline_operator_out($operation['arguments']['pipeline'])) {
                    $this->assertSameDocuments($expectedResult, $actualResult);
                }
                break;

            case 'count':
                $this->assertSame($expectedResult, $actualResult);
                break;

            case 'distinct':
                $this->assertSameDocument(
                    ['values' => $expectedResult],
                    ['values' => $actualResult]
                );
                break;

            case 'find':
                $this->assertSameDocuments($expectedResult, $actualResult);
                break;

            case 'deleteMany':
            case 'deleteOne':
                $this->assertInstanceOf('MongoDB\DeleteResult', $actualResult);

                if (isset($expectedResult['deletedCount'])) {
                    $this->assertSame($expectedResult['deletedCount'], $actualResult->getDeletedCount());
                }
                break;

            case 'findOneAndDelete':
            case 'findOneAndReplace':
            case 'findOneAndUpdate':
                $this->assertSameDocument(
                    ['result' => $expectedResult],
                    ['result' => $actualResult]
                );
                break;

            case 'insertMany':
                $this->assertInstanceOf('MongoDB\InsertManyResult', $actualResult);

                if (isset($expectedResult['insertedCount'])) {
                    $this->assertSame($expectedResult['insertedCount'], $actualResult->getInsertedCount());
                }

                if (isset($expectedResult['insertedIds'])) {
                    $this->assertSameDocument(
                        ['insertedIds' => $expectedResult['insertedIds']],
                        ['insertedIds' => $actualResult->getInsertedIds()]
                    );
                }
                break;

            case 'insertOne':
                $this->assertInstanceOf('MongoDB\InsertOneResult', $actualResult);

                if (isset($expectedResult['insertedCount'])) {
                    $this->assertSame($expectedResult['insertedCount'], $actualResult->getInsertedCount());
                }

                if (isset($expectedResult['insertedId'])) {
                    $this->assertSameDocument(
                        ['insertedId' => $expectedResult['insertedId']],
                        ['insertedId' => $actualResult->getInsertedId()]
                    );
                }
                break;

            case 'replaceOne':
            case 'updateMany':
            case 'updateOne':
                $this->assertInstanceOf('MongoDB\UpdateResult', $actualResult);

                if (isset($expectedResult['matchedCount'])) {
                    $this->assertSame($expectedResult['matchedCount'], $actualResult->getMatchedCount());
                }

                if (isset($expectedResult['modifiedCount'])) {
                    $this->assertSame($expectedResult['modifiedCount'], $actualResult->getModifiedCount());
                }

                if (isset($expectedResult['upsertedCount'])) {
                    $this->assertSame($expectedResult['upsertedCount'], $actualResult->getUpsertedCount());
                }

                if (array_key_exists('upsertedId', $expectedResult)) {
                    $this->assertSameDocument(
                        ['upsertedId' => $expectedResult['upsertedId']],
                        ['upsertedId' => $actualResult->getUpsertedId()]
                    );
                }
                break;

            default:
                throw new LogicException('Unsupported operation: ' . $operationName);
        }
    }

    /**
     * Initializes data in the test collections.
     *
     * @param array $initialData
     * @param array $expectedData
     */
    private function initializeData(array $initialData, array $expectedData = null)
    {
        if ( ! empty($initialData)) {
            $this->collection->insertMany($initialData);
        }

        if ( ! empty($expectedData)) {
            $this->expectedCollection->insertMany($expectedData);
        }
    }

    /**
     * Prepares arguments for findOneAndReplace and findOneAndUpdate operations.
     *
     * @param array $arguments
     * @return array
     */
    private function prepareFindAndModifyArguments($arguments)
    {
        if (isset($arguments['returnDocument'])) {
            $arguments['returnDocument'] = ('after' === strtolower($arguments['returnDocument']))
                ? FindOneAndReplace::RETURN_DOCUMENT_AFTER
                : FindOneAndReplace::RETURN_DOCUMENT_BEFORE;
        }

        return $arguments;
    }
}
