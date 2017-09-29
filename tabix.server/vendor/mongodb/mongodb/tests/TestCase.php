<?php

namespace MongoDB\Tests;

use MongoDB\Driver\ReadConcern;
use MongoDB\Driver\ReadPreference;
use MongoDB\Driver\WriteConcern;
use ReflectionClass;
use stdClass;

abstract class TestCase extends \PHPUnit_Framework_TestCase
{
    public function provideInvalidDocumentValues()
    {
        return $this->wrapValuesForDataProvider($this->getInvalidDocumentValues());
    }

    /**
     * Return the test collection name.
     *
     * @return string
     */
    protected function getCollectionName()
    {
         $class = new ReflectionClass($this);

         return sprintf('%s.%s', $class->getShortName(), hash('crc32b', $this->getName()));
    }

    /**
     * Return the test database name.
     *
     * @return string
     */
    protected function getDatabaseName()
    {
        return getenv('MONGODB_DATABASE') ?: 'phplib_test';
    }

    /**
     * Return a list of invalid array values.
     *
     * @return array
     */
    protected function getInvalidArrayValues()
    {
        return [123, 3.14, 'foo', true, new stdClass];
    }

    /**
     * Return a list of invalid boolean values.
     *
     * @return array
     */
    protected function getInvalidBooleanValues()
    {
        return [123, 3.14, 'foo', [], new stdClass];
    }

    /**
     * Return a list of invalid document values.
     *
     * @return array
     */
    protected function getInvalidDocumentValues()
    {
        return [123, 3.14, 'foo', true];
    }

    /**
     * Return a list of invalid integer values.
     *
     * @return array
     */
    protected function getInvalidIntegerValues()
    {
        return [3.14, 'foo', true, [], new stdClass];
    }

    /**
     * Return a list of invalid ReadPreference values.
     *
     * @return array
     */
    protected function getInvalidReadConcernValues()
    {
        return [123, 3.14, 'foo', true, [], new stdClass, new ReadPreference(ReadPreference::RP_PRIMARY), new WriteConcern(1)];
    }

    /**
     * Return a list of invalid ReadPreference values.
     *
     * @return array
     */
    protected function getInvalidReadPreferenceValues()
    {
        return [123, 3.14, 'foo', true, [], new stdClass, new ReadConcern, new WriteConcern(1)];
    }

    /**
     * Return a list of invalid string values.
     *
     * @return array
     */
    protected function getInvalidStringValues()
    {
        return [123, 3.14, true, [], new stdClass];
    }

    /**
     * Return a list of invalid WriteConcern values.
     *
     * @return array
     */
    protected function getInvalidWriteConcernValues()
    {
        return [123, 3.14, 'foo', true, [], new stdClass, new ReadConcern, new ReadPreference(ReadPreference::RP_PRIMARY)];
    }

    /**
     * Return the test namespace.
     *
     * @return string
     */
    protected function getNamespace()
    {
         return sprintf('%s.%s', $this->getDatabaseName(), $this->getCollectionName());
    }

    /**
     * Return the connection URI.
     *
     * @return string
     */
    protected function getUri()
    {
        return getenv('MONGODB_URI') ?: 'mongodb://127.0.0.1:27017';
    }

    /**
     * Wrap a list of values for use as a single-argument data provider.
     *
     * @param array $values List of values
     * @return array
     */
    protected function wrapValuesForDataProvider(array $values)
    {
        return array_map(function($value) { return [$value]; }, $values);
    }
}
