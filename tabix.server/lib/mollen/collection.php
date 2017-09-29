<?php
/**
 * This json wrapper is included to provide a lenient decode method.
 *
 * @author  Colin Mollenhour
 * @package Mongo_Database
 */

class JSON {

  /**
   * Decode a JSON string that is not strictly formed.
   *
   * @param  string  $json
   * @param  boolean $assoc
   * @return array|object
   */
  public static function decode($json, $assoc = FALSE)
  {
    $json = utf8_encode($json);
    $json = str_replace(array("\n","\r"),"",$json);
    $json = preg_replace('/([{,])(\s*)([^"]+?)\s*:/','$1"$3":',$json);
    return json_decode($json,$assoc);
  }

  /**
   * Decode a JSON string that is not strictly formed into an array.
   *
   * @param  string  $json
   * @return array
   */
  public static function arr($json)
  {
    return self::decode($json,TRUE);
  }

  /**
   * Decode a JSON string that is not strictly formed into an object.
   *
   * @param  string  $json
   * @return object
   */
  public static function obj($json)
  {
    return self::decode($json);
  }

  /**
   * Encode an array or object into a JSON string
   *
   * @param  array|object $value
   * @return  string
   */
  public static function str($value)
  {
    return json_encode($value);
  }

}
/**
 * This class can be used in any of the following ways:
 *
 * 1. Directly as a wrapper for MongoCollection/MongoCursor:
 * <code>
 * $posts = new Mongo_Collection('posts');
 * $posts->sort_desc('published')->limit(10)->as_array(); // array of arrays
 * </code>
 *
 * 2. As part of the Table Data Gateway pattern
 * <code>
 * class Model_Post extends Mongo_Document {
 *   protected $name = 'posts';
 *   // All model-related code here
 * }
 *
 * $posts = Mongo_Document::factory('post')->collection(TRUE);
 * $posts->sort_desc('published')->limit(10)->as_array(); // array of Model_Post
 * </code>
 *
 * 3. As part of the Row Data Gateway pattern:
 * <code>
 * class Model_Post_Collection extends Mongo_Collection {
 *   protected $name = 'posts';
 *   // Collection-related code here
 * }
 *
 * class Model_Post extends Mongo_Document {
 *   // Document-related code here
 * }
 *
 * $posts = Mongo_Document::factory('post')->collection(TRUE);
 * $posts->sort_desc('published')->limit(10)->as_array(); // array of Model_Post
 * </code>
 *
 * @method mixed batchInsert(array $a, array $options = array())
 * @method array createDBRef(array $a)
 * @method array deleteIndex(mixed $keys)
 * @method array deleteIndexes()
 * @method array drop()
 * @method bool ensureIndex(mixed $keys, array $options = array())
 * @method array getDBRef(array $ref)
 * @method array getIndexInfo()
 * @method string getName()
 * @method array getReadPreference()
 * @method bool getSlaveOkay()
 * @method array group(mixed $keys, array $initial, MongoCode $reduce, array $options = array())
 * @method bool|array insert(array $data, array $options = array())
 * @method bool|array remove(array $criteria = array(), array $options = array())
 * @method mixed save(array $a, array $options = array())
 * @method bool setReadPreference(int $read_preference, array $tags = array())
 * @method bool setSlaveOkay(bool $ok = true)
 * @method bool|array update(array $criteria, array $new_object, array $options = array())
 * @method array validate(bool $scan_data = false)
 *
 * @author  Colin Mollenhour
 * @package Mongo_Database
 */
class Mongo_Collection implements Iterator, Countable
{

  /** @type integer ASC Sort mode - ascending */
  const ASC = 1;

  /** @type integer DESC Sort mode - descending */
  const DESC = -1;

  /**
   * Instantiate an object conforming to Mongo_Collection conventions.
   *
   * @param   string  $name The model name to instantiate
   * @return  Mongo_Collection
   * @deprecated
   */
  public static function factory($name)
  {
    return Mongo_Document::factory($name)->collection(TRUE);
  }

  /** The name of the collection within the database or the gridFS prefix if gridFS is TRUE
   *  @var  string */
  protected $name;

  /** The database configuration name (passed to Mongo_Database::instance() )
   *  @var  string  */
  protected $db = '_';

  /** Whether or not this collection is a gridFS collection
   *  @var  bool */
  protected $gridFS = FALSE;

