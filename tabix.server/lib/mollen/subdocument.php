<?php

/**
 * Class for easy handling of subdocuments in Mongo_Document.
 *
 * It allows to create simple models for subdocuments. All field operations like set, inc, push etc. are
 * delegated to the main document.
 *
 * To make it fast, reads are done though a cached reference.
 *
 * This code will store a document like this: ``` {some:'thing', sub : {foo : 'bar'}} ```
 * <code>
 * $doc = new Mongo_Document();
 * $doc->some = 'thing';
 * $sub = new Mongo_Subdocument($doc, 'sub');
 * $sub->foo = 'bar';
 * $doc->save();
 * </code>
 *
 * You can also read arrays.
 * Let's read a ``` { comments : [{title:'nice', views:100}, {title:'wow', views:0}] } ```
 * and increment the view count of every comment...
 * <code>
 * $doc = new Mongo_Document();
 * foreach(Mongo_Subdocument::iterate($doc, 'comments') as $comment) {
 *      $comment->inc('views');
 * }
 * $doc->save();
 * </code>
 *
 * To act more like Mongo_Document, set and unset will by default emulate database operations immediately.
 *
 * It is possible to operate on non-array values. If you omit $name parameter, the functions will operate
 * directly on that field. For example, you can use an integer as a subdocument and invoke
 * ```$sub->inc();``` or ```$sub->bit(false, ['$and' => 1)``` on it.
 *
 * @method addToSet($name, $value, $emulate = null)
 * @method bit($name, $op, $emulate = null)
 * @method inc($name, $value = 1, $emulate = null)
 * @method push($name, $value, $emulate = null)
 * @method pushAll($name, $value, $emulate = null)
 * @method pull($name, $value, $emulate = null)
 * @method pullAll($name, $values, $emulate = null)
 * @method shift($name, $emulate = null)
 * @method pop($name, $first, $emulate = null)
 */
class Mongo_Subdocument implements ArrayAccess {

  /** @var Mongo_Document */
  protected $_doc;

  /** @var This document's name in dot notation */
  protected $_name;

  /** @var Reference to original value in the document */
  protected $_reference;

  /**
   * @param Mongo_Document $document Document containing this subdocument
   * @param string $name Name of this subdocument (in dot notation). If it does not exist, it will be created.
   *                     But it won't be saved until you change anything in it.
   * @param mixed $default
   */
  function __construct(Mongo_Document $document, $name, $default = array())
  {
    $this->_doc = $document;
    $this->_name = $name;
    $this->_reference = & $document->get_field_reference($name, $default !== null, $default);
  }

  /** Returns a subdocument for every value in the array. */
  public static function iterate(Mongo_Document $document, $name, $model = false)
  {
    if (is_bool($model)) $model = get_called_class();
    else if (is_object($model)) $model = get_class($model);

    $value = $document->get($name);
    if (!is_array($value) && !($value instanceof Iterator)) throw new MongoException();

    $result = array();
    foreach ($value as $key => $v)
    {
      $sub = new $model($document, $name . '.' . $key);
      $result[$key] = $sub;
    }
    return $result;
  }

  /** @return Mongo_Document */
  public function document()
  {
    return $this->_doc;
  }

  public function __call($name, $arguments)
  {
    // Workaround Reserved Keyword 'unset'
    // http://php.net/manual/en/reserved.keywords.php
    if ($name === 'unset') $name = '_unset';
    switch ($name)
    {
      case 'addToSet':
      case 'bit':
      case 'inc':
      case 'push':
      case 'pushAll':
      case 'pull':
      case 'pullAll':
      case 'shift':
      case 'pop':
      case '_unset':
        $arguments[0] = $this->get_field_name(count($arguments) ? $arguments[0] : false);
        call_user_func_array(array($this->_doc, $name), $arguments);
        return $this;
    }
    throw new Exception('Method not found by ' . get_class($this) . ': ' . $name);
  }

  public function get_field_name($name = false)
  {
    return $name ? $this->_name . '.' . $name : $this->_name;
  }

  public function get($name = false, $default = null)
  {
    return $this->get_field_reference($name, false, $default);
  }

  public function __get($name)
  {
    return $this->get($name);
  }

  public function &get_field_reference($name = false, $create = false, $default = null)
  {
    if (!$name) return $this->_reference;
    return Mongo_Document::get_named_reference($this->_reference, $name, $create, $default);
  }

  public function get_raw($name = false, $default = null)
  {
    return $this->get($name, $default);
  }

  public function __isset($name)
  {
    return $this->get($name) !== null;
  }

  public function set($name, $value, $emulate = true)
  {
    $this->_doc->set($this->get_field_name($name), $value, $emulate);
    return $this;
  }

  public function __set($name, $value)
  {
    return $this->set($name, $value);
  }

  public function _unset($name, $emulate = true)
  {
    $this->_doc->_unset($this->get_field_name($name), $emulate);
    return $this;
  }

  public function __unset($name)
  {
    return $this->_unset($name, true);
  }

  public function offsetExists($name)
  {
    return $this->__isset($name);
  }

  public function offsetGet($name)
  {
    return $this->get($name);
  }

  public function offsetSet($name, $value)
  {
    $this->set($name, $value, true);
  }

  public function offsetUnset($name)
  {
    $this->_unset($name, true);
  }

}
