<?php
/**
 * This class wraps the functionality of Mongo (connection) and MongoDB (database object) into one class.
 * When used with Kohana it can be instantiated simply by:
 *
 * <code>
 *  $db = Mongo_Database::instance();
 * </code>
 *
 * The above will assume the 'default' configuration from the APPPATH/config/mongo.php file.
 * Alternatively it may be instantiated with the name and configuration specified as arguments:
 *
 * <code>
 *   $db = Mongo_Database::instance('test', array(
 *     'database' => 'test'
 *   ));
 * </code>
 *
 * The Mongo_Collection class will gain access to the server by calling the instance method with a configuration name,
 * so if not using Kohana or the configuration name is not present in the config file then the instance should be created
 * before using any classes that extend Mongo_Collection or Mongo_Document.
 *
 * Mongo_Database can proxy all methods of MongoDB to the database instance as well as select collections using the __get
 * magic method.
 *
 * If using Kohana, profiling can be enabled/disabled via the configuration or on demand by setting the profiling property.
 *
 * @method array authenticate( string $username , string $password )
 * @method array command( array $data, array $options = array() )
 * @method MongoCollection createCollection( string $name, array $options = array() )
 * @method array createDBRef( mixed $ns , mixed $a )
 * @method array drop()
 * @method array dropCollection( mixed $coll )
 * @method array execute( mixed $code, array $args = array() )
 * @method bool forceError()
 * @method array getCollectionNames( bool $includeSystemCollections = FALSE )
 * @method array getDBRef( array $ref )
 * @method int getProfilingLevel()
 * @method array getReadPreference()
 * @method bool getSlaveOkay()
 * @method array lastError()
 * @method array listCollections( bool $includeSystemCollections = FALSE )
 * @method array prevError()
 * @method array repair( bool $preserve_cloned_files = FALSE, bool $backup_original_files = FALSE )
 * @method array resetError()
 * @method int setProfilingLevel( int $level )
 * @method bool setReadPreference(int $read_preference, array $tags = array())
 * @method bool setSlaveOkay(bool $ok = true)
 *
 * @author  Colin Mollenhour
 * @package Mongo_Database
 *
 * This class was adapted from http://github.com/Wouterrr/MangoDB
 */

class Mongo_Database {

  /* See http://bsonspec.org */
  const TYPE_DOUBLE        = 1;
  const TYPE_STRING        = 2;
  const TYPE_OBJECT        = 3;
  const TYPE_ARRAY         = 4;
  const TYPE_BINARY        = 5;
  const TYPE_OBJECTID      = 7;
  const TYPE_BOOLEAN       = 8;
  const TYPE_DATE          = 9;
  const TYPE_NULL          = 10;
  const TYPE_REGEX         = 11;
  const TYPE_CODE          = 13;
  const TYPE_SYMBOL        = 14;
  const TYPE_CODE_SCOPED   = 15;
  const TYPE_INT32         = 16;
  const TYPE_TIMESTAMP     = 17;
  const TYPE_INT64         = 18;
  const TYPE_MIN_KEY       = 255;
  const TYPE_MAX_KEY       = 127;

  /** Mongo_Database instances
   *  @static  array */
  protected static $instances = array();

  /**
   * @var   string     default db to use
   */
  public static $default = 'default';

  /**
   * Get a Mongo_Database instance. Configuration options are:
   *
   * <pre>
   *  server      A server connection string. See Mongo::__construct()
   *  options     The additional options for the connection ("connect" and "persist")
   *  database    *required* The database name to use for this instance
   *  profiling   Enable/disable profiling
   * </pre>
   *
   * @param   string $name   The configuration name
   * @param   array $config  Pass a configuration array to bypass the Kohana config
   * @param   bool $override Overrides current instance with a new one (useful for testing)
   * @return  Mongo_Database
   * @static
   */
  public static function instance($name = NULL, array $config = NULL, $override = false)
  {
    if ($name === NULL)
    {
      $name = self::$default;
    }
    if( $override || ! isset(self::$instances[$name]) )
    {
      // Support better integration with Laravel
      if ($config === NULL)
      {
        // Load the configuration for this database
          throw new Exception('!Cant init mongo DataBase,no config : '.$name);
        // $config = Kohana::config('mongo')->$name;
      }
      // Support better integration with Kohana
      else if ($config === NULL && class_exists('Kohana'))
      {
        $config = Kohana::$config->load('mongo')->$name;
      }

      new static($name,$config);
    }

    return self::$instances[$name];
  }

  /** Mongo_Database instance name
   *  @var  string */
  protected $_name;