  /** The class name or instance of the corresponding document model or NULL if direct mode
   *  @var  string */
  protected $_model;

  /** The cursor instance in use while iterating a collection
   *  @var  MongoCursor */
  protected $_cursor;

  /** The current query criteria (with field names translated)
   *  @var  array */
  protected $_query = array();

  /** The current query fields (a hash of 'field' => 1)
   *  @var  array */
  protected $_fields = array();

  /** The current query options
   *  @var  array */
  protected $_options = array();

  /** A cache of MongoCollection instances for performance
   *  @static  array */
  protected static $collections = array();

  /** A cache of Mongo_Document model instances for performance
   *  @static  array */
  protected static $models = array();

  /**
   * Instantiate a new collection object, can be used for querying, updating, etc..
   *
   * @param  string  $name  The collection name
   * @param  string  $db    The database configuration name
   * @param  bool    $gridFS  Is the collection a gridFS instance?
   * @param  bool|string $model   Class name of template model for new documents
   */
  public function __construct($name = NULL, $db = '_', $gridFS = FALSE, $model = FALSE)
  {
    if($name !== NULL)
    {
      $this->db = $db;
      $this->name = $name;
      $this->gridFS = $gridFS;
    }
    if($model)
    {
      $this->_model = $model;
    }
  }

  /**
   * Cloned objects have uninitialized cursors.
   */
  public function __clone()
  {
    $this->reset(TRUE);
  }

  /**
   * Reset the state of the query (must be called manually if re-using a collection for a new query)
   *
   * @param bool $cursor_only
   * @return  Mongo_Collection
   */
  public function reset($cursor_only = FALSE)
  {
    if( ! $cursor_only) {
      $this->_query = $this->_fields = $this->_options = array();
    }
    $this->_cursor = NULL;
    return $this;
  }

  /**
   * Magic method override. Passes on method calls to either the MongoCursor or the MongoCollection
   *
   * @param   string $name
   * @param   array $arguments
   * @return  mixed
   */
  public function __call($name, $arguments)
  {
    if($this->_cursor && method_exists($this->_cursor, $name))
    {
      return call_user_func_array(array($this->_cursor, $name), $arguments);
    }

    if(method_exists($this->collection(),$name))
    {
      if($this->db()->profiling && in_array($name,array('batchInsert','findOne','getDBRef','group','insert','remove','save','update')))
      {
        $json_arguments = array(); foreach($arguments as $arg) $json_arguments[] = json_encode((is_array($arg) ? (object)$arg : $arg));
        $bm = $this->db()->profiler_start("Mongo_Database::$this->db","db.$this->name.$name(".implode(',',$json_arguments).")");
      }

      $return = call_user_func_array(array($this->collection(), $name), $arguments);

      if(isset($bm))
      {
        $this->db()->profiler_stop($bm);
      }

      return $return;
    }

    trigger_error('Method not found by Mongo_Collection: '.$name);
    return FALSE;
  }
  private $_def_cnf=null;
  /**
   * Get the Mongo_Database instance used for this collection
   *
   * @return  Mongo_Database
   */
  public function db()
  {
    if ($this->db!=='_' && $this->db!=='default')
    {

        if (!$this->_def_cnf)
        {
//            $this->_def_cnf=Mongo_Database::instance('default')->config();
//            $this->_def_cnf['database']=$this->db;

        }
        return engine::mongo($this->db);
//        return Mongo_Database::instance($this->db,$this->_def_cnf);
    }
    return engine::mongo($this->db);
  }

  /**
   * Get the corresponding MongoCollection instance
   *
   * @return  MongoCollection
   */
  public function collection()
  {
    $name = "$this->db.$this->name.$this->gridFS";
    if( ! isset(self::$collections[$name]))
    {
      $selectMethod = ($this->gridFS ? 'getGridFS' : 'selectCollection');
      self::$collections[$name] = $this->db()->db()->$selectMethod($this->name);
    }
    return self::$collections[$name];
  }

