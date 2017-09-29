<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Operation\DropCollection;
use MongoDB\Operation\InsertOne;
use MongoDB\Operation\ListIndexes;

class ListIndexesFunctionalTest extends FunctionalTestCase
{
    public function testListIndexesForNewlyCreatedCollection()
    {
        $operation = new DropCollection($this->getDatabaseName(), $this->getCollectionName());
        $operation->execute($this->getPrimaryServer());

        $insertOne = new InsertOne($this->getDatabaseName(), $this->getCollectionName(), ['x' => 1]);
        $writeResult = $insertOne->execute($this->getPrimaryServer());
        $this->assertEquals(1, $writeResult->getInsertedCount());

        $operation = new ListIndexes($this->getDatabaseName(), $this->getCollectionName());
        $indexes = $operation->execute($this->getPrimaryServer());

        $this->assertInstanceOf('MongoDB\Model\IndexInfoIterator', $indexes);

        // Convert the CursorInfoIterator to an array since we cannot rewind its cursor
        $indexes = iterator_to_array($indexes);

        $this->assertCount(1, $indexes);

        foreach ($indexes as $index) {
            $this->assertInstanceOf('MongoDB\Model\IndexInfo', $index);
            $this->assertEquals(['_id' => 1], $index->getKey());
        }
    }

    public function testListIndexesForNonexistentCollection()
    {
        $operation = new DropCollection($this->getDatabaseName(), $this->getCollectionName());
        $operation->execute($this->getPrimaryServer());

        $operation = new ListIndexes($this->getDatabaseName(), $this->getCollectionName());
        $indexes = $operation->execute($this->getPrimaryServer());

        $this->assertCount(0, $indexes);
    }
}
