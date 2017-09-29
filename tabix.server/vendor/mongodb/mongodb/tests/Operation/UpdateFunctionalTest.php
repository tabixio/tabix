<?php

namespace MongoDB\Tests\Collection;

use MongoDB\UpdateResult;
use MongoDB\Driver\BulkWrite;
use MongoDB\Driver\WriteConcern;
use MongoDB\Operation\Update;

class UpdateFunctionalTest extends FunctionalTestCase
{
    private $omitModifiedCount;

    public function setUp()
    {
        parent::setUp();

        $this->omitModifiedCount = version_compare($this->getServerVersion(), '2.6.0', '<');
    }

    public function testUpdateOne()
    {
        $this->createFixtures(3);

        $filter = ['_id' => ['$gt' => 1]];
        $update = ['$inc' => ['x' => 1]];

        $operation = new Update($this->getDatabaseName(), $this->getCollectionName(), $filter, $update);
        $result = $operation->execute($this->getPrimaryServer());

        $this->assertInstanceOf('MongoDB\UpdateResult', $result);
        $this->assertSame(1, $result->getMatchedCount());
        $this->omitModifiedCount or $this->assertSame(1, $result->getModifiedCount());
        $this->assertSame(0, $result->getUpsertedCount());
        $this->assertNull($result->getUpsertedId());

        $expected = [
            ['_id' => 1, 'x' => 11],
            ['_id' => 2, 'x' => 23],
            ['_id' => 3, 'x' => 33],
        ];

        $this->assertSameDocuments($expected, $this->collection->find());
    }

    public function testUpdateMany()
    {
        $this->createFixtures(3);

        $filter = ['_id' => ['$gt' => 1]];
        $update = ['$inc' => ['x' => 1]];
        $options = ['multi' => true];

        $operation = new Update($this->getDatabaseName(), $this->getCollectionName(), $filter, $update, $options);
        $result = $operation->execute($this->getPrimaryServer());

        $this->assertInstanceOf('MongoDB\UpdateResult', $result);
        $this->assertSame(2, $result->getMatchedCount());
        $this->omitModifiedCount or $this->assertSame(2, $result->getModifiedCount());
        $this->assertSame(0, $result->getUpsertedCount());
        $this->assertNull($result->getUpsertedId());

        $expected = [
            ['_id' => 1, 'x' => 11],
            ['_id' => 2, 'x' => 23],
            ['_id' => 3, 'x' => 34],
        ];

        $this->assertSameDocuments($expected, $this->collection->find());
    }

    public function testUpdateManyWithExistingId()
    {
        $this->createFixtures(3);

        $filter = ['_id' => 5];
        $update = ['$set' => ['x' => 55]];
        $options = ['upsert' => true];

        $operation = new Update($this->getDatabaseName(), $this->getCollectionName(), $filter, $update, $options);
        $result = $operation->execute($this->getPrimaryServer());

        $this->assertInstanceOf('MongoDB\UpdateResult', $result);
        $this->assertSame(0, $result->getMatchedCount());
        $this->omitModifiedCount or $this->assertSame(0, $result->getModifiedCount());
        $this->assertSame(1, $result->getUpsertedCount());
        $this->assertSame(5, $result->getUpsertedId());

        $expected = [
            ['_id' => 1, 'x' => 11],
            ['_id' => 2, 'x' => 22],
            ['_id' => 3, 'x' => 33],
            ['_id' => 5, 'x' => 55],
        ];

        $this->assertSameDocuments($expected, $this->collection->find());
    }

    public function testUpdateManyWithGeneratedId()
    {
        $this->createFixtures(3);

        $filter = ['x' => 66];
        $update = ['$set' => ['x' => 66]];
        $options = ['upsert' => true];

        $operation = new Update($this->getDatabaseName(), $this->getCollectionName(), $filter, $update, $options);
        $result = $operation->execute($this->getPrimaryServer());

        $this->assertInstanceOf('MongoDB\UpdateResult', $result);
        $this->assertSame(0, $result->getMatchedCount());
        $this->omitModifiedCount or $this->assertSame(0, $result->getModifiedCount());
        $this->assertSame(1, $result->getUpsertedCount());
        $this->assertInstanceOf('MongoDB\BSON\ObjectId', $result->getUpsertedId());

        $expected = [
            ['_id' => 1, 'x' => 11],
            ['_id' => 2, 'x' => 22],
            ['_id' => 3, 'x' => 33],
            ['_id' => $result->getUpsertedId(), 'x' => 66],
        ];

        $this->assertSameDocuments($expected, $this->collection->find());
    }

    public function testUnacknowledgedWriteConcern()
    {
        $filter = ['_id' => 1];
        $update = ['$set' => ['x' => 1]];
        $options = ['writeConcern' => new WriteConcern(0)];
        $operation = new Update($this->getDatabaseName(), $this->getCollectionName(), $filter, $update, $options);
        $result = $operation->execute($this->getPrimaryServer());

        $this->assertFalse($result->isAcknowledged());

        return $result;
    }

    /**
     * @depends testUnacknowledgedWriteConcern
     * @expectedException MongoDB\Exception\BadMethodCallException
     * @expectedExceptionMessageRegExp /[\w:\\]+ should not be called for an unacknowledged write result/
     */
    public function testUnacknowledgedWriteConcernAccessesMatchedCount(UpdateResult $result)
    {
        $result->getMatchedCount();
    }

    /**
     * @depends testUnacknowledgedWriteConcern
     * @expectedException MongoDB\Exception\BadMethodCallException
     * @expectedExceptionMessageRegExp /[\w:\\]+ should not be called for an unacknowledged write result/
     */
    public function testUnacknowledgedWriteConcernAccessesModifiedCount(UpdateResult $result)
    {
        $result->getModifiedCount();
    }

    /**
     * @depends testUnacknowledgedWriteConcern
     * @expectedException MongoDB\Exception\BadMethodCallException
     * @expectedExceptionMessageRegExp /[\w:\\]+ should not be called for an unacknowledged write result/
     */
    public function testUnacknowledgedWriteConcernAccessesUpsertedCount(UpdateResult $result)
    {
        $result->getUpsertedCount();
    }

    /**
     * @depends testUnacknowledgedWriteConcern
     * @expectedException MongoDB\Exception\BadMethodCallException
     * @expectedExceptionMessageRegExp /[\w:\\]+ should not be called for an unacknowledged write result/
     */
    public function testUnacknowledgedWriteConcernAccessesUpsertedId(UpdateResult $result)
    {
        $result->getUpsertedId();
    }

    /**
     * Create data fixtures.
     *
     * @param integer $n
     */
    private function createFixtures($n)
    {
        $bulkWrite = new BulkWrite(['ordered' => true]);

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
