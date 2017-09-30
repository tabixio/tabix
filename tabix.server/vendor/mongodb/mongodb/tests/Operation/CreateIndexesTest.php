<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Operation\CreateIndexes;

class CreateIndexesTest extends TestCase
{
    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage $indexes is not a list (unexpected index: "1")
     */
    public function testConstructorIndexesArgumentMustBeAList()
    {
        new CreateIndexes($this->getDatabaseName(), $this->getCollectionName(), [1 => ['key' => ['x' => 1]]]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidConstructorOptions
     */
    public function testConstructorOptionTypeChecks(array $options)
    {
        new CreateIndexes($this->getDatabaseName(), $this->getCollectionName(), [['key' => ['x' => 1]]], $options);
    }

    public function provideInvalidConstructorOptions()
    {
        $options = [];

        foreach ($this->getInvalidWriteConcernValues() as $value) {
            $options[][] = ['writeConcern' => $value];
        }

        return $options;
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage $indexes is empty
     */
    public function testConstructorRequiresAtLeastOneIndex()
    {
        new CreateIndexes($this->getDatabaseName(), $this->getCollectionName(), []);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidIndexSpecificationTypes
     */
    public function testConstructorRequiresIndexSpecificationsToBeAnArray($index)
    {
        new CreateIndexes($this->getDatabaseName(), $this->getCollectionName(), [$index]);
    }

    public function provideInvalidIndexSpecificationTypes()
    {
        return $this->wrapValuesForDataProvider($this->getInvalidArrayValues());
    }
}
