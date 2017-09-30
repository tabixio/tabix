<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Model\IndexInfo;
use MongoDB\Operation\CreateIndexes;
use MongoDB\Operation\DropIndexes;
use MongoDB\Operation\ListIndexes;
use InvalidArgumentException;

class CreateIndexesFunctionalTest extends FunctionalTestCase
{
    private static $wireVersionForCommand = 2;

    public function testCreateSparseUniqueIndex()
    {
        $indexes = [['key' => ['x' => 1], 'sparse' => true, 'unique' => true]];

        $operation = new CreateIndexes($this->getDatabaseName(), $this->getCollectionName(), $indexes);
        $createdIndexNames = $operation->execute($this->getPrimaryServer());

        $this->assertSame('x_1', $createdIndexNames[0]);
        $this->assertIndexExists('x_1', function(IndexInfo $info) {
            $this->assertTrue($info->isSparse());
            $this->assertTrue($info->isUnique());
            $this->assertFalse($info->isTtl());
        });
    }

    public function testCreateCompoundIndex()
    {
        $indexes = [['key' => ['y' => -1, 'z' => 1]]];

        $operation = new CreateIndexes($this->getDatabaseName(), $this->getCollectionName(), $indexes);
        $createdIndexNames = $operation->execute($this->getPrimaryServer());

        $this->assertSame('y_-1_z_1', $createdIndexNames[0]);
        $this->assertIndexExists('y_-1_z_1', function(IndexInfo $info) {
            $this->assertFalse($info->isSparse());
            $this->assertFalse($info->isUnique());
            $this->assertFalse($info->isTtl());
        });
    }

    public function testCreateGeospatialIndex()
    {
        $indexes = [['key' => ['g' => '2dsphere', 'z' => 1]]];

        $operation = new CreateIndexes($this->getDatabaseName(), $this->getCollectionName(), $indexes);
        $createdIndexNames = $operation->execute($this->getPrimaryServer());

        $this->assertSame('g_2dsphere_z_1', $createdIndexNames[0]);
        $this->assertIndexExists('g_2dsphere_z_1', function(IndexInfo $info) {
            $this->assertFalse($info->isSparse());
            $this->assertFalse($info->isUnique());
            $this->assertFalse($info->isTtl());
        });
    }

    public function testCreateTTLIndex()
    {
        $indexes = [['key' => ['t' => 1], 'expireAfterSeconds' => 0, 'name' => 'my_ttl']];

        $operation = new CreateIndexes($this->getDatabaseName(), $this->getCollectionName(), $indexes);
        $createdIndexNames = $operation->execute($this->getPrimaryServer());

        $this->assertSame('my_ttl', $createdIndexNames[0]);
        $this->assertIndexExists('my_ttl', function(IndexInfo $info) {
            $this->assertFalse($info->isSparse());
            $this->assertFalse($info->isUnique());
            $this->assertTrue($info->isTtl());
        });
    }

    public function testCreateIndexes()
    {
        $expectedNames = ['x_1', 'y_-1_z_1', 'g_2dsphere_z_1', 'my_ttl'];

        $indexes = [
            ['key' => ['x' => 1], 'sparse' => true, 'unique' => true],
            ['key' => ['y' => -1, 'z' => 1]],
            ['key' => ['g' => '2dsphere', 'z' => 1]],
            ['key' => ['t' => 1], 'expireAfterSeconds' => 0, 'name' => 'my_ttl'],
        ];

        $operation = new CreateIndexes($this->getDatabaseName(), $this->getCollectionName(), $indexes);
        $createdIndexNames = $operation->execute($this->getPrimaryServer());

        $this->assertSame($expectedNames, $createdIndexNames);

        $this->assertIndexExists('x_1', function(IndexInfo $info) {
            $this->assertTrue($info->isSparse());
            $this->assertTrue($info->isUnique());
            $this->assertFalse($info->isTtl());
        });

        $this->assertIndexExists('y_-1_z_1', function(IndexInfo $info) {
            $this->assertFalse($info->isSparse());
            $this->assertFalse($info->isUnique());
            $this->assertFalse($info->isTtl());
        });

        $this->assertIndexExists('g_2dsphere_z_1', function(IndexInfo $info) {
            $this->assertFalse($info->isSparse());
            $this->assertFalse($info->isUnique());
            $this->assertFalse($info->isTtl());
        });

        $this->assertIndexExists('my_ttl', function(IndexInfo $info) {
            $this->assertFalse($info->isSparse());
            $this->assertFalse($info->isUnique());
            $this->assertTrue($info->isTtl());
        });
    }

    /**
     * @expectedException MongoDB\Driver\Exception\RuntimeException
     */
    public function testCreateConflictingIndexesWithCommand()
    {
        if ( ! \MongoDB\server_supports_feature($this->getPrimaryServer(), self::$wireVersionForCommand)) {
            $this->markTestSkipped('createIndexes command is not supported');
        }

        $indexes = [
            ['key' => ['x' => 1], 'sparse' => true, 'unique' => false],
            ['key' => ['x' => 1], 'sparse' => false, 'unique' => true],
        ];

        $operation = new CreateIndexes($this->getDatabaseName(), $this->getCollectionName(), $indexes);
        $createdIndexNames = $operation->execute($this->getPrimaryServer());
    }

    public function testCreateConflictingIndexesWithLegacyInsert()
    {
        if (\MongoDB\server_supports_feature($this->getPrimaryServer(), self::$wireVersionForCommand)) {
            $this->markTestSkipped('Index creation does not use legacy insertion');
        }

        $indexes = [
            ['key' => ['x' => 1], 'sparse' => true, 'unique' => false],
            ['key' => ['x' => 1], 'sparse' => false, 'unique' => true],
        ];

        $operation = new CreateIndexes($this->getDatabaseName(), $this->getCollectionName(), $indexes);
        $createdIndexNames = $operation->execute($this->getPrimaryServer());

        /* When creating indexes with legacy insert operations, the server
         * ignores conflicting index specifications and leaves the original
         * index in place.
         */
        $this->assertSame('x_1', $createdIndexNames[0]);
        $this->assertIndexExists('x_1', function(IndexInfo $info) {
            $this->assertTrue($info->isSparse());
            $this->assertFalse($info->isUnique());
            $this->assertFalse($info->isTtl());
        });
    }

    /**
     * Asserts that an index with the given name exists for the collection.
     *
     * An optional $callback may be provided, which should take an IndexInfo
     * argument as its first and only parameter. If an IndexInfo matching the
     * given name is found, it will be passed to the callback, which may perform
     * additional assertions.
     *
     * @param string   $indexName
     * @param callable $callback
     */
    private function assertIndexExists($indexName, $callback = null)
    {
        if ($callback !== null && ! is_callable($callback)) {
            throw new InvalidArgumentException('$callback is not a callable');
        }

        $operation = new ListIndexes($this->getDatabaseName(), $this->getCollectionName());
        $indexes = $operation->execute($this->getPrimaryServer());

        $foundIndex = null;

        foreach ($indexes as $index) {
            if ($index->getName() === $indexName) {
                $foundIndex = $index;
                break;
            }
        }

        $this->assertNotNull($foundIndex, sprintf('Index %s does not exist', $indexName));

        if ($callback !== null) {
            call_user_func($callback, $foundIndex);
        }
    }
}