  /**
   * Set some criteria for the query. Unlike MongoCollection::find, this can be called multiple
   * times and the query parameters will be merged together.
   *
   * <pre>
   * Usages:
   *   $query is an array
   *   $query is a field name and $value is the value to search for
   *   $query is a JSON string that will be interpreted as the query criteria
   * </pre>
   *
   * @param   mixed $query  An array of parameters or a key
   * @param   mixed $value  If $query is a key, this is the value
   * @throws  MongoCursorException
   * @throws  Exception
   * @return  Mongo_Collection
   */
  public function find($query = array(), $value = NULL)
  {
    if($this->_cursor) throw new MongoCursorException('The cursor has already been instantiated.');
    if( ! is_array($query))
    {
      if($query[0] == "{")
      {
        $query = JSON::arr($query);
        if($query === NULL)
        {
          throw new Exception('Unable to parse query from JSON string.');
        }
      }
      else
      {
        $query = array($query => $value);
      }
    }

    // Translate field aliases
    $query_fields = array();
    foreach($query as $field => $value)
    {
      // Special purpose condition
      if($field[0] == '$')
      {
        // $or and $where and possibly other special values
        if($field == '$or' && ! is_int(key($value)))
        {
          if( ! isset($this->_query['$or']))
          {
            $this->_query['$or'] = array();
          }
          $this->_query['$or'][] = $value;
        }
        else if($field == '$where')
        {
          $this->_query['$where'] = $value;
        }
        else
        {
          $query_fields[$field] = $value;
        }
      }

      // Simple key = value condition
      else
      {
        $query_fields[$this->get_field_name($field)] = $value;
      }
    }

    $this->_query = self::array_merge_recursive_distinct($this->_query, $query_fields);
    return $this;
  }

  /**
   * Add fields to be returned by the query.
   *
   * @param   array $fields
   * @param   int|bool $include
   * @throws  MongoCursorException
   * @return  Mongo_Collection
   */
  public function fields($fields = array(), $include = 1)
  {
    if($this->_cursor) throw new MongoCursorException('The cursor has already started iterating.');

    // Map array to hash
    if($fields == array_values($fields))
    {
      $fields = array_fill_keys($fields, (int) $include);
    }

    // Translate field aliases
    foreach($fields as $field => $value)
    {
      $this->_fields[$this->get_field_name($field)] = $value;
    }

    return $this;
  }

  /**
   * Gives the database a hint about the query
   *
   * @param array $key_pattern
   * @return  Mongo_Collection
   */
  public function hint(array $key_pattern)
  {
    return $this->set_option('hint', $key_pattern);
  }

  /**
   * Sets whether this cursor will timeout
   *
   * @param   bool $liveForever
   * @return  Mongo_Collection
   */
  public function immortal($liveForever = TRUE)
  {
    return $this->set_option('immortal', $liveForever);
  }

  /**
   * Limits the number of results returned
   *
   * @param   int $num
   * @return  Mongo_Collection
   */
  public function limit($num)
  {
    return $this->set_option('limit', $num);
  }

  /**
   * Skips a number of results
   *
   * @param   int $num
   * @return  Mongo_Collection
   */
  public function skip($num)
  {
    return $this->set_option('skip', $num);
  }

  /**
   * Sets whether this query can be done on a slave
   *
   * @param   bool $okay
   * @return  Mongo_Collection
   */
  public function slaveOkay($okay = TRUE)
  {
    return $this->set_option('slaveOkay', $okay);
  }

  /**
   * Use snapshot mode for the query
   *
   * @return  Mongo_Collection
   */
  public function snapshot()
  {
    return $this->set_option('snapshot', NULL);
  }

  /**
   * Sorts the results by given fields
   *
   * @param   array|string $fields  A sort criteria or a key (requires corresponding $value)
   * @param   string|int   $direction The direction if $fields is a key
   * @throws  MongoCursorException
   * @return  Mongo_Collection
   */
  public function sort($fields, $direction = self::ASC)
  {
    if($this->_cursor) throw new MongoCursorException('The cursor has already started iterating.');

    if( ! isset($this->_options['sort']))
    {
      $this->_options['sort'] = array();
    }

    if( ! is_array($fields))
    {
      $fields = array($fields => $direction);
    }

    // Translate field aliases
    foreach($fields as $field => $direction)
    {
      if(is_string($direction))
      {
        if($direction == 'asc' || $direction == '1')
          $direction = self::ASC;
        else
          $direction = self::DESC;
      }

      $this->_options['sort'][$this->get_field_name($field)] = $direction;
    }

    return $this;
  }

  /**
   * Sorts the results ascending by the given field
   *
   * @param   string  $field The field name to sort by
   * @return  Mongo_Collection
   */
  public function sort_asc($field)
  {
    return $this->sort($field,self::ASC);
  }

