<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Operation\BulkWrite;

class BulkWriteTest extends TestCase
{
    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage $operations is empty
     */
    public function testOperationsMustNotBeEmpty()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), []);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage $operations is not a list (unexpected index: "1")
     */
    public function testOperationsMustBeAList()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            1 => [BulkWrite::INSERT_ONE => [['x' => 1]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage Expected one element in $operation[0], actually: 2
     */
    public function testMultipleOperationsInOneElement()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [
                BulkWrite::INSERT_ONE => [['x' => 1]],
                BulkWrite::DELETE_ONE => [['x' => 1]],
            ],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage Unknown operation type "foo" in $operations[0]
     */
    public function testUnknownOperation()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            ['foo' => [['_id' => 1]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage Missing first argument for $operations[0]["insertOne"]
     */
    public function testInsertOneDocumentArgumentMissing()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::INSERT_ONE => []],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["insertOne"\]\[0\] to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testInsertOneDocumentArgumentTypeCheck($document)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::INSERT_ONE => [$document]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage Missing first argument for $operations[0]["deleteMany"]
     */
    public function testDeleteManyFilterArgumentMissing()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::DELETE_MANY => []],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["deleteMany"\]\[0\] to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testDeleteManyFilterArgumentTypeCheck($document)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::DELETE_MANY => [$document]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["deleteMany"\]\[1\]\["collation"\] to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testDeleteManyCollationOptionTypeCheck($collation)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::DELETE_MANY => [['x' => 1], ['collation' => $collation]]],
        ]);
    }

    public function provideInvalidDocumentValues()
    {
        return $this->wrapValuesForDataProvider($this->getInvalidDocumentValues());
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage Missing first argument for $operations[0]["deleteOne"]
     */
    public function testDeleteOneFilterArgumentMissing()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::DELETE_ONE => []],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["deleteOne"\]\[0\] to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testDeleteOneFilterArgumentTypeCheck($document)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::DELETE_ONE => [$document]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["deleteOne"\]\[1\]\["collation"\] to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testDeleteOneCollationOptionTypeCheck($collation)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::DELETE_ONE => [['x' => 1], ['collation' => $collation]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage Missing first argument for $operations[0]["replaceOne"]
     */
    public function testReplaceOneFilterArgumentMissing()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::REPLACE_ONE => []],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["replaceOne"\]\[0\] to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testReplaceOneFilterArgumentTypeCheck($filter)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::REPLACE_ONE => [$filter, ['y' => 1]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage Missing second argument for $operations[0]["replaceOne"]
     */
    public function testReplaceOneReplacementArgumentMissing()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::REPLACE_ONE => [['x' => 1]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["replaceOne"\]\[1\] to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testReplaceOneReplacementArgumentTypeCheck($replacement)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::REPLACE_ONE => [['x' => 1], $replacement]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage First key in $operations[0]["replaceOne"][1] is an update operator
     */
    public function testReplaceOneReplacementArgumentRequiresNoOperators()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::REPLACE_ONE => [['_id' => 1], ['$inc' => ['x' => 1]]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["replaceOne"\]\[2\]\["collation"\] to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testReplaceOneCollationOptionTypeCheck($collation)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::REPLACE_ONE => [['x' => 1], ['y' => 1], ['collation' => $collation]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["replaceOne"\]\[2\]\["upsert"\] to have type "boolean" but found "[\w ]+"/
     * @dataProvider provideInvalidBooleanValues
     */
    public function testReplaceOneUpsertOptionTypeCheck($upsert)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::REPLACE_ONE => [['x' => 1], ['y' => 1], ['upsert' => $upsert]]],
        ]);
    }

    public function provideInvalidBooleanValues()
    {
        return $this->wrapValuesForDataProvider($this->getInvalidBooleanValues());
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage Missing first argument for $operations[0]["updateMany"]
     */
    public function testUpdateManyFilterArgumentMissing()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::UPDATE_MANY => []],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["updateMany"\]\[0\] to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testUpdateManyFilterArgumentTypeCheck($filter)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::UPDATE_MANY => [$filter, ['$set' => ['x' => 1]]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage Missing second argument for $operations[0]["updateMany"]
     */
    public function testUpdateManyUpdateArgumentMissing()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::UPDATE_MANY => [['x' => 1]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["updateMany"\]\[1\] to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testUpdateManyUpdateArgumentTypeCheck($update)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::UPDATE_MANY => [['x' => 1], $update]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage First key in $operations[0]["updateMany"][1] is not an update operator
     */
    public function testUpdateManyUpdateArgumentRequiresOperators()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::UPDATE_MANY => [['_id' => ['$gt' => 1]], ['x' => 1]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["updateMany"\]\[2\]\["collation"\] to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testUpdateManyCollationOptionTypeCheck($collation)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::UPDATE_MANY => [['x' => 1], ['$set' => ['x' => 1]], ['collation' => $collation]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["updateMany"\]\[2\]\["upsert"\] to have type "boolean" but found "[\w ]+"/
     * @dataProvider provideInvalidBooleanValues
     */
    public function testUpdateManyUpsertOptionTypeCheck($upsert)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::UPDATE_MANY => [['x' => 1], ['$set' => ['x' => 1]], ['upsert' => $upsert]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage Missing first argument for $operations[0]["updateOne"]
     */
    public function testUpdateOneFilterArgumentMissing()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::UPDATE_ONE => []],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["updateOne"\]\[0\] to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testUpdateOneFilterArgumentTypeCheck($filter)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::UPDATE_ONE => [$filter, ['$set' => ['x' => 1]]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage Missing second argument for $operations[0]["updateOne"]
     */
    public function testUpdateOneUpdateArgumentMissing()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::UPDATE_ONE => [['x' => 1]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["updateOne"\]\[1\] to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testUpdateOneUpdateArgumentTypeCheck($update)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::UPDATE_ONE => [['x' => 1], $update]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage First key in $operations[0]["updateOne"][1] is not an update operator
     */
    public function testUpdateOneUpdateArgumentRequiresOperators()
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::UPDATE_ONE => [['_id' => 1], ['x' => 1]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["updateOne"\]\[2\]\["collation"\] to have type "array or object" but found "[\w ]+"/
     * @dataProvider provideInvalidDocumentValues
     */
    public function testUpdateOneCollationOptionTypeCheck($collation)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::UPDATE_ONE => [['x' => 1], ['$set' => ['x' => 1]], ['collation' => $collation]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessageRegExp /Expected \$operations\[0\]\["updateOne"\]\[2\]\["upsert"\] to have type "boolean" but found "[\w ]+"/
     * @dataProvider provideInvalidBooleanValues
     */
    public function testUpdateOneUpsertOptionTypeCheck($upsert)
    {
        new BulkWrite($this->getDatabaseName(), $this->getCollectionName(), [
            [BulkWrite::UPDATE_ONE => [['x' => 1], ['$set' => ['x' => 1]], ['upsert' => $upsert]]],
        ]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidConstructorOptions
     */
    public function testConstructorOptionTypeChecks(array $options)
    {
        new BulkWrite(
            $this->getDatabaseName(),
            $this->getCollectionName(),
            [[BulkWrite::INSERT_ONE => [['x' => 1]]]],
            $options
        );
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
