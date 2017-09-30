<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Model\BSONDocument;
use MongoDB\Operation\UpdateMany;

class UpdateManyTest extends TestCase
{
    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidDocumentValues
     */
    public function testConstructorFilterArgumentTypeCheck($filter)
    {
        new UpdateMany($this->getDatabaseName(), $this->getCollectionName(), $filter, ['$set' => ['x' => 1]]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidDocumentValues
     */
    public function testConstructorUpdateArgumentTypeCheck($update)
    {
        new UpdateMany($this->getDatabaseName(), $this->getCollectionName(), ['x' => 1], $update);
    }

    /**
     * @dataProvider provideUpdateDocuments
     */
    public function testConstructorUpdateArgument($update)
    {
        new UpdateMany($this->getDatabaseName(), $this->getCollectionName(), ['x' => 1], $update);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage First key in $update argument is not an update operator
     * @dataProvider provideReplacementDocuments
     */
    public function testConstructorUpdateArgumentRequiresOperators($replacement)
    {
        new UpdateMany($this->getDatabaseName(), $this->getCollectionName(), ['x' => 1], $replacement);
    }

    public function provideReplacementDocuments()
    {
        return $this->wrapValuesForDataProvider([
            ['y' => 1],
            (object) ['y' => 1],
            new BSONDocument(['y' => 1]),
        ]);
    }

    public function provideUpdateDocuments()
    {
        return $this->wrapValuesForDataProvider([
            ['$set' => ['y' => 1]],
            (object) ['$set' => ['y' => 1]],
            new BSONDocument(['$set' => ['y' => 1]]),
        ]);
    }
}