  /** Connection state
   *  @var  boolean */
  protected $_connected = FALSE;

  /** The Mongo server connection
   *  @var  MongoClient|Mongo */
  protected $_connection;

  /** The database instance for the database name chosen by the config
   *  @var  MongoDB */
  protected $_db;

  /** The class name for the MongoCollection wrapper. Defaults to Mongo_Collection.
   * @var string */
  protected $_collection_class;

  /** A flag to indicate if profiling is enabled and to allow it to be enabled/disabled on the fly
   *  @var  boolean */
  public $profiling;

  /** A callback called when profiling starts
   * @var callback */
  protected $_start_callback = array('Profiler','start');

  /** A callback called when profiling stops
   * @var callback */
  protected $_stop_callback = array('Profiler','stop');
  protected $_config =null;

  /**
   * This cannot be called directly, use Mongo_Database::instance() instead to get an instance of this class.
   *
   * @param  string  $name  The configuration name
   * @param  array  $config The configuration data
   */
  protected function __construct($name, array $config)
  {

    $this->_config=$config;
    $this->_name = $name;

    // Setup connection options merged over the defaults and store the connection
    $options = array(
      'connect' => FALSE  // Do not connect yet
    );
    if(isset($config['db'][$name]))  $config = array_merge($config,$config['db'][$name]);
    if(isset($config['options']))
      $options = array_merge($options, $config['options']);

    // Use the default server string if no server option is given
    $server = isset($config['server'])
                ? $config['server']
                : "mongodb://".ini_get('mongo.default_host').":".ini_get('mongo.default_port');

    $this->_connection = class_exists('MongoClient') ? new MongoClient($server, $options) :  new Mongo($server, $options);


    // Save the database name for later use
    $this->_db = $config['database'];

    // Set the collection class name
    $this->_collection_class = (isset($config['collection']) ? $config['collection'] : 'Mongo_Collection');

    // Save profiling option in a public variable
    $this->profiling = (isset($config['profiling']) && $config['profiling']);

    // Store the database instance
    self::$instances[$name] = $this;
  }

  final public function __destruct()
  {
    try {
      $this->close();
      $this->_connection = NULL;
      $this->_connected = FALSE;
    } catch(Exception $e) {
      // can't throw exceptions in __destruct
    }
  }

  /**
   * @return  string  The configuration name
   */
  final public function __toString()
  {
    return $this->_name;
  }
  public function config()
  {
      return $this->_config;
  }
  /**
   * Force the connection to be established.
   * This will automatically be called by any MongoDB methods that are proxied via __call
   * 
   * @return boolean
   * @throws MongoException
   */
  public function connect()
  {
    if( ! $this->_connected)
    {
      if($this->profiling)
      {
        $_bm = $this->profiler_start("Mongo_Database::{$this->_name}","connect()");
      }

      $this->_connected = $this->_connection->connect();

      if ( isset($_bm))
      {
        $this->profiler_stop($_bm);
      }
      if (!$this->_db) throw new Exception('Cant set empty DB!');
      $this->_db = $this->_connection->selectDB("$this->_db");
      if ( isset($_bm))
      {
            //$this->_db->setProfilingLevel(3);
      }
    }
    return $this->_connected;
  }

  /**
   * Close the connection to Mongo
   *
   * @return  boolean  if the connection was successfully closed
   */
  public function close()
  {
    if ($this->_connected)
    {
     // $this->_db->setProfilingLevel(0);
      $this->_connected = $this->_connection->close();
      $this->_db = "$this->_db";
    }
    return $this->_connected;
  }

    /**
     * Get the MongoClient|Mongo instance directly
     * @return MongoClient|Mongo
     */
    public function connection()
    {
        return $this->_connection;
    }
  /**
   * Expose the MongoDb instance directly.
   *
   * @return  MongoDb
   */
  public function db()
  {
    $this->_connected OR $this->connect();
    return $this->_db;
  }

  /**
   * Proxy all methods for the MongoDB class.
   * Profiles all methods that have database interaction if profiling is enabled.
   * The database connection is established lazily.
   *
   * @param  string  $name
   * @param  array  $arguments
   * @throws Exception
   * @return mixed
   */
  public function __call($name, $arguments)
  {
    $this->_connected OR $this->connect();

    if( ! method_exists($this->_db, $name))
    {
      throw new Exception("Method does not exist: MongoDb::$name");
    }

    if ( $this->profiling && ! strpos("Error",$name) && $name != 'createDBRef' )
    {
      $json_arguments = array(); foreach($arguments as $arg) $json_arguments[] = json_encode((is_array($arg) ? (object)$arg : $arg));
      $method = ($name == 'command' ? 'runCommand' : $name);
      $_bm = $this->profiler_start("Mongo_Database::{$this->_name}","db.$method(".implode(',',$json_arguments).")");
    }

    $retval = call_user_func_array(array($this->_db, $name), $arguments);

    if ( isset($_bm))
    {
      $this->profiler_stop($_bm);
    }

    return $retval;
  }

