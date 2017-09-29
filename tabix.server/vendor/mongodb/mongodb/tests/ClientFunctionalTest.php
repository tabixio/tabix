<?php

namespace MongoDB\Tests;

use MongoDB\Client;
use MongoDB\Driver\BulkWrite;
use MongoDB\Driver\Command;
use MongoDB\Model\DatabaseInfo;

/**
 * Functional tests for the Client class.
 */
class ClientFunctionalTest extends FunctionalTestCase
{
    private $client;

    public function setUp()
    {
        parent::setUp();

        $this->client = new Client($this->getUri());
        $this->client->dropDatabase($this->getDatabaseName());
    }

    public function testGetManager()
    {
        $this->assertInstanceOf('MongoDB\Driver\Manager', $this->client->getManager());
    }

    public function testDropDatabase()
    {
        $bulkWrite = new BulkWrite();
        $bulkWrite->insert(['x' => 1]);

        $writeResult = $this->manager->executeBulkWrite($this->getNamespace(), $bulkWrite);
        $this->assertEquals(1, $writeResult->getInsertedCount());

        $commandResult = $this->client->dropDatabase($this->getDatabaseName());
        $this->assertCommandSucceeded($commandResult);
        $this->assertCollectionCount($this->getNamespace(), 0);
    }

    public function testListDatabases()
    {
        $bulkWrite = new BulkWrite();
        $bulkWrite->insert(['x' => 1]);

        $writeResult = $this->manager->executeBulkWrite($this->getNamespace(), $bulkWrite);
        $this->assertEquals(1, $writeResult->getInsertedCount());

        $databases = $this->client->listDatabases();

        $this->assertInstanceOf('MongoDB\Model\DatabaseInfoIterator', $databases);

        foreach ($databases as $database) {
            $this->assertInstanceOf('MongoDB\Model\DatabaseInfo', $database);
        }

        $that = $this;
        $this->assertDatabaseExists($this->getDatabaseName(), function(DatabaseInfo $info) use ($that) {
            $that->assertFalse($info->isEmpty());
            $that->assertGreaterThan(0, $info->getSizeOnDisk());
        });
    }

    /**
     * Asserts that a database with the given name exists on the server.
     *
     * An optional $callback may be provided, which should take a DatabaseInfo
     * argument as its first and only parameter. If a DatabaseInfo matching
     * the given name is found, it will be passed to the callback, which may
     * perform additional assertions.
     *
     * @param string $databaseName
     * @param callable $callback
     */
    private function assertDatabaseExists($databaseName, $callback = null)
    {
        if ($callback !== null && ! is_callable($callback)) {
            throw new InvalidArgumentException('$callback is not a callable');
        }

        $databases = $this->client->listDatabases();

        $foundDatabase = null;

        foreach ($databases as $database) {
            if ($database->getName() === $databaseName) {
                $foundDatabase = $database;
                break;
            }
        }

        $this->assertNotNull($foundDatabase, sprintf('Database %s does not exist on the server', $databaseName));

        if ($callback !== null) {
            call_user_func($callback, $foundDatabase);
        }
    }
}
