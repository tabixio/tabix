<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Operation\FindAndModify;

class FindAndModifyTest extends TestCase
{
    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidConstructorOptions
     */
    public function testConstructorOptionTypeChecks(array $options)
    {
        new FindAndModify($this->getDatabaseName(), $this->getCollectionName(), $options);
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

        foreach ($this->getInvalidDocumentValues() as $value) {
            $options[][] = ['fields' => $value];
        }

        foreach ($this->getInvalidIntegerValues() as $value) {
            $options[][] = ['maxTimeMS' => $value];
        }

        foreach ($this->getInvalidBooleanValues() as $value) {
            $options[][] = ['new' => $value];
        }

        foreach ($this->getInvalidDocumentValues() as $value) {
            $options[][] = ['query' => $value];
        }

        foreach ($this->getInvalidBooleanValues() as $value) {
            $options[][] = ['remove' => $value];
        }

        foreach ($this->getInvalidDocumentValues() as $value) {
            $options[][] = ['sort' => $value];
        }

        foreach ($this->getInvalidArrayValues() as $value) {
            $options[][] = ['typeMap' => $value];
        }

        foreach ($this->getInvalidDocumentValues() as $value) {
            $options[][] = ['update' => $value];
        }

        foreach ($this->getInvalidBooleanValues() as $value) {
            $options[][] = ['upsert' => $value];
        }

        foreach ($this->getInvalidWriteConcernValues() as $value) {
            $options[][] = ['writeConcern' => $value];
        }

        return $options;
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage The "remove" option must be true or an "update" document must be specified, but not both
     */
    public function testConstructorUpdateAndRemoveOptionsAreMutuallyExclusive()
    {
        new FindAndModify($this->getDatabaseName(), $this->getCollectionName(), ['remove' => true, 'update' => []]);
    }
}
