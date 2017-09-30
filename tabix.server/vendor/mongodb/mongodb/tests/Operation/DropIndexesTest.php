<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Operation\DropIndexes;

class DropIndexesTest extends TestCase
{
    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     */
    public function testDropIndexShouldNotAllowEmptyIndexName()
    {
        new DropIndexes($this->getDatabaseName(), $this->getCollectionName(), '');
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidConstructorOptions
     */
    public function testConstructorOptionTypeChecks(array $options)
    {
        new DropIndexes($this->getDatabaseName(), $this->getCollectionName(), '*', $options);
    }

    public function provideInvalidConstructorOptions()
    {
        $options = [];

        foreach ($this->getInvalidArrayValues() as $value) {
            $options[][] = ['typeMap' => $value];
        }

        foreach ($this->getInvalidWriteConcernValues() as $value) {
            $options[][] = ['writeConcern' => $value];
        }

        return $options;
    }
}
