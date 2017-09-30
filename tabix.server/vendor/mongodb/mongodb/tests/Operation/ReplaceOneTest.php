<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Model\BSONDocument;
use MongoDB\Operation\ReplaceOne;

class ReplaceOneTest extends TestCase
{
    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidDocumentValues
     */
    public function testConstructorFilterArgumentTypeCheck($filter)
    {
        new ReplaceOne($this->getDatabaseName(), $this->getCollectionName(), $filter, ['y' => 1]);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidDocumentValues
     */
    public function testConstructorReplacementArgumentTypeCheck($replacement)
    {
        new ReplaceOne($this->getDatabaseName(), $this->getCollectionName(), ['x' => 1], $replacement);
    }

    /**
     * @dataProvider provideReplacementDocuments
     */
    public function testConstructorReplacementArgument($replacement)
    {
        new ReplaceOne($this->getDatabaseName(), $this->getCollectionName(), ['x' => 1], $replacement);
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @expectedExceptionMessage First key in $replacement argument is an update operator
     * @dataProvider provideUpdateDocuments
     */
    public function testConstructorReplacementArgumentRequiresNoOperators($replacement)
    {
        new ReplaceOne($this->getDatabaseName(), $this->getCollectionName(), ['x' => 1], $replacement);
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
