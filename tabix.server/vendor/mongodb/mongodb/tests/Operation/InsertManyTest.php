<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Operation\InsertMany;

class InsertManyTest extends TestCase
{
    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage $documents is empty
     */
    public function testConstructorDocumentsMustNotBeEmpty()
    {
        new InsertMany($this->getDatabaseName(), $this->getCollectionName(), []);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage $documents is not a list (unexpected index: "1")
     */
    public function testConstructorDocumentsMustBeAList()
    {
        new InsertMany($this->getDatabaseName(), $this->getCollectionName(), [1 => ['x' => 1]]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$documents\[0\] to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testConstructorDocumentsArgumentElementTypeChecks($document)
    {
        new InsertMany($this->getDatabaseName(), $this->getCollectionName(), [$document]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidConstructorOptions
     */
    public function testConstructorOptionTypeChecks(array $options)
    {
        new InsertMany($this->getDatabaseName(), $this->getCollectionName(), [['x' => 1]], $options);
    }

    public function provideInvalidConstructorOptions()
    {
        $options = [];

        foreach ($this->getInvalidBooleanValues() as $value) {
            $options[][] = ['bypassDocumentValidation' => $value];
        }

        foreach ($this->getInvalidBooleanValues() as $value) {
            $options[][] = ['ordered' => $value];
        }

        foreach ($this->getInvalidWriteConcernValues() as $value) {
            $options[][] = ['writeConcern' => $value];
        }

        return $options;
    }
}
