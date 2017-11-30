<?php
namespace Tabix;

class Degeneration
{
    /**
     * @var array
     */
    protected $bindings = [];

    /**
     * @param array $bindings
     */
    public function bindParams(array $bindings)
    {
        foreach ($bindings as $column => $value) {
            $this->bindings[$column]=$value;
        }
    }

    /**
     * @param string $column
     * @param mixed $value
     */
    public function bindParam($column, $value)
    {
        $this->bindings[$column] = $value;
    }


    static function __ifsets($matches,$markers,$else=false)
    {
        $content_false='';

        if ($else)
        {
            list($condition, $preset ,$variable, $content_true, $content_false) = $matches;
        }
        else
        {
            list($condition, $preset ,$variable, $content_true) = $matches;
        }
        $preset=strtolower($preset);

        if ($preset=='set')
        {
            return (isset($markers[$variable]) && !empty($markers[$variable]))   ? $content_true: $content_false;
        }
        if ($preset=='bool')
        {
            return (isset($markers[$variable]) && is_bool($markers[$variable]) && $markers[$variable]==true)
                ? $content_true
                : $content_false;
        }
        if ($preset=='string')
        {
            return (isset($markers[$variable]) && is_string($markers[$variable]) && strlen($markers[$variable]))
                ? $content_true
                : $content_false;
        }
        if ($preset=='int')
        {
            return (isset($markers[$variable]) && intval($markers[$variable])<>0 )
                ? $content_true
                : $content_false;
        }

        return '';
    }

    /**
     * @param $sql
     * @return mixed
     */
    private function processState($sql)
    {
        $markers=$this->bindings;

        // 2. process if/else conditions
        $sql = preg_replace_callback('#\{if\s(.+?)}(.+?)\{else}(.+?)\{/if}#sui', function ($matches) use ($markers) {
            list($condition, $variable, $content_true, $content_false) = $matches;

            return (isset($markers[$variable]) && ( $markers[$variable] || is_numeric($markers[$variable]) ) )
                ? $content_true
                : $content_false;
        }, $sql);

        // 3. process if conditions
        $sql = preg_replace_callback('#\{if\s(.+?)}(.+?)\{/if}#sui', function ($matches) use ($markers) {
            list($condition, $variable, $content) = $matches;

            if (isset($markers[$variable]) && ( $markers[$variable] || is_numeric($markers[$variable]) )) {
                return $content;
            }
        }, $sql);

        // 1. process if[set|int]/else conditions
        $sql = preg_replace_callback('#\{if(.{1,}?)\s(.+?)}(.+?)\{else}(.+?)\{/if}#sui',  function ($matches) use ($markers) {return  self::__ifsets($matches,$markers,true);  }, $sql);
        $sql = preg_replace_callback('#\{if(.{1,}?)\s(.+?)}(.+?)\{/if}#sui',  function ($matches) use ($markers) { return self::__ifsets($matches,$markers,false);  }, $sql);

        return $sql;
    }


    /**
     * @param $sql
     * @return mixed
     */
    private function processBind($sql)
    {
        asort($this->bindings);

        foreach ($this->bindings as $key => $value) {
            $valueSet = null;
            $valueSetText = null;

            if (null === $value || $value === false) {
                $valueSetText = "";
            }

            if (is_array($value)) {
                $valueSetText = "'" . implode("','", $value) . "'";
                $valueSet = implode(", ", $value);
            }

            if (is_numeric($value)) {
                $valueSetText = $value;
                $valueSet = $value;
            }

            if (is_string($value)) {
                $valueSet = $value;
                $valueSetText = "'" . $value . "'";
            }

            if ($valueSetText !== null) {
                $sql = str_ireplace(':' . $key, $valueSetText, $sql);
            }

            if ($valueSetText !== null) {
                $sql = str_ireplace('$' . $key, $valueSetText, $sql);
            }

            if ($valueSet !== null) {
                $sql = str_ireplace('{' . $key . '}', $valueSet, $sql);
            }
        }

        return $sql;
    }

    public function process($sql)
    {
        $sql=$this->processBind($sql);
        $sql=$this->processState($sql);
        $sql=$this->processBind($sql);
        return $sql;
    }


}