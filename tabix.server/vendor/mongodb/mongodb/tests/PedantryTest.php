<?php

namespace MongoDB\Tests;

use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use ReflectionClass;
use ReflectionMethod;
use RegexIterator;

/**
 * Pedantic tests that have nothing to do with functional correctness.
 */
class PedantryTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @dataProvider provideProjectClassNames
     */
    public function testMethodsAreOrderedAlphabeticallyByVisibility($className)
    {
        $class = new ReflectionClass($className);
        $methods = $class->getMethods();

        $methods = array_filter(
            $methods,
            function(ReflectionMethod $method) use ($class) {
                return $method->getDeclaringClass() == $class;
            }
        );

        $getSortValue = function(ReflectionMethod $method) {
            if ($method->getModifiers() & ReflectionMethod::IS_PRIVATE) {
                return '2' . $method->getName();
            }
            if ($method->getModifiers() & ReflectionMethod::IS_PROTECTED) {
                return '1' . $method->getName();
            }
            if ($method->getModifiers() & ReflectionMethod::IS_PUBLIC) {
                return '0' . $method->getName();
            }
        };

        $sortedMethods = $methods;
        usort(
            $sortedMethods,
            function(ReflectionMethod $a, ReflectionMethod $b) use ($getSortValue) {
                return strcasecmp($getSortValue($a), $getSortValue($b));
            }
        );

        $methods = array_map(function(ReflectionMethod $method) { return $method->getName(); }, $methods);
        $sortedMethods = array_map(function(ReflectionMethod $method) { return $method->getName(); }, $sortedMethods);

        $this->assertEquals($sortedMethods, $methods);
    }

    public function provideProjectClassNames()
    {
        $classNames = [];
        $srcDir = realpath(__DIR__ . '/../src/');

        $files = new RegexIterator(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($srcDir)), '/\.php$/i');

        foreach ($files as $file) {
            if ($file->getFilename() === 'functions.php') {
                continue;
            }

            /* autoload.php added downstream (e.g. Fedora) */
            if ($file->getFilename() === 'autoload.php') {
                continue;
            }

            $classNames[][] = 'MongoDB\\' . str_replace(DIRECTORY_SEPARATOR, '\\', substr($file->getRealPath(), strlen($srcDir) + 1, -4));
        }

        return $classNames;
    }
}