  /**
   * Sorts the results descending by the given field
   *
   * @param   string  $field The field name to sort by
   * @return  Mongo_Collection
   */
  public function sort_desc($field)
  {
    return $this->sort($field,self::DESC);
  }

  /**
   * Sets whether this cursor will be left open after fetching the last results
   *
   * @param   bool $tail
   * @return  Mongo_Collection
   */
  public function tailable($tail = TRUE)
  {
    return $this->set_option('tailable', $tail);
  }

  /**
   * See if a cursor has an option to be set before executing the query.
   *
   * @param  string  $name
   * @return bool
   */
  public function has_option($name)
  {
    return array_key_exists($name, $this->_options);
  }

  /**
   * Get a cursor option to be set before executing the query.
   * Also supports retrieving 'query' and 'fields'.
   *
   * @param  string  $name
   * @return mixed
   */
  public function get_option($name)
  {
    if($name == 'query')
    {
      return $this->_query;
    }
    if($name == 'fields')
    {
      return $this->_fields;
    }
    return isset($this->_options[$name]) ? $this->_options[$name] : NULL;
  }

  /**
   * @return array
   */
  public function get_query()
  {
    return $this->_query;
  }

  /**
   * Set a cursor option. Will apply to currently loaded cursor if it has not started iterating.
   * Also supports setting 'query' and 'fields'.
   *
   * @param  string  $name
   * @param  mixed  $value
   * @throws MongoCursorException
   * @return Mongo_Collection
   */
  public function set_option($name, $value)
  {
    if($name != 'batchSize' && $name != 'timeout' && $this->is_iterating())
    {
      throw new MongoCursorException('The cursor has already started iterating.');
    }

    if($name == 'query')
    {
      $this->_query = $value;
    }
    else if($name == 'fields')
    {
      $this->_fields = $value;
    }
    else
    {
      if($this->_cursor)
      {
        if($value === NULL) $this->_cursor->$name();
        else $this->_cursor->$name($value);
      }

      $this->_options[$name] = $value;
    }
    return $this;
  }

  /**
   * Unset a cursor option to be set before executing the query.
   *
   * @param  string  $name
   * @throws MongoCursorException
   * @return Mongo_Collection
   */
  public function unset_option($name)
  {
    if($this->is_iterating())
    {
      throw new MongoCursorException('The cursor has already started iterating.');
    }
    unset($this->_options[$name]);
    return $this;
  }

  /**
   * Is the query executed yet?
   *
   * @return bool
   */
  public function is_loaded()
  {
    return !!$this->_cursor;
  }

  
  /**
   * Is the query iterating yet?
   *
   * @throws Exception
   * @return bool
   */
  public function is_iterating()
  {
    if( ! $this->_cursor) {
      return FALSE;
    }
    $info = $this->_cursor->info();
    if( ! isset($info['started_iterating'])) {
      throw new Exception('Driver version >= 1.0.10 required.');
    }
    return $info['started_iterating'];
  }

  /**
   * Instantiates a cursor, after this is called the query cannot be modified.
   * This is automatically called when the iterator initializes (rewind).
   *
   * @throws  MongoCursorException
   * @throws  MongoException
   * @return  Mongo_Collection
   */
  public function load()
  {
    // Execute the query, add query to any thrown exceptions
    try
    {
      $this->_cursor = $this->collection()->find($this->_query, $this->_fields);
    }
    catch(MongoCursorException $e) {
      throw new MongoCursorException("{$e->getMessage()}: {$this->inspect()}", $e->getCode());
    }
    catch(MongoException $e) {
      throw new MongoException("{$e->getMessage()}: {$this->inspect()}", $e->getCode());
    }

    // Add cursor options
    foreach($this->_options as $key => $value)
    {
      if($value === NULL) $this->_cursor->$key();
      else $this->_cursor->$key($value);
    }

    return $this;
  }

