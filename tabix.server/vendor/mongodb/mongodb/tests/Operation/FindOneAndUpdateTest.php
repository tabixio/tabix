<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Operation\FindOneAndUpdate;

class FindOneAndUpdateTest extends TestCase
{
    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidDocumentValues
     */
    public function testConstructorFilterArgumentTypeCheck($filter)
    {
        new FindOneAndUpdate($this->getDatabaseName(), $this->getCollectionName(), $filter, []);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidDocumentValues
     */
    public function testConstructorUpdateArgumentTypeCheck($update)
    {
        new FindOneAndUpdate($this->getDatabaseName(), $this->getCollectionName(), [], $update);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage First key in $update argument is not an update operator
     */
    public function testConstructorUpdateArgumentRequiresOperators()
    {
        new FindOneAndUpdate($this->getDatabaseName(), $this->getCollectionName(), [], []);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidConstructorOptions
     */
    public function testConstructorOptionTypeChecks(array $options)
    {
        new FindOneAndUpdate($this->getDatabaseName(), $this->getCollectionName(), [], ['$set' => ['x' => 1]], $options);
    }

    public function provideInvalidConstructorOptions()
    {
        $options = [];

        foreach ($this->getInvalidDocumentValues() as $value) {
            $options[][] = ['projection' => $value];
        }

        foreach ($this->getInvalidIntegerValues() as $value) {
            $options[][] = ['returnDocument' => $value];
        }

        return $options;
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidConstructorReturnDocumentOptions
     */
    public function testConstructorReturnDocumentOption($returnDocument)
    {
        new FindOneAndUpdate($this->getDatabaseName(), $this->getCollectionName(), [], [], ['returnDocument' => $returnDocument]);
    }

    public function provideInvalidConstructorReturnDocumentOptions()
    {
        return $this->wrapValuesForDataProvider([-1, 0, 3]);
    }
}
