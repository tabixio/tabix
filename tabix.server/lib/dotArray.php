<?php

/**
 * Class dotArray
 * Mongo like style key=>value store
 */
class dotArray
{
    private $_object=array();
    private $_changes=array();

    public function __construct($data=false)
    {
        if ($data)
        {
            $this->setArray($data);
        }
    }
    public function add($k,$v)
    {
        return $this->set($k,$v);

    }
    public function as_array()
    {
        return $this->_object;
    }
    public function is($key)
    {
        return ($this->get($key));
    }
    public function get($key)
    {
        return $this->get_field_reference($key,$this->_object);
    }



    public function restore($arrayData)
    {
        $this->setArray($arrayData);
    }


    public function compare(dotArray $i)
    {
        $diff=array();
        foreach ($i->as_array() as $key=>$val)
        {
            $g=$this->get($key);
            echo "$key: [$g!==$val]\n";
            if ($g!==$val)
            {
                $diff[$key]=array($g,$val);
            }
        }
        return $diff;
    }
    public function update(dotArray $i)
    {
        foreach ($i->as_array() as $key=>$val)
        {
            $this->set($key,$val);
        }
        return true;
    }
    public function setArray($array)
    {
        if (!$array) return false;
        if (!is_array($array)) return false;
        // seter
        foreach ($array as $key=>$val)
        {
            $this->set($key,$val);
        }
        return true;
    }
    public function isChanges()
    {
        return sizeof($this->_changes);
    }
    public function changes()
    {
        return $this->_changes;
    }

    public function change($key,$newValue)
    {
        $v=$this->get($key);
        if ($v || $newValue)
        {
            if (!$v) $v=null;
            $this->_changes[$key]=array($v,$newValue);
        }
        return $this->set($key,$newValue);
    }

    public function set($key,$value)
    {
        $ref = & $this->get_field_reference($key, TRUE);
        //
        if ($ref!==$value)
        {
         //   $this->_changes[$key]=1;
        }
        $ref = $value;
        return $this;
    }
    public function un_set($key)
    {
        self::unset_named_reference($this->_object, $key);
    }

    public function __set($name, $val)
    {
        $this->set($name,$val);
    }
    public function __get($name)
    {
        return $this->get($name);
    }

    /** Returns direct reference to a field, using dot notation.
     * @param $name Dot notation name
     * @param $create TRUE to create a field if it's missing
     * @param $default Use default value to create missing fields, or return it if $create == FALSE
     *  */
    public function &get_field_reference($name, $create = FALSE, $default = null)
    {
        return self::get_named_reference($this->_object, $name, $create, $default);
    }

    /** Returns direct reference to a field, using dot notation.
     * @param $arr Array with data
     * @param $name Dot notation name
     * @param $create TRUE to create a field if it's missing
     * @param $default Use default value to create missing fields, or return it if $create == FALSE
     *  */
    public static function &get_named_reference(&$arr, $name, $create = FALSE, $default = null)
    {
        $keys = explode('.', $name);
        $data = & $arr;
        foreach ($keys as $i => $key)
        {
            if (!isset($data[$key]))
            {
                if ($create)
                {
                    $data[$key] = $i == count($keys) - 1 ? $default : array();
                }
                else
                {
                    $nil = $default;
                    return $nil;
                }
            }
            $data = & $data[$key];
        }
        return $data;
    }

    /**
     * Unsets a field using dot notation
     *
     * @param array  $arr  Array with data
     * @param string $name Dot notation name
     */
    public static function unset_named_reference(&$arr, $name)
    {
        $keys = explode('.', $name);
        $data = & $arr;
        foreach ($keys as $i => $key)
        {
            if (isset($data[$key]))
            {
                if ($i == count($keys) - 1)
                {
                    unset($data[$key]);
                    return;
                }
                $data = & $data[$key];
            }
            else
            {
                return;
            }
        }
    }

    public function cas($key,$value=null)
    {
        if ($value!==null)
        {
            $this->change($key,$value);
        }
        return $this->get($key);
    }
}