  /**
   * Wrapper for MongoCollection#findOne which adds field name translations and allows query to be a single _id
   *
   * @param  mixed  $query  An _id, a JSON encoded query or an array by which to search
   * @param  array  $fields Fields of the results to return
   * @throws Exception
   * @return mixed  Record matching query or NULL
   */
  public function findOne($query = array(), $fields = array())
  {
    // String query is either JSON encoded or an _id
    if( ! is_array($query))
    {
      if($query[0] == "{")
      {
        $query = JSON::arr($query);
        if($query === NULL)
        {
          throw new Exception('Unable to parse query from JSON string.');
        }
      }
      else
      {
        $query = array('_id' => $query);
      }
    }

    // Translate field aliases
    $query_trans = array();
    foreach($query as $field => $value)
    {
      $query_trans[$this->get_field_name($field)] = $value;
    }

    $fields_trans = array();
    if($fields && is_int(key($fields)))
    {
      $fields = array_fill_keys($fields, 1);
    }
    foreach($fields as $field => $value)
    {
      $fields_trans[$this->get_field_name($field)] = $value;
    }

    return $this->__call('findOne', array($query_trans, $fields_trans));
  }

  /**
   * Simple findAndModify helper
   *
   * @param null|array $command
   * @return array
   */
  public function findAndModify($command)
  {
    return $this->db()->findAndModify($this->name, $command);
  }

  /**
   * Get the next auto-increment value for this collection
   *
   * @return null|int
   * @throws MongoException
   */
  public function get_auto_increment()
  {
    return $this->db()->get_auto_increment($this->name);
  }

  /**
   * Perform a group aggregation and return the result or throw an exception on error
   * @param string|array $keys
   * @param array $initial
   * @param string|MongoCode $reduce
   * @param array $options
   * @return
   * @throws MongoException on error
   */
  public function group_safe($keys, $initial, $reduce, $options = array())
  {
    if(is_string($keys)) {
      $keys = array($keys => 1);
    }
    if( ! $reduce instanceof MongoCode) {
      $reduce = new MongoCode($reduce);
    }
    $result = $this->__call('group', array($keys, $initial, $reduce, $options));
    if( empty($result['ok'])) {
      $message = json_encode($result); //isset($result['errmsg']) ? $result['errmsg'] : ;
      throw new MongoException($message);
    }
    return $result['retval'];
  }

  /**
   * Perform an update, throw exception on errors.
   * If multi update return number of documents updated on success
   * Otherwise return whether or not an object was updated
   *
   * Return values depend on type of update:
   *   multiple     return number of documents updated on success
   *   upsert       return upserted id if upsert resulted in new document
   *   updatedExisting flag for all other cases
   *
   * @param array $criteria
   * @param array $update
   * @param array $options
   * @return bool|int|MongoId
   * @throws MongoException on error
   */
  public function update_safe($criteria, $update, $options = array())
  {
    $writeConcern = $this->db()->db()->w == 0 ? 1 : $this->db()->db()->w;
    $options = array_merge(array('w' => $writeConcern, 'multiple' => FALSE, 'upsert' => FALSE), $options);

    // Convert legacy safe option
    if (isset($options['safe'])) {
      $options['j'] = $options['safe'];
      unset($options['safe']);
    }

    $result = $this->update($criteria, $update, $options);

    // For unacknowledged writes, just return the result
    if($options['w'] == 0 && empty($options['j'])) {
      return $result;
    }

    // According to the driver docs an exception should have already been thrown if there was an error, but just in case...
    if( ! $result['ok']) {
      throw new MongoException($result['err']);
    }

    // Return the number of documents updated for multiple updates or the updatedExisting flag for single updates
    if($options['multiple']) {
      return $result['n'];
    }
    // Return the upserted id if a document was upserted with a new _id
    else if($options['upsert'] && ! $result['updatedExisting'] && isset($result['upserted'])) {
      return $result['upserted'];
    }
    // Return the updatedExisting flag for single, non-upsert updates
    else {
      return $result['updatedExisting'];
    }
  }

  /**
   * Remove, throw exception on errors.
   *
   * Returns number of documents removed if acknowledged, otherwise just if the operation was successfully sent.
   *
   * [!!] Note: You cannot use this method with a capped collection.
   *
   * @param array $criteria  Description of records to remove [Optional]
   * @param array $options   Options for remove [Optional]
   * @return bool|int
   * @throws MongoException on error
   */
  public function remove_safe(array $criteria = array(), array $options = array())
  {
    $writeConcern = $this->db()->db()->w == 0 ? 1 : $this->db()->db()->w;
    $options = array_merge(array('w' => $writeConcern, 'justOne' => FALSE), $options);
    $result = $this->remove($criteria, $options);

    // For unacknowledged writes, just return the result
    if($options['w'] == 0 && empty($options['j'])) {
      return $result;
    }

    // According to the driver docs an exception should have already been thrown if there was an error, but just in case...
    if( ! $result['ok']) {
      throw new MongoException($result['err']);
    }

    // Return the number of documents removed
    return $result['n'];
  }

