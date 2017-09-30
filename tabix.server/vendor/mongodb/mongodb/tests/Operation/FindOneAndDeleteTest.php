<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Operation\FindOneAndDelete;

class FindOneAndDeleteTest extends TestCase
{
    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidDocumentValues
     */
    public function testConstructorFilterArgumentTypeCheck($filter)
    {
        new FindOneAndDelete($this->getDatabaseName(), $this->getCollectionName(), $filter);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidConstructorOptions
     */
    public function testConstructorOptionTypeChecks(array $options)
    {
        new FindOneAndDelete($this->getDatabaseName(), $this->getCollectionName(), [], $options);
    }

    public function provideInvalidConstructorOptions()
    {
        $options = [];

        foreach ($this->getInvalidDocumentValues() as $value) {
            $options[][] = ['projection' => $value];
        }

        return $options;
    }
}
