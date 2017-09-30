<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Operation\Aggregate;

class AggregateTest extends TestCase
{
    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage $pipeline is empty
     */
    public function testConstructorPipelineArgumentMustNotBeEmpty()
    {
        new Aggregate($this->getDatabaseName(), $this->getCollectionName(), []);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage $pipeline is not a list (unexpected index: "1")
     */
    public function testConstructorPipelineArgumentMustBeAList()
    {
        new Aggregate($this->getDatabaseName(), $this->getCollectionName(), [1 => ['$match' => ['x' => 1]]]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidConstructorOptions
     */
    public function testConstructorOptionTypeChecks(array $options)
    {
        new Aggregate($this->getDatabaseName(), $this->getCollectionName(), [['$match' => ['x' => 1]]], $options);
    }

    public function provideInvalidConstructorOptions()
    {
        $options = [];

        foreach ($this->getInvalidBooleanValues() as $value) {
            $options[][] = ['allowDiskUse' => $value];
        }

        foreach ($this->getInvalidIntegerValues() as $value) {
            $options[][] = ['batchSize' => $value];
        }

        foreach ($this->getInvalidBooleanValues() as $value) {
            $options[][] = ['bypassDocumentValidation' => $value];
        }

        foreach ($this->getInvalidDocumentValues() as $value) {
            $options[][] = ['collation' => $value];
        }

        foreach ($this->getInvalidIntegerValues() as $value) {
            $options[][] = ['maxTimeMS' => $value];
        }

        foreach ($this->getInvalidReadConcernValues() as $value) {
            $options[][] = ['readConcern' => $value];
        }

        foreach ($this->getInvalidReadPreferenceValues() as $value) {
            $options[][] = ['readPreference' => $value];
        }

        foreach ($this->getInvalidArrayValues() as $value) {
            $options[][] = ['typeMap' => $value];
        }

        foreach ($this->getInvalidBooleanValues() as $value) {
            $options[][] = ['useCursor' => $value];
        }

        foreach ($this->getInvalidWriteConcernValues() as $value) {
            $options[][] = ['writeConcern' => $value];
        }

        return $options;
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage "batchSize" option should not be used if "useCursor" is false
     */
    public function testConstructorBatchSizeOptionRequiresUseCursor()
    {
        new Aggregate(
            $this->getDatabaseName(),
            $this->getCollectionName(),
            [['$match' => ['x' => 1]]],
            ['batchSize' => 100, 'useCursor' => false]
        );
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage "typeMap" option should not be used if "useCursor" is false
     */
    public function testConstructorTypeMapOptionRequiresUseCursor()
    {
        new Aggregate(
            $this->getDatabaseName(),
            $this->getCollectionName(),
            [['$match' => ['x' => 1]]],
            ['typeMap' => ['root' => 'array'], 'useCursor' => false]
        );
    }
}
