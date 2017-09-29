<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Operation\DropCollection;
use MongoDB\Operation\InsertOne;
use MongoDB\Operation\ListCollections;

class DropCollectionFunctionalTest extends FunctionalTestCase
{
    public function testDropExistingCollection()
    {
        $server = $this->getPrimaryServer();

        $insertOne = new InsertOne($this->getDatabaseName(), $this->getCollectionName(), ['x' => 1]);
        $writeResult = $insertOne->execute($server);
        $this->assertEquals(1, $writeResult->getInsertedCount());

        $operation = new DropCollection($this->getDatabaseName(), $this->getCollectionName());
        $operation->execute($server);

        $this->assertCollectionDoesNotExist($this->getCollectionName());
    }

    /**
     * @depends testDropExistingCollection
     */
    public function testDropNonexistentCollection()
    {
        $this->assertCollectionDoesNotExist($this->getCollectionName());

        $operation = new DropCollection($this->getDatabaseName(), $this->getCollectionName());
        $operation->execute($this->getPrimaryServer());
    }

    /**
     * Asserts that a collection with the given name does not exist on the
     * server.
     *
     * @param string $collectionName
     */
    private function assertCollectionDoesNotExist($collectionName)
    {
        $operation = new ListCollections($this->getDatabaseName());
        $collections = $operation->execute($this->getPrimaryServer());

        $foundCollection = null;

        foreach ($collections as $collection) {
            if ($collection->getName() === $collectionName) {
                $foundCollection = $collection;
                break;
            }
        }

        $this->assertNull($foundCollection, sprintf('Collection %s exists', $collectionName));
    }
}
