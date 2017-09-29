<?php

namespace MongoDB\Tests;

use MongoDB\Model\IndexInfo;
use MongoDB\Tests\TestCase;

class IndexInfoTest extends TestCase
{
    public function testBasicIndex()
    {
        $info = new IndexInfo([
            'v' => 1,
            'key' => ['x' => 1],
            'name' => 'x_1',
            'ns' => 'foo.bar',
        ]);

        $this->assertSame(1, $info->getVersion());
        $this->assertSame(['x' => 1], $info->getKey());
        $this->assertSame('x_1', $info->getName());
        $this->assertSame('foo.bar', $info->getNamespace());
        $this->assertFalse($info->isSparse());
        $this->assertFalse($info->isTtl());
        $this->assertFalse($info->isUnique());
    }

    public function testSparseIndex()
    {
        $info = new IndexInfo([
            'v' => 1,
            'key' => ['y' => 1],
            'name' => 'y_sparse',
            'ns' => 'foo.bar',
            'sparse' => true,
        ]);

        $this->assertSame(1, $info->getVersion());
        $this->assertSame(['y' => 1], $info->getKey());
        $this->assertSame('y_sparse', $info->getName());
        $this->assertSame('foo.bar', $info->getNamespace());
        $this->assertTrue($info->isSparse());
        $this->assertFalse($info->isTtl());
        $this->assertFalse($info->isUnique());
    }

    public function testUniqueIndex()
    {
        $info = new IndexInfo([
            'v' => 1,
            'key' => ['z' => 1],
            'name' => 'z_unique',
            'ns' => 'foo.bar',
            'unique' => true,
        ]);

        $this->assertSame(1, $info->getVersion());
        $this->assertSame(['z' => 1], $info->getKey());
        $this->assertSame('z_unique', $info->getName());
        $this->assertSame('foo.bar', $info->getNamespace());
        $this->assertFalse($info->isSparse());
        $this->assertFalse($info->isTtl());
        $this->assertTrue($info->isUnique());
    }

    public function testTtlIndex()
    {
        $info = new IndexInfo([
            'v' => 1,
            'key' => ['z' => 1],
            'name' => 'z_unique',
            'ns' => 'foo.bar',
            'expireAfterSeconds' => 100,
        ]);

        $this->assertSame(1, $info->getVersion());
        $this->assertSame(['z' => 1], $info->getKey());
        $this->assertSame('z_unique', $info->getName());
        $this->assertSame('foo.bar', $info->getNamespace());
        $this->assertFalse($info->isSparse());
        $this->assertTrue($info->isTtl());
        $this->assertFalse($info->isUnique());
        $this->assertTrue(isset($info['expireAfterSeconds']));
        $this->assertSame(100, $info['expireAfterSeconds']);
    }

    public function testDebugInfo()
    {
        $expectedInfo = [
            'v' => 1,
            'key' => ['x' => 1],
            'name' => 'x_1',
            'ns' => 'foo.bar',
        ];

        $info = new IndexInfo($expectedInfo);
        $this->assertSame($expectedInfo, $info->__debugInfo());
    }

    public function testImplementsArrayAccess()
    {
        $info = new IndexInfo([
            'v' => 1,
            'key' => ['x' => 1],
            'name' => 'x_1',
            'ns' => 'foo.bar',
        ]);

        $this->assertInstanceOf('ArrayAccess', $info);
        $this->assertTrue(isset($info['name']));
        $this->assertSame('x_1', $info['name']);
    }

    /**
     * @expectedException MongoDB\Exception\BadMethodCallException
     * @expectedExceptionMessage MongoDB\Model\IndexInfo is immutable
     */
    public function testOffsetSetCannotBeCalled()
    {
        $info = new IndexInfo([
            'v' => 1,
            'key' => ['x' => 1],
            'name' => 'x_1',
            'ns' => 'foo.bar',
        ]);

        $info['v'] = 2;
    }

    /**
     * @expectedException MongoDB\Exception\BadMethodCallException
     * @expectedExceptionMessage MongoDB\Model\IndexInfo is immutable
     */
    public function testOffsetUnsetCannotBeCalled()
    {
        $info = new IndexInfo([
            'v' => 1,
            'key' => ['x' => 1],
            'name' => 'x_1',
            'ns' => 'foo.bar',
        ]);

        unset($info['v']);
    }
}