  /**
   * Get an instance of the corresponding document model.
   *
   * @return  Mongo_Document
   */
  public function model()
  {
      $model = $this->_model;
      return new $model;

  }
  /**
   * Get an instance of the corresponding document model.
   *
   * @return  Mongo_Document
   */
  protected function get_model()
  {
    if( ! isset(self::$models[$this->_model]))
    {
      $model = $this->_model;
      self::$models[$this->_model] = new $model;
    }
    return self::$models[$this->_model];
  }

  /**
   * Translate a field name according to aliases defined in the model if they exist.
   *
   * @param  string $name
   * @return string
   */
  public function get_field_name($name)
  {
    if( ! $this->_model)
    {
      return $name;
    }
    return $this->get_model()->get_field_name($name);
  }

  /**
   * Access the MongoCursor instance directly, triggers a load if there is none.
   *
   * @return  MongoCursor
   */
  public function cursor()
  {
    $this->_cursor OR $this->load();
    return $this->_cursor;
  }

  /**
   * Returns the current query results as an array
   *
   * @param   bool $objects  Pass FALSE to get raw data
   * @return  array
   */
  public function as_array( $objects = TRUE )
  {
    $array = array();

    // Iterate using wrapper
    if($objects)
    {
      foreach($this as $key => $value)
      {
        $array[$key] = $value;
      }
    }

    // Iterate bypassing wrapper
    else
    {
      $this->rewind();
      foreach($this->_cursor as $key => $value)
      {
        $array[$key] = $value;
      }
    }
    return $array;
  }

  /**
   * Return an array of values or an associative array of keys and values
   *
   * @param   string $key
   * @param   mixed $val
   * @return  array
   */
  public function select_list($key = '_id',$val = NULL)
  {
    if($val === NULL)
    {
      $val = $key;
      $key = NULL;
    }

    $list = array();

    foreach($this->cursor() as $data)
    {
      if($key !== NULL)
      {
        $list[(string) $data[$key]] = (isset($data[$val]) ? $data[$val] : NULL);
      }
      else if(isset($data[$val]))
      {
        $list[] = $data[$val];
      }
    }

    return $list;
  }

  /**
   * Emulate an SQL "NATURAL JOIN" when there is a 1-1 or n-1 relationship with one additional query
   * for all related documents
   *
   * @param string $model_field
   * @param string $id_field
   * @return array
   */
  public function natural_join($model_field, $id_field = NULL)
  {
    if( ! $id_field) {
      $id_field = "_$model_field";
    }

    $left = $this->as_array();
    $right_ids = array();
    foreach($left as $doc)
    {
      $right_id = $doc->$id_field;
      if($right_id)
      {
        $right_ids[$right_id] = TRUE;
      }
    }
    if($right_ids)
    {
      $right = $this->get_model()->$model_field->collection(TRUE)
                  ->find(array(
                    '_id' => array('$in' => array_keys($right_ids)))
                  )
                  ->as_array();
      foreach($left as $doc)
      {
        if(isset($right[$doc->$id_field]))
        {
          $doc->$model_field = $right[$doc->$id_field];
        }
      }
    }
    return $left;
  }

  /********************************
   * Iterator and Countable methods
   ********************************/

  /**
   * Countable: count
   *
   * Count the results from the current query: pass FALSE for "all" results (disregard limit/skip)<br/>
   * Count results of a separate query: pass an array or JSON string of query parameters
   *
   * @param  mixed $query
   * @throws Exception
   * @return int
   */
  public function count($query = TRUE)
  {
    if(is_bool($query))
    {
      // Profile count operation for cursor
      if($this->db()->profiling)
      {
        $bm = $this->db()->profiler_start("Mongo_Database::$this->db",$this->inspect().".count(".JSON::str($query).")");
      }

      $this->_cursor OR $this->load(TRUE);

      $count = $this->_cursor->count($query);
    }
    else
    {
      if(is_string($query) && $query[0] == "{")
      {
        $query = JSON::arr($query);
        if($query === NULL)
        {
          throw new Exception('Unable to parse query from JSON string.');
        }
      }
      $query_trans = array();
      foreach($query as $field => $value)
      {
        $query_trans[$this->get_field_name($field)] = $value;
      }
      $query = $query_trans;

      // Profile count operation for collection
      if($this->db()->profiling)
      {
        $bm = $this->db()->profiler_start("Mongo_Database::$this->db","db.$this->name.count(".($query ? JSON::str($query):'').")");
      }

      $count = $this->collection()->count($query);
    }

    // End profiling count
    if(isset($bm))
    {
      $this->db()->profiler_stop($bm);
    }

    if (is_array($count)) throw new MongoException(json_encode($count));

    return $count;
  }

