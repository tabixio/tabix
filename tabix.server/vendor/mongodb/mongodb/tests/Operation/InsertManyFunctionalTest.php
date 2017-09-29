<?php

namespace MongoDB\Tests\Collection;

use MongoDB\InsertManyResult;
use MongoDB\Driver\WriteConcern;
use MongoDB\Model\BSONDocument;
use MongoDB\Operation\InsertMany;

class InsertManyFunctionalTest extends FunctionalTestCase
{
    public function testInsertMany()
    {
        $documents = [
            ['_id' => 'foo', 'x' => 11],
            ['x' => 22],
            (object) ['_id' => 'bar', 'x' => 33],
            new BSONDocument(['_id' => 'baz', 'x' => 44]),
        ];

        $operation = new InsertMany($this->getDatabaseName(), $this->getCollectionName(), $documents);
        $result = $operation->execute($this->getPrimaryServer());

        $this->assertInstanceOf('MongoDB\InsertManyResult', $result);
        $this->assertSame(4, $result->getInsertedCount());

        $insertedIds = $result->getInsertedIds();
        $this->assertSame('foo', $insertedIds[0]);
        $this->assertInstanceOf('MongoDB\BSON\ObjectId', $insertedIds[1]);
        $this->assertSame('bar', $insertedIds[2]);
        $this->assertSame('baz', $insertedIds[3]);

        $expected = [
            ['_id' => 'foo', 'x' => 11],
            ['_id' => $insertedIds[1], 'x' => 22],
            ['_id' => 'bar', 'x' => 33],
            ['_id' => 'baz', 'x' => 44],
        ];

        $this->assertSameDocuments($expected, $this->collection->find());
    }

    public function testUnacknowledgedWriteConcern()
    {
        $documents = [['x' => 11]];
        $options = ['writeConcern' => new WriteConcern(0)];

        $operation = new InsertMany($this->getDatabaseName(), $this->getCollectionName(), $documents, $options);
        $result = $operation->execute($this->getPrimaryServer());

        $this->assertFalse($result->isAcknowledged());

        return $result;
    }

    /**
     * @depends testUnacknowledgedWriteConcern
     * @expectedException MongoDB\Exception\BadMethodCallException
     * @expectedExceptionMessageRegExp /[\w:\\]+ should not be called for an unacknowledged write result/
     */
    public function testUnacknowledgedWriteConcernAccessesInsertedCount(InsertManyResult $result)
    {
        $result->getInsertedCount();
    }

    /**
     * @depends testUnacknowledgedWriteConcern
     */
    public function testUnacknowledgedWriteConcernAccessesInsertedId(InsertManyResult $result)
    {
        $this->assertInstanceOf('MongoDB\BSON\ObjectId', $result->getInsertedIds()[0]);
    }
}
