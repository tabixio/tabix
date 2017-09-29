<?php

namespace MongoDB\Tests\Database;

use MongoDB\Driver\BulkWrite;
use MongoDB\Model\CollectionInfo;
use InvalidArgumentException;

/**
 * Functional tests for collection management methods.
 */
class CollectionManagementFunctionalTest extends FunctionalTestCase
{
    public function testCreateCollection()
    {
        $that = $this;
        $basicCollectionName = $this->getCollectionName() . '.basic';

        $commandResult = $this->database->createCollection($basicCollectionName);
        $this->assertCommandSucceeded($commandResult);
        $this->assertCollectionExists($basicCollectionName, function(CollectionInfo $info) use ($that) {
            $that->assertFalse($info->isCapped());
        });

        $cappedCollectionName = $this->getCollectionName() . '.capped';
        $cappedCollectionOptions = [
            'capped' => true,
            'max' => 100,
            'size' => 1048576,
        ];

        $commandResult = $this->database->createCollection($cappedCollectionName, $cappedCollectionOptions);
        $this->assertCommandSucceeded($commandResult);
        $this->assertCollectionExists($cappedCollectionName, function(CollectionInfo $info) use ($that) {
            $that->assertTrue($info->isCapped());
            $that->assertEquals(100, $info->getCappedMax());
            $that->assertEquals(1048576, $info->getCappedSize());
        });
    }

    public function testDropCollection()
    {
        $bulkWrite = new BulkWrite();
        $bulkWrite->insert(['x' => 1]);

        $writeResult = $this->manager->executeBulkWrite($this->getNamespace(), $bulkWrite);
        $this->assertEquals(1, $writeResult->getInsertedCount());

        $commandResult = $this->database->dropCollection($this->getCollectionName());
        $this->assertCommandSucceeded($commandResult);
        $this->assertCollectionCount($this->getNamespace(), 0);
    }

    public function testListCollections()
    {
        $commandResult = $this->database->createCollection($this->getCollectionName());
        $this->assertCommandSucceeded($commandResult);

        $collections = $this->database->listCollections();
        $this->assertInstanceOf('MongoDB\Model\CollectionInfoIterator', $collections);

        foreach ($collections as $collection) {
            $this->assertInstanceOf('MongoDB\Model\CollectionInfo', $collection);
        }
    }

    public function testListCollectionsWithFilter()
    {
        $commandResult = $this->database->createCollection($this->getCollectionName());
        $this->assertCommandSucceeded($commandResult);

        $collectionName = $this->getCollectionName();
        $options = ['filter' => ['name' => $collectionName]];

        $collections = $this->database->listCollections($options);
        $this->assertInstanceOf('MongoDB\Model\CollectionInfoIterator', $collections);

        foreach ($collections as $collection) {
            $this->assertInstanceOf('MongoDB\Model\CollectionInfo', $collection);
            $this->assertEquals($collectionName, $collection->getName());
        }
    }

    /**
     * Asserts that a collection with the given name exists in the database.
     *
     * An optional $callback may be provided, which should take a CollectionInfo
     * argument as its first and only parameter. If a CollectionInfo matching
     * the given name is found, it will be passed to the callback, which may
     * perform additional assertions.
     *
     * @param callable $callback
     */
    private function assertCollectionExists($collectionName, $callback = null)
    {
        if ($callback !== null && ! is_callable($callback)) {
            throw new InvalidArgumentException('$callback is not a callable');
        }

        $collections = $this->database->listCollections();

        $foundCollection = null;

        foreach ($collections as $collection) {
            if ($collection->getName() === $collectionName) {
                $foundCollection = $collection;
                break;
            }
        }

        $this->assertNotNull($foundCollection, sprintf('Found %s collection in the database', $collectionName));

        if ($callback !== null) {
            call_user_func($callback, $foundCollection);
        }
    }
}