  /**
   * Implement MongoCursor#hasNext to ensure that the cursor is loaded
   *
   * @return  bool
   */
  public function hasNext()
  {
    return $this->cursor()->hasNext();
  }

  /**
   * Implement MongoCursor#getNext so that the return value is a Mongo_Document instead of array
   *
   * @return  array|Mongo_Document
   */
  public function getNext()
  {
    if( $this->db()->profiling && ( ! $this->_cursor || ! $this->is_iterating() ) )
    {
      $this->cursor();
      $bm = $this->db()->profiler_start("Mongo_Database::$this->db", $this->inspect());
      $this->cursor()->next();
      $this->db()->profiler_stop($bm);
    }
    else
    {
      $this->cursor()->next();
    }
    return $this->current();
  }

  /**
   * Iterator: current
   *
   * @return array|Mongo_Document
   */
  public function current()
  {
    $data = $this->_cursor->current();

    if(isset($this->_bm))
    {
      $this->db()->profiler_stop($this->_bm);
      unset($this->_bm);
    }

    if( ! $this->_model)
    {
      return $data;
    }
    $modelName=false;
    
    
    if (method_exists($this, '_createByModel'))
        {
            $name=$this->_createByModel($data);
            $model = new $name();
        }
        else
        {
            $model = clone $this->get_model();
        }    
    return $model->load_values($data,TRUE);
  }

  /**
   * Iterator: key
   * @return string
   */
  public function key()
  {
    return $this->_cursor->key();
  }

  /**
   * Iterator: next
   */
  public function next()
  {
    $this->_cursor->next();
  }

  /**
   * Iterator: rewind
   */
  public function rewind()
  {
    try
    {
      if($this->db()->profiling)
      {
        $expl=$this->cursor()->explain();
        $bm = $this->db()->profiler_start("Mongo_Database::$this->db",$this->inspect());
        $bm['explain']=$expl;
        $this->cursor()->rewind();
                
        $this->db()->profiler_stop($bm);
      }
      else
      {
        $this->cursor()->rewind();
      }
    }
    catch(MongoCursorException $e) {
      throw new MongoCursorException("{$e->getMessage()}: {$this->inspect()}", $e->getCode());
    }
    catch(MongoException $e) {
      throw new MongoException("{$e->getMessage()}: {$this->inspect()}", $e->getCode());
    }
  }

  /**
   * Iterator: valid
   * @return bool
   */
  public function valid()
  {
    return $this->_cursor->valid();
  }

  /**
   * Return a string representation of the full query (in Mongo shell syntax)
   *
   * @return  string
   */
  public function inspect()
  {
    $query = array();
    if($this->_query) {
      $query[] = JSON::str($this->_query);
    } else {
      $query[] = '{}';
    }
    if($this->_fields) $query[] = JSON::str($this->_fields);
    $query = "db.$this->name.find(".implode(',',$query).")";
    foreach($this->_options as $key => $value)
    {
      $query .= ".$key(".JSON::str($value).")";
    }
    return $query;
  }

  /**
   * Return the collection name
   *
   * @return string
   */
  public function  __toString()
  {
    return $this->name;
  }

  /**
   * array_merge_recursive_distinct does not change the datatypes of the values in the arrays.
   * @param array $array1
   * @param array $array2
   * @return array
   */
  protected static function array_merge_recursive_distinct ( array $array1, array $array2 )
  {
    if( ! count($array1)) {
      return $array2;
    }

    foreach ( $array2 as $key => $value )
    {
      if ( is_array ( $value ) && isset ( $array1 [$key] ) && is_array ( $array1 [$key] ) )
      {
        // Intersect $in queries
        if($key == '$in')
        {
          $array1[$key] = array_intersect($array1[$key], $value);
        }
        // Union $nin and $all queries
        else if($key == '$nin' || $key == '$all')
        {
          $array1[$key] = array_unique(array_splice($array1[$key], count($array1[$key]), 0, $value));
        }
        // Recursively merge all other queries/values
        else
        {
          $array1 [$key] = self::array_merge_recursive_distinct ( $array1 [$key], $value );
        }
      }
      else
      {
        $array1 [$key] = $value;
      }
    }

    return $array1;
  }

