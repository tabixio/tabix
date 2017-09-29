<?php

namespace MongoDB\Tests;

use MongoDB\Model\CollectionInfo;
use MongoDB\Tests\TestCase;

class CollectionInfoTest extends TestCase
{
    public function testGetName()
    {
        $info = new CollectionInfo(['name' => 'foo']);
        $this->assertSame('foo', $info->getName());
    }

    public function testGetOptions()
    {
        $info = new CollectionInfo(['name' => 'foo']);
        $this->assertSame([], $info->getOptions());

        $info = new CollectionInfo(['name' => 'foo', 'options' => ['capped' => true, 'size' => 1048576]]);
        $this->assertSame(['capped' => true, 'size' => 1048576], $info->getOptions());
    }

    public function testCappedCollectionMethods()
    {
        $info = new CollectionInfo(['name' => 'foo']);
        $this->assertFalse($info->isCapped());
        $this->assertNull($info->getCappedMax());
        $this->assertNull($info->getCappedSize());

        $info = new CollectionInfo(['name' => 'foo', 'options' => ['capped' => true, 'size' => 1048576]]);
        $this->assertTrue($info->isCapped());
        $this->assertNull($info->getCappedMax());
        $this->assertSame(1048576, $info->getCappedSize());

        $info = new CollectionInfo(['name' => 'foo', 'options' => ['capped' => true, 'size' => 1048576, 'max' => 100]]);
        $this->assertTrue($info->isCapped());
        $this->assertSame(100, $info->getCappedMax());
        $this->assertSame(1048576, $info->getCappedSize());
    }

    public function testDebugInfo()
    {
        $expectedInfo = [
            'name' => 'foo',
            'options' => ['capped' => true, 'size' => 1048576],
        ];

        $info = new CollectionInfo($expectedInfo);
        $this->assertSame($expectedInfo, $info->__debugInfo());
    }
}