  /**
   * Same usage as MongoDB::execute except it throws an exception on error
   *
   * @param  string  $code
   * @param  array  $args
   * @param  array  $scope  A scope for the code if $code is a string
   * @return mixed
   * @throws MongoException
   */
  public function execute_safe( $code, array $args = array(), $scope = array() )
  {
    if( ! $code instanceof MongoCode) {
      $code = new MongoCode($code, $scope);
    }
    $result = $this->execute($code, $args);
    if( empty($result['ok']) )
    {
      throw new MongoException($result['errmsg'], $result['code']);
    }
    return $result['retval'];
  }

  /**
   * Run a command, but throw an exception on error
   *
   * @param array $command
   * @return array
   * @throws MongoException
   */
  public function command_safe($command)
  {
    $result = $this->command($command);
    if( empty($result['ok']) )
    {
      $message = isset($result['errmsg']) ? $result['errmsg'] : 'Error: '.json_encode($result);
      $code = isset($result['errno']) ? $result['errno'] : 0;
      throw new MongoException($message, $code);
    }
    return $result;
  }

  /**
   * Get a Mongo_Collection instance (wraps MongoCollection)
   *
   * @param  string  $name
   * @return Mongo_Collection
   */
  public function selectCollection($name)
  {
    $this->_connected OR $this->connect();
    return new $this->_collection_class($name, $this->_name);
  }

  /**
   * Get a Mongo_Collection instance with grid FS enabled (wraps MongoCollection)
   *
   * @param  string  $prefix
   * @return Mongo_Collection
   */
  public function getGridFS($prefix = 'fs')
  {
    $this->_connected OR $this->connect();
    return new $this->_collection_class($prefix, $this->_name, TRUE);
  }

  /**
   * Fetch a collection by using object access syntax
   *
   * @param  string  $name  The collection name to select
   * @return  Mongo_Collection
   */
  public function __get($name)
  {
    return $this->selectCollection($name);
  }

  /**
   * Simple findAndModify helper
   *
   * @param string $collection
   * @param array $command
   * @return null|array
   * @throws MongoException
   */
  public function findAndModify($collection, $command)
  {
    $command = array_merge(array('findAndModify' => (string)$collection), $command);
    $result = $this->command_safe($command);
    return $result['value'];
  }

  /**
   * Get the next auto-increment value for the given key
   *
   * @param string $key
   * @param string $collection
   * @return int
   * @throws MongoException
   */
  public function get_auto_increment($key, $collection = 'autoincrements')
  {
    $data = $this->findAndModify($collection, array(
      'query'  => array('_id' => $key),
      'update' => array('$inc' => array('value' => 1)),
      'upsert' => TRUE,
      'new'    => TRUE,
    ));
    return $data['value'];
  }

  /**
   * Allows one to override the default Mongo_Collection class.
   *
   * @param string $class_name
   */
  public function set_collection_class($class_name)
  {
    $this->_collection_class = $class_name;
  }

  /**
   * Set the profiler callback. Defaults to Kohana profiler.
   *
   * @param callback $start
   * @param callback $stop
   */
  public function set_profiler($start, $stop)
  {
    $this->_start_callback = $start;
    $this->_stop_callback = $stop;
  }

  /**
   * Start method for profiler
   *
   * @param string $group
   * @param string $query
   * @return mixed
   */
  public function profiler_start($group, $query)
  {
    $this->_prof_start_time=microtime(true);
    return call_user_func($this->_start_callback, $group, $query);
  }

  /**
   * Stop method for profiler
   *
   * @param string $token
   */
  public function profiler_stop($token)
  {
    //microtime(true)-$this->_prof_start_time;
    call_user_func($this->_stop_callback, $token);
  }




  /**
   * Get the currently referenced database
   * @return  string
   */
  public function getName()
  {
    return $this->execute_safe('db.getName()');
  }


  /**
   * Checks if the given $collection exists in the currently referenced database
   * @param   string  $collection  Collection name
   * @return  bool
   */
  public function exists($collection)
  {
    $result = $this->execute_safe("db.{$collection}.exists()");

    return ( ! is_null($result));
  }

}