  /**
   * To find places $distanceKm kilometer around $pos use:
   *
   * $collection->geoNear($pos, $query, $distanceKm / 6378.137, 10, ['distanceMultiplier' => 6378.137, 'spherical' => true]);
   *
   * @param array $near Position [lon, lat]
   * @param null|array $query Additional query
   * @param null|float $maxDistance Maximum distance
   * @param null|float $num Limit
   * @param array $options Additional options like distanceMultiplier, spherical
   * @param null|array $result Reference to variable, where original result object will be stored
   * @param string $distanceKey
   * @return Array of Mongo_Document objects with distance set as $distanceKey (_distance by default)
   */
  public function geoNear(array $near, $query = null, $maxDistance = null, $num = null, array $options = array(), &$result = null, $distanceKey = '_distance')
  {
    $options = array_merge(
            array('geoNear' => $this->name, 'near' => $near)
            , $options);
    if ($query) $options['query'] = $query;
    if ($maxDistance) $options['maxDistance'] = $maxDistance;
    if ($num) $options['num'] = $num;
    $result = $this->db()->command_safe($options);
    $objects = $result['results'];
    $docs = array();
    foreach ($objects as $object)
    {
      $doc = clone $this->get_model();
      $objData = $object['obj'];
      $objData[$distanceKey] = $object['dis'];
      $doc->load_values($objData, TRUE);
      $docs[] = $doc;
    }
    return $docs;
  }

  /**
   *   map : <mapfunction>,
   *   reduce : <reducefunction>,
   *   out : <see output options below>
   *   [, query : <query filter object>]
   *   [, sort : <sorts the input objects using this key. Useful for optimization, like sorting by the emit key for fewer reduces>]
   *   [, limit : <number of objects to return from collection, not supported with sharding>]
   *   [, keeptemp: <true|false>]
   *   [, finalize : <finalizefunction>]
   *   [, scope : <object where fields go into javascript global scope >]
   *   [, jsMode : true]
   *   [, verbose : true]
   *
   * @param string|MongoCode $map
   * @param string|MongoCode $reduce
   * @param bool $out
   * @param bool $query
   * @param bool $sort
   * @param array $options
   * @return array
   */
  public function mapReduce($map, $reduce, $out = true, $query = false, $sort = false, array $options = array())
  {
    if ($out == true) $out = array('inline' => true);
    $options = array_merge(array(
        'mapreduce' => $this->name,
        'map'       => $map,
        'reduce'    => $reduce,
        'out'       => $out,
        'query'     => $query,
        'sort'      => $sort,
    ), $options);
    if (empty($options['query'])) unset($options['query']);
    if (empty($options['sort'])) unset($options['sort']);
    return $this->db()->command_safe($options);
  }

  /**
   * @param string $key
   * @param array $query
   * @return array
   */
  public function distinct($key, $query = array())
  {
    return $this->db()->command_safe(array(
                'distinct' => $this->name,
                'key'      => $key,
                'query'    => $query
            ));
  }

  /**
   * @param array $pipeline
   * @return array
   */
  public function aggregate($pipeline)
  {
    return $this->db()->command_safe(array(
                'aggregate' => $this->name,
                'pipeline'  => $pipeline,
            ));
  }

  /**
   * @return bool
   */
  public function isCapped()
  {
    $stats = $this->stats();
    return !empty($stats['capped']);
  }

  /**
   * Removes all documents from a capped collection.
   *
   * @return array
   */
  public function emptyCapped()
  {
    return $this->db()->command_safe(array(
                'emptycapped' => $this->name,
            ));
  }

  /**
   * Returns a variety of storage statistics for a given collection.
   *
   * @param int $scale
   * @return array
   */
  public function stats($scale = 1024)
  {
    return $this->db()->command_safe(array(
        'collStats' => $this->name,
        'scale'     => $scale
    ));
  }

}
