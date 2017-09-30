<?php

namespace MongoDB\Tests;

use MongoDB\Model\BSONArray;
use MongoDB\Model\BSONDocument;
use ArrayObject;

class BSONDocumentTest extends TestCase
{
    public function testConstructorDefaultsToPropertyAccess()
    {
        $document = new BSONDocument(['foo' => 'bar']);
        $this->assertEquals(ArrayObject::ARRAY_AS_PROPS, $document->getFlags());
        $this->assertSame('bar', $document->foo);
    }

    public function testBsonSerializeCastsToObject()
    {
        $data = [0 => 'foo', 2 => 'bar'];

        $document = new BSONDocument($data);
        $this->assertSame($data, $document->getArrayCopy());
        $this->assertEquals((object) [0 => 'foo', 2 => 'bar'], $document->bsonSerialize());
    }

    public function testJsonSerialize()
    {
        $document = new BSONDocument([
            'foo' => 'bar',
            'array' => new BSONArray([1, 2, 3]),
            'object' => new BSONDocument([1, 2, 3]),
            'nested' => new BSONDocument([new BSONDocument([new BSONDocument])]),
        ]);

        $expectedJson = '{"foo":"bar","array":[1,2,3],"object":{"0":1,"1":2,"2":3},"nested":{"0":{"0":{}}}}';

        $this->assertSame($expectedJson, json_encode($document));
    }

    public function testJsonSerializeCastsToObject()
    {
        $data = [0 => 'foo', 2 => 'bar'];

        $document = new BSONDocument($data);
        $this->assertSame($data, $document->getArrayCopy());
        $this->assertEquals((object) [0 => 'foo', 2 => 'bar'], $document->jsonSerialize());
    }

    public function testSetState()
    {
        $data = ['foo' => 'bar'];

        $document = BSONDocument::__set_state($data);
        $this->assertInstanceOf('MongoDB\Model\BSONDocument', $document);
        $this->assertSame($data, $document->getArrayCopy());
    }
}
