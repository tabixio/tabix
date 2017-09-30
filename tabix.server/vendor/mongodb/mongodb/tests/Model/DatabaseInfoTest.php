<?php

namespace MongoDB\Tests;

use MongoDB\Model\DatabaseInfo;
use MongoDB\Tests\TestCase;

class DatabaseInfoTest extends TestCase
{
    public function testGetName()
    {
        $info = new DatabaseInfo(['name' => 'foo']);
        $this->assertSame('foo', $info->getName());
    }

    public function testGetSizeOnDisk()
    {
        $info = new DatabaseInfo(['sizeOnDisk' => 1048576]);
        $this->assertSame(1048576, $info->getSizeOnDisk());
    }

    public function testIsEmpty()
    {
        $info = new DatabaseInfo(['empty' => false]);
        $this->assertFalse($info->isEmpty());

        $info = new DatabaseInfo(['empty' => true]);
        $this->assertTrue($info->isEmpty());
    }

    public function testDebugInfo()
    {
        $expectedInfo = [
            'name' => 'foo',
            'sizeOnDisk' => 1048576,
            'empty' => false,
        ];

        $info = new DatabaseInfo($expectedInfo);
        $this->assertSame($expectedInfo, $info->__debugInfo());
    }
}
