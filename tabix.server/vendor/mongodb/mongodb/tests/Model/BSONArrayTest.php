<?php

namespace MongoDB\Tests;

use MongoDB\Model\BSONArray;
use MongoDB\Model\BSONDocument;

class BSONArrayTest extends TestCase
{
    public function testBsonSerializeReindexesKeys()
    {
        $data = [0 => 'foo', 2 => 'bar'];

        $array = new BSONArray($data);
        $this->assertSame($data, $array->getArrayCopy());
        $this->assertSame(['foo', 'bar'], $array->bsonSerialize());
    }

    public function testJsonSerialize()
    {
        $document = new BSONArray([
            'foo',
            new BSONArray(['foo' => 1, 'bar' => 2, 'baz' => 3]),
            new BSONDocument(['foo' => 1, 'bar' => 2, 'baz' => 3]),
            new BSONArray([new BSONArray([new BSONArray])]),
        ]);

        $expectedJson = '["foo",[1,2,3],{"foo":1,"bar":2,"baz":3},[[[]]]]';

        $this->assertSame($expectedJson, json_encode($document));
    }

    public function testJsonSerializeReindexesKeys()
    {
        $data = [0 => 'foo', 2 => 'bar'];

        $array = new BSONArray($data);
        $this->assertSame($data, $array->getArrayCopy());
        $this->assertSame(['foo', 'bar'], $array->jsonSerialize());
    }

    public function testSetState()
    {
        $data = ['foo', 'bar'];

        $array = BSONArray::__set_state($data);
        $this->assertInstanceOf('MongoDB\Model\BSONArray', $array);
        $this->assertSame($data, $array->getArrayCopy());
    }
}
