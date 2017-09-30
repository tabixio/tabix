<?php

namespace MongoDB\Tests;

use MongoDB\Driver\Command;
use MongoDB\Driver\Cursor;
use MongoDB\Driver\Manager;
use MongoDB\Driver\ReadPreference;
use MongoDB\Model\BSONArray;
use MongoDB\Model\BSONDocument;
use InvalidArgumentException;
use stdClass;
use Traversable;

abstract class FunctionalTestCase extends TestCase
{
    protected $manager;

    public function setUp()
    {
        $this->manager = new Manager($this->getUri());
    }

    protected function assertCollectionCount($namespace, $count)
    {
        list($databaseName, $collectionName) = explode('.', $namespace, 2);

        $cursor = $this->manager->executeCommand($databaseName, new Command(['count' => $collectionName]));
        $cursor->setTypeMap(['root' => 'array', 'document' => 'array']);
        $document = current($cursor->toArray());

        $this->assertArrayHasKey('n', $document);
        $this->assertEquals($count, $document['n']);
    }

    protected function assertCommandSucceeded($document)
    {
        $document = is_object($document) ? (array) $document : $document;

        $this->assertArrayHasKey('ok', $document);
        $this->assertEquals(1, $document['ok']);
    }

    protected function assertSameObjectID($expectedObjectID, $actualObjectID)
    {
        $this->assertInstanceOf('MongoDB\BSON\ObjectID', $expectedObjectID);
        $this->assertInstanceOf('MongoDB\BSON\ObjectID', $actualObjectID);
        $this->assertEquals((string) $expectedObjectID, (string) $actualObjectID);
    }

    protected function assertSameDocument($expectedDocument, $actualDocument)
    {
        $this->assertEquals(
            \MongoDB\BSON\toJSON(\MongoDB\BSON\fromPHP($this->normalizeBSON($expectedDocument))),
            \MongoDB\BSON\toJSON(\MongoDB\BSON\fromPHP($this->normalizeBSON($actualDocument)))
        );
    }

    protected function assertSameDocuments(array $expectedDocuments, $actualDocuments)
    {
        if ($actualDocuments instanceof Traversable) {
            $actualDocuments = iterator_to_array($actualDocuments);
        }

        if ( ! is_array($actualDocuments)) {
            throw new InvalidArgumentException('$actualDocuments is not an array or Traversable');
        }

        $normalizeRootDocuments = function($document) {
            return \MongoDB\BSON\toJSON(\MongoDB\BSON\fromPHP($this->normalizeBSON($document)));
        };

        $this->assertEquals(
            array_map($normalizeRootDocuments, $expectedDocuments),
            array_map($normalizeRootDocuments, $actualDocuments)
        );
    }

    protected function getPrimaryServer()
    {
        return $this->manager->selectServer(new ReadPreference(ReadPreference::RP_PRIMARY));
    }

    protected function getServerVersion(ReadPreference $readPreference = null)
    {
        $cursor = $this->manager->executeCommand(
            $this->getDatabaseName(),
            new Command(['buildInfo' => 1]),
            $readPreference ?: new ReadPreference(ReadPreference::RP_PRIMARY)
        );

        $cursor->setTypeMap(['root' => 'array', 'document' => 'array']);
        $document = current($cursor->toArray());

        return $document['version'];
    }

    /**
     * Normalizes a BSON document or array for use with assertEquals().
     *
     * The argument will be converted to a BSONArray or BSONDocument based on
     * its type and keys. Document fields will be sorted alphabetically. Each
     * value within the array or document will then be normalized recursively.
     *
     * @param array|object $bson
     * @return BSONDocument|BSONArray
     * @throws InvalidArgumentException if $bson is not an array or object
     */
    private function normalizeBSON($bson)
    {
        if ( ! is_array($bson) && ! is_object($bson)) {
            throw new InvalidArgumentException('$bson is not an array or object');
        }

        if ($bson instanceof BSONArray || (is_array($bson) && $bson === array_values($bson))) {
            if ( ! $bson instanceof BSONArray) {
                $bson = new BSONArray($bson);
            }
        } else {
            if ( ! $bson instanceof BSONDocument) {
                $bson = new BSONDocument((array) $bson);
            }

            $bson->ksort();
        }

        foreach ($bson as $key => $value) {
            if ($value instanceof BSONArray || (is_array($value) && $value === array_values($value))) {
                $bson[$key] = $this->normalizeBSON($value);
                continue;
            }

            if ($value instanceof stdClass || $value instanceof BSONDocument || is_array($value)) {
                $bson[$key] = $this->normalizeBSON($value);
                continue;
            }
        }

        return $bson;
    }
}
