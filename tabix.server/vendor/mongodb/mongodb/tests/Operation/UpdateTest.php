<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Operation\Update;

class UpdateTest extends TestCase
{
    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$filter to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testConstructorFilterArgumentTypeCheck($filter)
    {
        new Update($this->getDatabaseName(), $this->getCollectionName(), $filter, ['$set' => ['x' => 1]]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$update to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testConstructorUpdateArgumentTypeCheck($update)
    {
        new Update($this->getDatabaseName(), $this->getCollectionName(), ['x' => 1], $update);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidConstructorOptions
     */
    public function testConstructorOptionTypeChecks(array $options)
    {
        new Update($this->getDatabaseName(), $this->getCollectionName(), ['x' => 1], ['y' => 1], $options);
    }

    public function provideInvalidConstructorOptions()
    {
        $options = [];

        foreach ($this->getInvalidBooleanValues() as $value) {
            $options[][] = ['bypassDocumentValidation' => $value];
        }

        foreach ($this->getInvalidDocumentValues() as $value) {
            $options[][] = ['collation' => $value];
        }

        foreach ($this->getInvalidBooleanValues() as $value) {
            $options[][] = ['multi' => $value];
        }

        foreach ($this->getInvalidBooleanValues() as $value) {
            $options[][] = ['upsert' => $value];
        }

        foreach ($this->getInvalidWriteConcernValues() as $value) {
            $options[][] = ['writeConcern' => $value];
        }

        return $options;
    }
}
