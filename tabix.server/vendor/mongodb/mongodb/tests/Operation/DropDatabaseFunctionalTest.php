<?php

namespace MongoDB\Tests\Operation;

use MongoDB\Driver\Server;
use MongoDB\Operation\DropDatabase;
use MongoDB\Operation\InsertOne;
use MongoDB\Operation\ListDatabases;

class DropDatabaseFunctionalTest extends FunctionalTestCase
{
    public function testDropExistingDatabase()
    {
        $server = $this->getPrimaryServer();

        $insertOne = new InsertOne($this->getDatabaseName(), $this->getCollectionName(), ['x' => 1]);
        $writeResult = $insertOne->execute($server);
        $this->assertEquals(1, $writeResult->getInsertedCount());

        $operation = new DropDatabase($this->getDatabaseName());
        $operation->execute($server);

        $this->assertDatabaseDoesNotExist($server, $this->getDatabaseName());
    }

    /**
     * @depends testDropExistingDatabase
     */
    public function testDropNonexistentDatabase()
    {
        $server = $this->getPrimaryServer();

        $operation = new DropDatabase($this->getDatabaseName());
        $operation->execute($server);

        $this->assertDatabaseDoesNotExist($server, $this->getDatabaseName());

        $operation = new DropDatabase($this->getDatabaseName());
        $operation->execute($server);
    }

    /**
     * Asserts that a database with the given name does not exist on the server.
     *
     * @param Server $server
     * @param string $databaseName
     */
    private function assertDatabaseDoesNotExist(Server $server, $databaseName)
    {
        $operation = new ListDatabases();
        $databases = $operation->execute($server);

        $foundDatabase = null;

        foreach ($databases as $database) {
            if ($database->getName() === $databaseName) {
                $foundDatabase = $database;
                break;
            }
        }

        $this->assertNull($foundDatabase, sprintf('Database %s exists on the server', $databaseName));
    }
}
