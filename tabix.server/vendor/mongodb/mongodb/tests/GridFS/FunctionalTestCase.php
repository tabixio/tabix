<?php

namespace MongoDB\Tests\GridFS;

use MongoDB\Collection;
use MongoDB\GridFS\Bucket;
use MongoDB\Tests\FunctionalTestCase as BaseFunctionalTestCase;

/**
 * Base class for GridFS functional tests.
 */
abstract class FunctionalTestCase extends BaseFunctionalTestCase
{
    protected $bucket;
    protected $chunksCollection;
    protected $filesCollection;

    public function setUp()
    {
        parent::setUp();

        $this->bucket = new Bucket($this->manager, $this->getDatabaseName());
        $this->bucket->drop();

        $this->chunksCollection = new Collection($this->manager, $this->getDatabaseName(), 'fs.chunks');
        $this->filesCollection = new Collection($this->manager, $this->getDatabaseName(), 'fs.files');
    }

    /**
     * Asserts that a variable is a stream containing the expected data.
     *
     * Note: this will seek to the beginning of the stream before reading.
     *
     * @param string   $expectedContents
     * @param resource $stream
     */
    protected function assertStreamContents($expectedContents, $stream)
    {
        $this->assertInternalType('resource', $stream);
        $this->assertSame('stream', get_resource_type($stream));
        $this->assertEquals($expectedContents, stream_get_contents($stream));
    }

    /**
     * Creates an in-memory stream with the given data.
     *
     * @param string $data
     * @return resource
     */
    protected function createStream($data = '')
    {
        $stream = fopen('php://temp', 'w+b');
        fwrite($stream, $data);
        rewind($stream);

        return $stream;
    }
}
