<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Driver\BulkWrite;
use MongoDB\Operation\Find;

class FindFunctionalTest extends FunctionalTestCase
{
    /**
     * @dataProvider provideTypeMapOptionsAndExpectedDocuments
     */
    public function testTypeMapOption(array $typeMap, array $expectedDocuments)
    {
        $this->createFixtures(3);

        $operation = new Find($this->getDatabaseName(), $this->getCollectionName(), [], ['typeMap' => $typeMap]);
        $cursor = $operation->execute($this->getPrimaryServer());

        $this->assertEquals($expectedDocuments, $cursor->toArray());
    }

    public function provideTypeMapOptionsAndExpectedDocuments()
    {
        return [
            [
                ['root' => 'array', 'document' => 'array'],
                [
                    ['_id' => 1, 'x' => ['foo' => 'bar']],
                    ['_id' => 2, 'x' => ['foo' => 'bar']],
                    ['_id' => 3, 'x' => ['foo' => 'bar']],
                ],
            ],
            [
                ['root' => 'object', 'document' => 'array'],
                [
                    (object) ['_id' => 1, 'x' => ['foo' => 'bar']],
                    (object) ['_id' => 2, 'x' => ['foo' => 'bar']],
                    (object) ['_id' => 3, 'x' => ['foo' => 'bar']],
                ],
            ],
            [
                ['root' => 'array', 'document' => 'stdClass'],
                [
                    ['_id' => 1, 'x' => (object) ['foo' => 'bar']],
                    ['_id' => 2, 'x' => (object) ['foo' => 'bar']],
                    ['_id' => 3, 'x' => (object) ['foo' => 'bar']],
                ],
            ],
        ];
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
                'x' => (object) ['foo' => 'bar'],
            ]);
        }

        $result = $this->manager->executeBulkWrite($this->getNamespace(), $bulkWrite);

        $this->assertEquals($n, $result->getInsertedCount());
    }
}
