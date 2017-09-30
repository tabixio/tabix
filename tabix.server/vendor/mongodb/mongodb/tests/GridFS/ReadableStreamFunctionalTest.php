<?php

namespace MongoDB\Tests\GridFS;

use MongoDB\BSON\Binary;
use MongoDB\GridFS\CollectionWrapper;
use MongoDB\GridFS\ReadableStream;

/**
 * Functional tests for the internal ReadableStream class.
 */
class ReadableStreamFunctionalTest extends FunctionalTestCase
{
    private $collectionWrapper;

    public function setUp()
    {
        parent::setUp();

        $this->collectionWrapper = new CollectionWrapper($this->manager, $this->getDatabaseName(), 'fs');

        $this->filesCollection->insertMany([
            ['_id' => 'length-0', 'length' => 0, 'chunkSize' => 4],
            ['_id' => 'length-0-with-empty-chunk', 'length' => 0, 'chunkSize' => 4],
            ['_id' => 'length-2', 'length' => 2, 'chunkSize' => 4],
            ['_id' => 'length-8', 'length' => 8, 'chunkSize' => 4],
            ['_id' => 'length-10', 'length' => 10, 'chunkSize' => 4],
        ]);

        $this->chunksCollection->insertMany([
            ['_id' => 1, 'files_id' => 'length-0-with-empty-chunk', 'n' => 0, 'data' => new Binary('', Binary::TYPE_GENERIC)],
            ['_id' => 2, 'files_id' => 'length-2', 'n' => 0, 'data' => new Binary('ab', Binary::TYPE_GENERIC)],
            ['_id' => 3, 'files_id' => 'length-8', 'n' => 0, 'data' => new Binary('abcd', Binary::TYPE_GENERIC)],
            ['_id' => 4, 'files_id' => 'length-8', 'n' => 1, 'data' => new Binary('efgh', Binary::TYPE_GENERIC)],
            ['_id' => 5, 'files_id' => 'length-10', 'n' => 0, 'data' => new Binary('abcd', Binary::TYPE_GENERIC)],
            ['_id' => 6, 'files_id' => 'length-10', 'n' => 1, 'data' => new Binary('efgh', Binary::TYPE_GENERIC)],
            ['_id' => 7, 'files_id' => 'length-10', 'n' => 2, 'data' => new Binary('ij', Binary::TYPE_GENERIC)],
        ]);
    }

    public function testValidConstructorFileDocument()
    {
        new ReadableStream($this->collectionWrapper, (object) ['_id' => null, 'chunkSize' => 1, 'length' => 0]);
    }

    /**
     * @expectedException MongoDB\GridFS\Exception\CorruptFileException
     * @dataProvider provideInvalidConstructorFileDocuments
     */
    public function testConstructorFileDocumentChecks($file)
    {
        new ReadableStream($this->collectionWrapper, $file);
    }

    public function provideInvalidConstructorFileDocuments()
    {
        $options = [];

        foreach ($this->getInvalidIntegerValues() as $value) {
            $options[][] = (object) ['_id' => 1, 'chunkSize' => $value, 'length' => 0];
        }

        foreach ($this->getInvalidIntegerValues() as $value) {
            $options[][] = (object) ['_id' => 1, 'chunkSize' => 1, 'length' => $value];
        }

        $options[][] = (object) ['_id' => 1, 'chunkSize' => 0, 'length' => 0];
        $options[][] = (object) ['_id' => 1, 'chunkSize' => 1, 'length' => -1];
        $options[][] = (object) ['chunkSize' => 1, 'length' => 0];

        return $options;
    }

    /**
     * @dataProvider provideFileIdAndExpectedBytes
     */
    public function testReadBytes($fileId, $length, $expectedBytes)
    {
        $fileDocument = $this->collectionWrapper->findFileById($fileId);
        $stream = new ReadableStream($this->collectionWrapper, $fileDocument);

        $this->assertSame($expectedBytes, $stream->readBytes($length));
    }

    public function provideFileIdAndExpectedBytes()
    {
        return [
            ['length-0', 0, ''],
            ['length-0', 2, ''],
            ['length-0-with-empty-chunk', 0, ''],
            ['length-0-with-empty-chunk', 2, ''],
            ['length-2', 0, ''],
            ['length-2', 2, 'ab'],
            ['length-2', 4, 'ab'],
            ['length-8', 0, ''],
            ['length-8', 2, 'ab'],
            ['length-8', 4, 'abcd'],
            ['length-8', 6, 'abcdef'],
            ['length-8', 8, 'abcdefgh'],
            ['length-8', 10, 'abcdefgh'],
            ['length-10', 0, ''],
            ['length-10', 2, 'ab'],
            ['length-10', 4, 'abcd'],
            ['length-10', 6, 'abcdef'],
            ['length-10', 8, 'abcdefgh'],
            ['length-10', 10, 'abcdefghij'],
            ['length-10', 12, 'abcdefghij'],
        ];
    }

    /**
     * @dataProvider provideFileIdAndExpectedBytes
     */
    public function testReadBytesCalledMultipleTimes($fileId, $length, $expectedBytes)
    {
        $fileDocument = $this->collectionWrapper->findFileById($fileId);
        $stream = new ReadableStream($this->collectionWrapper, $fileDocument);

        for ($i = 0; $i < $length; $i++) {
            $expectedByte = isset($expectedBytes[$i]) ? $expectedBytes[$i] : '';
            $this->assertSame($expectedByte, $stream->readBytes(1));
        }
    }

    /**
     * @expectedException MongoDB\GridFS\Exception\CorruptFileException
     * @expectedExceptionMessage Chunk not found for index "2"
     */
    public function testReadBytesWithMissingChunk()
    {
        $this->chunksCollection->deleteOne(['files_id' => 'length-10', 'n' => 2]);

        $fileDocument = $this->collectionWrapper->findFileById('length-10');
        $stream = new ReadableStream($this->collectionWrapper, $fileDocument);

        $stream->readBytes(10);
    }

    /**
     * @expectedException MongoDB\GridFS\Exception\CorruptFileException
     * @expectedExceptionMessage Expected chunk to have index "1" but found "2"
     */
    public function testReadBytesWithUnexpectedChunkIndex()
    {
        $this->chunksCollection->deleteOne(['files_id' => 'length-10', 'n' => 1]);

        $fileDocument = $this->collectionWrapper->findFileById('length-10');
        $stream = new ReadableStream($this->collectionWrapper, $fileDocument);

        $stream->readBytes(10);
    }

    /**
     * @expectedException MongoDB\GridFS\Exception\CorruptFileException
     * @expectedExceptionMessage Expected chunk to have size "2" but found "1"
     */
    public function testReadBytesWithUnexpectedChunkSize()
    {
        $this->chunksCollection->updateOne(
            ['files_id' => 'length-10', 'n' => 2],
            ['$set' => ['data' => new Binary('i', Binary::TYPE_GENERIC)]]
        );

        $fileDocument = $this->collectionWrapper->findFileById('length-10');
        $stream = new ReadableStream($this->collectionWrapper, $fileDocument);

        $stream->readBytes(10);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     */
    public function testReadBytesWithNegativeLength()
    {
        $fileDocument = $this->collectionWrapper->findFileById('length-0');
        $stream = new ReadableStream($this->collectionWrapper, $fileDocument);

        $stream->readBytes(-1);
    }
}
