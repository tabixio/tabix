<?php

namespace MongoDB\Tests;

use MongoDB\Model\BSONArray;
use MongoDB\Model\BSONDocument;
use MongoDB\Driver\ReadConcern;
use MongoDB\Driver\WriteConcern;

/**
 * Unit tests for utility functions.
 */
class FunctionsTest extends TestCase
{
    /**
     * @dataProvider provideDocumentAndTypeMap
     */
    public function testApplyTypeMapToDocument($document, array $typeMap, $expectedDocument)
    {
        $this->assertEquals($expectedDocument, \MongoDB\apply_type_map_to_document($document, $typeMap));
    }

    public function provideDocumentAndTypeMap()
    {
        return [
            [
                [
                    'x' => 1,
                    'y' => (object) ['foo' => 'bar'],
                    'z' => [1, 2, 3],
                ],
                [
                    'root' => 'object',
                    'document' => 'stdClass',
                    'array' => 'array',
                ],
                (object) [
                    'x' => 1,
                    'y' => (object) ['foo' => 'bar'],
                    'z' => [1, 2, 3],
                ],
            ],
            [
                [
                    'x' => 1,
                    'y' => (object) ['foo' => 'bar'],
                    'z' => [1, 2, 3],
                ],
                [
                    'root' => 'MongoDB\Model\BSONDocument',
                    'document' => 'MongoDB\Model\BSONDocument',
                    'array' => 'MongoDB\Model\BSONArray',
                ],
                new BSONDocument([
                    'x' => 1,
                    'y' => new BSONDocument(['foo' => 'bar']),
                    'z' => new BSONArray([1, 2, 3]),
                ]),
            ],
        ];
    }

    /**
     * @dataProvider provideIndexSpecificationDocumentsAndGeneratedNames
     */
    public function testGenerateIndexName($document, $expectedName)
    {
        $this->assertSame($expectedName, \MongoDB\generate_index_name($document));
    }

    public function provideIndexSpecificationDocumentsAndGeneratedNames()
    {
        return [
            [ ['x' => 1], 'x_1' ],
            [ ['x' => -1, 'y' => 1], 'x_-1_y_1' ],
            [ ['x' => '2dsphere', 'y' => 1 ], 'x_2dsphere_y_1' ],
            [ (object) ['x' => 1], 'x_1' ],
            [ new BSONDocument(['x' => 1]), 'x_1' ],
        ];
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidDocumentValues
     */
    public function testGenerateIndexNameArgumentTypeCheck($document)
    {
        \MongoDB\generate_index_name($document);
    }

    /**
     * @dataProvider provideIsFirstKeyOperatorDocuments
     */
    public function testIsFirstKeyOperator($document, $isFirstKeyOperator)
    {
        $this->assertSame($isFirstKeyOperator, \MongoDB\is_first_key_operator($document));
    }

    public function provideIsFirstKeyOperatorDocuments()
    {
        return [
            [ ['y' => 1], false ],
            [ (object) ['y' => 1], false ],
            [ new BSONDocument(['y' => 1]), false ],
            [ ['$set' => ['y' => 1]], true ],
            [ (object) ['$set' => ['y' => 1]], true ],
            [ new BSONDocument(['$set' => ['y' => 1]]), true ],
        ];
    }

    /**
     * @expectedException MongoDB\Exception\InvalidArgumentException
     * @dataProvider provideInvalidDocumentValues
     */
    public function testIsFirstKeyOperatorArgumentTypeCheck($document)
    {
        \MongoDB\is_first_key_operator($document);
    }

    /**
     * @dataProvider provideReadConcernsAndDocuments
     */
    public function testReadConcernAsDocument(ReadConcern $readConcern, $expectedDocument)
    {
        $this->assertEquals($expectedDocument, \MongoDB\read_concern_as_document($readConcern));
    }

    public function provideReadConcernsAndDocuments()
    {
        return [
            [ new ReadConcern, (object) [] ],
            [ new ReadConcern(ReadConcern::LOCAL), (object) ['level' => ReadConcern::LOCAL] ],
            [ new ReadConcern(ReadConcern::MAJORITY), (object) ['level' => ReadConcern::MAJORITY] ],
        ];
    }

    /**
     * @dataProvider provideWriteConcernsAndDocuments
     */
    public function testWriteConcernAsDocument(WriteConcern $writeConcern, $expectedDocument)
    {
        $this->assertEquals($expectedDocument, \MongoDB\write_concern_as_document($writeConcern));
    }

    public function provideWriteConcernsAndDocuments()
    {
        return [
            [ new WriteConcern(-3), (object) ['w' => 'majority'] ], // MONGOC_WRITE_CONCERN_W_MAJORITY
            [ new WriteConcern(-2), (object) [] ], // MONGOC_WRITE_CONCERN_W_DEFAULT
            [ new WriteConcern(-1), (object) ['w' => -1] ],
            [ new WriteConcern(0), (object) ['w' => 0] ],
            [ new WriteConcern(1), (object) ['w' => 1] ],
            [ new WriteConcern('majority'), (object) ['w' => 'majority'] ],
            [ new WriteConcern('tag'), (object) ['w' => 'tag'] ],
            [ new WriteConcern(1, 0), (object) ['w' => 1] ],
            [ new WriteConcern(1, 0, false), (object) ['w' => 1, 'j' => false] ],
            [ new WriteConcern(1, 1000), (object) ['w' => 1, 'wtimeout' => 1000] ],
            [ new WriteConcern(1, 1000, true), (object) ['w' => 1, 'wtimeout' => 1000, 'j' => true] ],
            [ new WriteConcern(-2, 0, true), (object) ['j' => true] ],
            // Note: wtimeout is only applicable applies for w > 1
            [ new WriteConcern(-2, 1000), (object) ['wtimeout' => 1000] ],
        ];
    }
}
