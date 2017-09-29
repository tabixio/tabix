<?php

namespace MongoDB\Tests\Collection;

use MongoDB\DeleteResult;
use MongoDB\Driver\BulkWrite;
use MongoDB\Driver\WriteConcern;
use MongoDB\Operation\Delete;

class DeleteFunctionalTest extends FunctionalTestCase
{
    public function testDeleteOne()
    {
        $this->createFixtures(3);

        $filter = ['_id' => 1];

        $operation = new Delete($this->getDatabaseName(), $this->getCollectionName(), $filter, 1);
        $result = $operation->execute($this->getPrimaryServer());

        $this->assertInstanceOf('MongoDB\DeleteResult', $result);
        $this->assertSame(1, $result->getDeletedCount());

        $expected = [
            ['_id' => 2, 'x' => 22],
            ['_id' => 3, 'x' => 33],
        ];

        $this->assertSameDocuments($expected, $this->collection->find());
    }

    public function testDeleteMany()
    {
        $this->createFixtures(3);

        $filter = ['_id' => ['$gt' => 1]];

        $operation = new Delete($this->getDatabaseName(), $this->getCollectionName(), $filter, 0);
        $result = $operation->execute($this->getPrimaryServer());

        $this->assertInstanceOf('MongoDB\DeleteResult', $result);
        $this->assertSame(2, $result->getDeletedCount());

        $expected = [
            ['_id' => 1, 'x' => 11],
        ];

        $this->assertSameDocuments($expected, $this->collection->find());
    }

    public function testUnacknowledgedWriteConcern()
    {
        $filter = ['_id' => 1];
        $options = ['writeConcern' => new WriteConcern(0)];

        $operation = new Delete($this->getDatabaseName(), $this->getCollectionName(), $filter, 0, $options);
        $result = $operation->execute($this->getPrimaryServer());

        $this->assertFalse($result->isAcknowledged());

        return $result;
    }

    /**
     * @depends testUnacknowledgedWriteConcern
     * @expectedException MongoDB\Exception\BadMethodCallException
     * @expectedExceptionMessageRegExp /[\w:\\]+ should not be called for an unacknowledged write result/
     */
    public function testUnacknowledgedWriteConcernAccessesDeletedCount(DeleteResult $result)
    {
        $result->getDeletedCount();
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
