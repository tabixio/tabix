<?php

namespace MongoDB\Tests\Collection;

use MongoDB\BulkWriteResult;
use MongoDB\Driver\BulkWrite as Bulk;
use MongoDB\Driver\WriteConcern;
use MongoDB\Model\BSONDocument;
use MongoDB\Operation\BulkWrite;

class BulkWriteFunctionalTest extends FunctionalTestCase
{
    private $omitModifiedCount;

    public function setUp()
    {
        parent::setUp();

        $this->omitModifiedCount = version_compare($this->getServerVersion(), '2.6.0', '<');
    }

    public function testInserts()
    {
        $ops = [
            ['insertOne' => [['_id' => 1, 'x' => 11]]],
            ['insertOne' => [['x' => 22]]],
            ['insertOne' => [(object) ['_id' => 'foo', 'x' => 33]]],
            ['insertOne' => [new BSONDocument(['_id' => 'bar', 'x' => 44])]],
        ];

        $operation = new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), $ops);
        $result = $operation->execute($this->getPrimaryServer());

        $this->assertInstanceOf('MongoDB\BulkWriteResult', $result);
        $this->assertSame(4, $result->getInsertedCount());

        $insertedIds = $result->getInsertedIds();
        $this->assertSame(1, $insertedIds[0]);
        $this->assertInstanceOf('MongoDB\BSON\ObjectId', $insertedIds[1]);
        $this->assertSame('foo', $insertedIds[2]);
        $this->assertSame('bar', $insertedIds[3]);

        $expected = [
            ['_id' => 1, 'x' => 11],
            ['_id' => $insertedIds[1], 'x' => 22],
            ['_id' => 'foo', 'x' => 33],
            ['_id' => 'bar', 'x' => 44],
        ];

        $this->assertSameDocuments($expected, $this->collection->find());
    }

    public function testUpdates()
    {
        $this->createFixtures(4);

        $ops = [
            ['updateOne' => [['_id' => 2], ['$inc' => ['x' => 1]]]],
            ['updateMany' => [['_id' => ['$gt' => 2]], ['$inc' => ['x' => -1]]]],
            ['updateOne' => [['_id' => 5], ['$set' => ['x' => 55]], ['upsert' => true]]],
            ['updateOne' => [['x' => 66], ['$set' => ['x' => 66]], ['upsert' => true]]],
            ['updateMany' => [['x' => ['$gt' => 50]], ['$inc' => ['x' => 1]]]],
        ];

        $operation = new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), $ops);
        $result = $operation->execute($this->getPrimaryServer());

        $this->assertInstanceOf('MongoDB\BulkWriteResult', $result);
        $this->assertSame(5, $result->getMatchedCount());
        $this->omitModifiedCount or $this->assertSame(5, $result->getModifiedCount());
        $this->assertSame(2, $result->getUpsertedCount());

        $upsertedIds = $result->getUpsertedIds();
        $this->assertSame(5, $upsertedIds[2]);
        $this->assertInstanceOf('MongoDB\BSON\ObjectId', $upsertedIds[3]);

        $expected = [
            ['_id' => 1, 'x' => 11],
            ['_id' => 2, 'x' => 23],
            ['_id' => 3, 'x' => 32],
            ['_id' => 4, 'x' => 43],
            ['_id' => 5, 'x' => 56],
            ['_id' => $upsertedIds[3], 'x' => 67],
        ];

        $this->assertSameDocuments($expected, $this->collection->find());
    }

    public function testDeletes()
    {
        $this->createFixtures(4);

        $ops = [
            ['deleteOne' => [['_id' => 1]]],
            ['deleteMany' => [['_id' => ['$gt' => 2]]]],
        ];

        $operation = new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), $ops);
        $result = $operation->execute($this->getPrimaryServer());

        $this->assertInstanceOf('MongoDB\BulkWriteResult', $result);
        $this->assertSame(3, $result->getDeletedCount());

        $expected = [
            ['_id' => 2, 'x' => 22],
        ];

        $this->assertSameDocuments($expected, $this->collection->find());
    }

    public function testMixedOrderedOperations()
    {
        $this->createFixtures(3);

        $ops = [
            ['updateOne' => [['_id' => ['$gt' => 1]], ['$inc' => ['x' => 1]]]],
            ['updateMany' => [['_id' => ['$gt' => 1]], ['$inc' => ['x' => 1]]]],
            ['insertOne' => [['_id' => 4, 'x' => 44]]],
            ['deleteMany' => [['x' => ['$nin' => [24, 34]]]]],
            ['replaceOne' => [['_id' => 4], ['_id' => 4, 'x' => 44], ['upsert' => true]]],
        ];

        $operation = new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), $ops);
        $result = $operation->execute($this->getPrimaryServer());

        $this->assertInstanceOf('MongoDB\BulkWriteResult', $result);

        $this->assertSame(1, $result->getInsertedCount());
        $this->assertSame([2 => 4], $result->getInsertedIds());

        $this->assertSame(3, $result->getMatchedCount());
        $this->omitModifiedCount or $this->assertSame(3, $result->getModifiedCount());
        $this->assertSame(1, $result->getUpsertedCount());
        $this->assertSame([4 => 4], $result->getUpsertedIds());

        $this->assertSame(2, $result->getDeletedCount());

        $expected = [
            ['_id' => 2, 'x' => 24],
            ['_id' => 3, 'x' => 34],
            ['_id' => 4, 'x' => 44],
        ];

        $this->assertSameDocuments($expected, $this->collection->find());
    }

    public function testUnacknowledgedWriteConcern()
    {
        $ops = [['insertOne' => [['_id' => 1]]]];
        $options = ['writeConcern' => new WriteConcern(0)];
        $operation = new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), $ops, $options);
        $result = $operation->execute($this->getPrimaryServer());

        $this->assertFalse($result->isAcknowledged());

        return $result;
    }

    /**
     * @depends testUnacknowledgedWriteConcern
     * @expectedException MongoDB\Exception\BadMethodCallException
     * @expectedExceptionMessageRegExp /[\w:\\]+ should not be called for an unacknowledged write result/
     */
    public function testUnacknowledgedWriteConcernAccessesDeletedCount(BulkWriteResult $result)
    {
        $result->getDeletedCount();
    }

    /**
     * @depends testUnacknowledgedWriteConcern
     * @expectedException MongoDB\Exception\BadMethodCallException
     * @expectedExceptionMessageRegExp /[\w:\\]+ should not be called for an unacknowledged write result/
     */
    public function testUnacknowledgedWriteConcernAccessesInsertCount(BulkWriteResult $result)
    {
        $result->getInsertedCount();
    }

    /**
     * @depends testUnacknowledgedWriteConcern
     * @expectedException MongoDB\Exception\BadMethodCallException
     * @expectedExceptionMessageRegExp /[\w:\\]+ should not be called for an unacknowledged write result/
     */
    public function testUnacknowledgedWriteConcernAccessesMatchedCount(BulkWriteResult $result)
    {
        $result->getMatchedCount();
    }

    /**
     * @depends testUnacknowledgedWriteConcern
     * @expectedException MongoDB\Exception\BadMethodCallException
     * @expectedExceptionMessageRegExp /[\w:\\]+ should not be called for an unacknowledged write result/
     */
    public function testUnacknowledgedWriteConcernAccessesModifiedCount(BulkWriteResult $result)
    {
        $result->getModifiedCount();
    }

    /**
     * @depends testUnacknowledgedWriteConcern
     * @expectedException MongoDB\Exception\BadMethodCallException
     * @expectedExceptionMessageRegExp /[\w:\\]+ should not be called for an unacknowledged write result/
     */
    public function testUnacknowledgedWriteConcernAccessesUpsertedCount(BulkWriteResult $result)
    {
        $result->getUpsertedCount();
    }

    /**
     * @depends testUnacknowledgedWriteConcern
     * @expectedException MongoDB\Exception\BadMethodCallException
     * @expectedExceptionMessageRegExp /[\w:\\]+ should not be called for an unacknowledged write result/
     */
    public function testUnacknowledgedWriteConcernAccessesUpsertedIds(BulkWriteResult $result)
    {
        $result->getUpsertedIds();
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage Unknown operation type "foo" in $operations[0]
     */
    public function testUnknownOperation()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            ['foo' => [['_id' => 1]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Missing (first|second) argument for \$operations\[\d+\]\["\w+\"]/
     * @dataProvider provideOpsWithMissingArguments
     */
    public function testMissingArguments(array $ops)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), $ops);
    }

    public function provideOpsWithMissingArguments()
    {
        return [
            [[['insertOne' => []]]],
            [[['updateOne' => []]]],
            [[['updateOne' => [['_id' => 1]]]]],
            [[['updateMany' => []]]],
            [[['updateMany' => [['_id' => 1]]]]],
            [[['replaceOne' => []]]],
            [[['replaceOne' => [['_id' => 1]]]]],
            [[['deleteOne' => []]]],
            [[['deleteMany' => []]]],
        ];
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage First key in $operations[0]["updateOne"][1] is not an update operator
     */
    public function testUpdateOneRequiresUpdateOperators()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            ['updateOne' => [['_id' => 1], ['x' => 1]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage First key in $operations[0]["updateMany"][1] is not an update operator
     */
    public function testUpdateManyRequiresUpdateOperators()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            ['updateMany' => [['_id' => ['$gt' => 1]], ['x' => 1]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage First key in $operations[0]["replaceOne"][1] is an update operator
     */
    public function testReplaceOneRequiresReplacementDocument()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            ['replaceOne' => [['_id' => 1], ['$inc' => ['x' => 1]]]],
        ]);
    }

    /**
     * Create data fixtures.
     *
     * @param integer $n
     */
    private function createFixtures($n)
    {
        $bulkWrite = new Bulk(['ordered' => true]);

        for ($i = 1; $i <= $n; $i++) {
            $bulkWrite->insert([
                '_id' => $i,
                'x' => (integer) ($i . $i),
            ]);
        }

        $result = $this->manager->executeBulkWrite($this->getNamespace(), $bulkWrite);

        $this->assertEquals($n, $result->getInsertedCount());
    }
}
