<?php

namespace MongoDB\Tests\Collection;

use MongoDB\Collection;
use MongoDB\Operation\DropCollection;
use MongoDB\Tests\FunctionalTestCase as BaseFunctionalTestCase;

/**
 * Base class for Collection functional tests.
 */
abstract class FunctionalTestCase extends BaseFunctionalTestCase
{
    protected $collection;

    public function setUp()
    {
        parent::setUp();

        $this->collection = new Collection($this->manager, $this->getDatabaseName(), $this->getCollectionName());
        $operation = new DropCollection($this->getDatabaseName(), $this->getCollectionName());
        $operation->execute($this->getPrimaryServer());
    }

    public function tearDown()
    {
        if ($this->hasFailed()) {
            return;
        }

        $operation = new DropCollection($this->getDatabaseName(), $this->getCollectionName());
        $operation->execute($this->getPrimaryServer());
    }
}
