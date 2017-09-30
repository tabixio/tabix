<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Operation\Find;

class FindTest extends TestCase
{
    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidDocumentValues
     */
    public function testConstructorFilterArgumentTypeCheck($filter)
    {
        new Find($this->getDatabaseName(), $this->getCollectionName(), $filter);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidConstructorOptions
     */
    public function testConstructorOptionTypeChecks(array $options)
    {
        new Find($this->getDatabaseName(), $this->getCollectionName(), [], $options);
    }

    public function provideInvalidConstructorOptions()
    {
        $options = [];

        foreach ($this->getInvalidBooleanValues() as $value) {
            $options[][] = ['allowPartialResults' => $value];
        }

        foreach ($this->getInvalidIntegerValues() as $value) {
            $options[][] = ['batchSize' => $value];
        }

        foreach ($this->getInvalidDocumentValues() as $value) {
            $options[][] = ['collation' => $value];
        }

        foreach ($this->getInvalidStringValues() as $value) {
            $options[][] = ['comment' => $value];
        }

        foreach ($this->getInvalidIntegerValues() as $value) {
            $options[][] = ['cursorType' => $value];
        }

        foreach ($this->getInvalidIntegerValues() as $value) {
            $options[][] = ['limit' => $value];
        }

        foreach ($this->getInvalidIntegerValues() as $value) {
            $options[][] = ['maxTimeMS' => $value];
        }

        foreach ($this->getInvalidDocumentValues() as $value) {
            $options[][] = ['modifiers' => $value];
        }

        foreach ($this->getInvalidBooleanValues() as $value) {
            $options[][] = ['oplogReplay' => $value];
        }

        foreach ($this->getInvalidDocumentValues() as $value) {
            $options[][] = ['projection' => $value];
        }

        foreach ($this->getInvalidReadConcernValues() as $value) {
            $options[][] = ['readConcern' => $value];
        }

        foreach ($this->getInvalidReadPreferenceValues() as $value) {
            $options[][] = ['readPreference' => $value];
        }

        foreach ($this->getInvalidIntegerValues() as $value) {
            $options[][] = ['skip' => $value];
        }

        foreach ($this->getInvalidDocumentValues() as $value) {
            $options[][] = ['sort' => $value];
        }

        foreach ($this->getInvalidArrayValues() as $value) {
            $options[][] = ['typeMap' => $value];
        }

        return $options;
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidConstructorCursorTypeOptions
     */
    public function testConstructorCursorTypeOption($cursorType)
    {
        new Find($this->getDatabaseName(), $this->getCollectionName(), [], ['cursorType' => $cursorType]);
    }

    public function provideInvalidConstructorCursorTypeOptions()
    {
        return $this->wrapValuesForDataProvider([-1, 0, 4]);
    }
}
