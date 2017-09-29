<?php
/**
 * colinmollenhour / mongodb-php-odm
 * https://github.com/colinmollenhour/mongodb-php-odm
 * This class objectifies a MongoDB document and can be used with one of the following design patterns:
 *
 * 1. Table Data Gateway pattern:
 * <code>
 * class Model_Post extends Mongo_Document {
 *   protected $name = 'posts';
 *   // All model-related code here
 * }
 *
 * $post = Mongo_Document::factory('post', $post_id);
 * </code>
 *
 * 2. Row Data Gateway pattern:
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
 * $post = Mongo_Document::factory('post', $post_id);
 * </code>
 *
 * The following examples could be used with either pattern with no differences in usage. The Row Data Gateway pattern is recommended
 * for more complex models to improve code organization while the Table Data Gateway pattern is recommended for simpler models.
 *
 * <code>
 *   class Model_Document extends Mongo_Document {
 *     protected $name = 'test';
 *   }
 *
 *   $document = new Model_Document(); // or Mongo_Document::factory('document');
 *   $document->name = 'Mongo';
 *   $document->type = 'db';
 *   $document->save();
 *   // db.test.save({"name":"Mongo","type":"db"});
 * </code>
 *
 * The _id is aliased to id by default. Other aliases can also be defined using the _aliases protected property. Aliases can be used
 * anywhere that a field name can be used including dot-notation for nesting.
 *
 * <code>
 *   $id = $document->id;  // MongoId
 * </code>
 *
 * All methods that take query parameters support JSON strings as input in addition to PHP arrays. The JSON parser is more lenient
 * than usual.
 *
 * <code>
 *   $document->load('{name:"Mongo"}');
 *   // db.test.findOne({"name":"Mongo"});
 * </code>
 *
 * Methods which are intended to be overridden are {before,after}_{save,load,delete} so that special actions may be
 * taken when these events occur:
 *
 * <code>
 *   public function before_save()
 *   {
 *     $this->inc('visits');
 *     $this->last_visit = time();
 *   }
 * </code>
 *
 * When a document is saved, update will be used if the document already exists, otherwise insert will be used, determined
 * by the presence of an _id. A document can be modified without being loaded from the database if an _id is passed to the constructor:
 *
 * <code>
 *   $doc = new Model_Document($id);
 * </code>
 *
 * Atomic operations and updates are not executed until save() is called and operations are chainable. Example:
 *
 * <code>
 *   $doc->inc('uses.boing')
 *       ->push('used', array('type' => 'sound', 'desc' => 'boing'));
 *
 *   $doc->inc('uses.bonk')
 *       ->push('used', array('type' => 'sound', 'desc' => 'bonk'))
 *       ->save();
 *
 *   // db.test.update(
 *   //   {"_id": "some-id-here"},
 *   //   {"$inc":
 *   //     {"uses.boing": 1, "uses.bonk": 1},
 *   //     "$pushAll":
 *   //       {"used": [
 *   //                  {"type": "sound", "desc": "boing"},
 *   //                  {"type": "sound", "desc": "bonk"}
 *   //                ]
 *   //       }
 *   //   }
 *   // );
 * </code>
 *
 * Documents are loaded lazily so if a property is accessed and the document is not yet loaded, it will be loaded on the first property access:
 *
 * <code>
 *   echo "$doc->name rocks!";
 *   // Mongo rocks!
 * </code>
 *
 * Documents are reloaded when accessing a property that was modified with an operator and then saved:
 *
 * <code>
 *   in_array($doc->roles, 'admin'); // TRUE
 *
 *   $doc->pull('roles', 'admin');
 *   in_array($doc->roles, 'admin'); // TRUE
 *
 *   $doc->save();
 *   in_array($doc->roles, 'admin'); // FALSE
 * </code>
 *
 * Documents can have references to other documents which will be loaded lazily and saved automatically.
 *
 * <code>
 *   class Model_Post extends Mongo_Document {
 *     protected $name = 'posts';
 *     protected $_references = array('user' => array('model' => 'user'));
 *   }
 *
 *   class Model_User extends Mongo_Document {
 *     protected $name = 'users';
 *   }
 *
 *   $user = Mongo_Document::factory('user')
 *                         ->set('id',    'colin')
 *                         ->set('email', 'colin@mollenhour.com');
 *   $post = Mongo_Document::factory('post');
 *
 *   $post->user  = $user;
 *   $post->title = 'MongoDB';
 *   $post->save()
 *   // db.users.save({"_id": "colin", "email": "colin@mollenhour.com"})
 *   // db.posts.save({"_id": Object, "_user": "colin", "title":"MongoDb"})
 *
 *   $post = new Model_Post($id);
 *
 *   $post->_user;
 *   // "colin" - the post was loaded lazily.
 *
 *   $post->user->id;
 *   // "colin" - the user object was created lazily but not loaded.
 *
 *   $post->user->email;
 *   // "colin@mollenhour.com" - now the user document was loaded as well.
 * </code>
 *
 * @author  Colin Mollenhour
 * @package Mongo_Database
 */
define('ARRAY_FLAT','ARRAY_FLAT');

abstract class Mongo_Document implements ArrayAccess {

  const SAVE_INSERT = 'insert';
  const SAVE_UPDATE = 'update';
  const SAVE_UPSERT = 'upsert';

  public static $models = array ();


  /**
   * Instantiate an object conforming to Mongo_Document conventions.
   * The document is not loaded until load() is called.
   *
   * @param   string  $name Model name
   * @param   mixed   $load _id of the document to operate on or criteria used to load [Optional]
   * @return  Mongo_Document
   */
  public static function factory($name, $load = NULL)
  {
    if (isset(self::$models[$name]))
    {
      $class = self::$models[$name];
    }
    else if (strpos($name, '\\') !== FALSE)
    {
      $class = $name;
    }
    else
    {
      $class = 'Model_' . implode('_', array_map('ucfirst', explode('_', $name)));
    }
    return new $class($load);
  }

  /** The name of the collection within the database or the gridFS prefix if gridFS is TRUE
   *
   *  If using a corresponding Mongo_Collection subclass, set this only in the Mongo_Collection subclass.
   *
   * @var  string */
  protected $name;
  protected $autoSequenceBase32=false;

  /** The database configuration name (passed to Mongo_Database::instance() )
   *
   *  If using a corresponding Mongo_Collection subclass, set this only in the Mongo_Collection subclass.
   *
   * @var  string */
  protected $db;

  /** Whether or not this collection is a gridFS collection
   *
   *  If using a corresponding Mongo_Collection subclass, set this only in the Mongo_Collection subclass.
   *
   * @var  boolean */
  protected $gridFS = FALSE;

  /** Definition of references existing in this document.
   * If 'model' is not specified it defaults to the reference name.
   * If 'field' is not specified it defaults to the reference name prefixed with an '_'.
   *
   * <pre>
   * Example Document:
   *  {_id: 1, user_id: 2, _token: 3}
   *
   * protected $_references = array(
   *  'user' => array('model' => 'user', 'field' => 'user_id'),
   *  'token' => NULL,
   * );
   * </pre>
   *
   * You can also specify getter and setter functions:
   * 'getter' - NULL will make the value write-only,
   *            string will call $this->{$getter}($name),
   *            callable will be called as $getter($this, $name)
   * 'setter' - NULL will make the value read-only,
   *            string will call $this->{$setter}($value),
   *            callable will be called as $setter($value, $this, $name)
   *
   * @var  array */
  protected $_references = array();

  /** Definition of predefined searches for use with __call. This instantiates a collection for the target model
   * and initializes the search with the specified field being equal to the _id of the current object.
   *
   * <pre>
   * $_searches
   *  {events: {model: 'event', field: '_user'}}
   * // db.event.find({_user: <_id>})
   * </pre>
   *
   * @var  array */
  protected $_searches = array();

  /** Field name aliases. '_id' is automatically aliased to 'id'.
   * E.g.: {created_at: ca}
   * @var  array */
  protected $_aliases = array();

  /** If set to TRUE, operator functions (set, inc, push etc.) will emulate database functions for eventual consistency.
   * For example this will print '2':
   * <code>
   * $doc = new Mongo_Document();
   * $doc->_emulate = TRUE;
   * $doc->number = 1;
   * $doc->inc('number');
   * echo $doc->number;
   * </code>
   *
   * If set to FALSE, the field will be marked as dirty, and the new value will only be available after reload.
   * This will print '1':
   * <code>
   * $doc = new Mongo_Document();
   * $doc->_emulate = FALSE;
   * $doc->number = 1;
   * $doc->inc('number');
   * echo $doc->number;
   * </code>
   *
   * @var boolean */
  protected $_emulate = FALSE;

  /** Designated place for non-persistent data storage (will not be saved to the database or after sleep)
   * @var  array */
  public $__data = array();

  /** Internal storage of object data
   * @var  array */
  protected $_object = array();

  /** Keep track of fields changed using __set or load_values
   * @var  array */
  protected $_changed = array();

  /** Set of operations to perform on update/insert
   * @var  array */
  protected $_operations = array();

  /** Keep track of data that is dirty (changed by an operation but not yet updated from database)
   * @var  array */
  protected $_dirty = array();

  /** Storage for referenced objects
   * @var  array */
  protected $_related_objects = array();

  /** Document loaded status:
   * <pre>
   *   NULL   not attempted
   *   FALSE  failed
   *   TRUE   succeeded
   * </pre>
   *
   * @var  boolean */
  protected $_loaded = NULL;

  /** A cache of Mongo_Collection instances for performance
   * @var  array */
  protected static $collections = array();

  private $_overload=array();
    private $_truLoad=false;
  /**
   * Instantiate a new Document object. If an id or other data is passed then it will be assumed that the
   * document exists in the database and updates will be performed without loading the document first.
   *
   * @param   mixed  $id _id of the document to operate on or criteria used to load
   * @return  Mongo_Document
   */
  public function __construct($id = NULL)
  {
    if(!empty($id))
    {
      if(is_array($id) || $id  instanceof Traversable)
      {
        foreach($id as $key => $value)
        {
          $this->_object[$this->get_field_name($key)] = $value;
        }
      }
      else
      {
        $this->_object['_id'] = $this->_cast('_id', $id);
      }
    }
  }

  /**
   * Override to cast values when they are set with untrusted data
   *
   * @param  mixed  $field  The field name being set
   * @param  mixed  $value  The value being set
   * @return mixed|\MongoId|string
   */
  protected function _cast($field, $value)
  {
    switch($field)
    {
      case '_id':
        // Cast _id strings to MongoIds if they convert back and forth without changing
        if ($value instanceof MongoId)
          return $value;
        if ((is_string($value) || ctype_xdigit($value) || (is_object($value) && method_exists($value, '__toString'))) && strlen($value) == 24)
        {
          $id = new MongoId($value);
          if( (string) $id == $value)
            return $id;
        }
    }
    return $value;
  }

  public function id($setId=NULL)
  {
      // @TODO validate unic id
      if ($setId) $this->_id=$setId;
      return $this->_id;
  }

  /**
   * This function translates an alias to a database field name.
   * Aliases are defined in $this->_aliases, and id is always aliased to _id.
   * You can override this to disable aliases or define your own aliasing technique.
   *
   * @param   string  $name  The aliased field name
   * @param   boolean $dot_allowed  Use FALSE if a dot is not allowed in the field name for better performance
   * @return  string  The field name used within the database
   */
  public function get_field_name($name, $dot_allowed = TRUE)
  {
    if($name == 'id' || $name == '_id') return '_id';

    if( ! $dot_allowed || ! strpos($name, '.'))
    {
      return (isset($this->_aliases[$name])
        ? $this->_aliases[$name]
        : $name
      );
    }

    $parts = explode('.', $name, 2);
    $parts[0] = $this->get_field_name($parts[0], FALSE);
    return implode('.', $parts);
  }

  /**
   * Returns the attributes that should be serialized.
   *
   * @return  array
   */
  public function __sleep()
  {
    return array('_references', '_aliases', '_object', '_changed', '_operations', '_loaded', '_dirty');
  }

  /**
   * Checks if a field is set
   *
   * @param   string   $name  Field name
   * @return  boolean  field is set
   */
  public function __isset($name)
  {
    $name = $this->get_field_name($name, FALSE);
    if (isset($this->_object[$name])) return TRUE;
    // check for dirties...
    if ($this->get($name)) return TRUE;
    return isset($this->_object[$name]);
  }

  /**
   * Unset a field
   *
   * @param   string  $name  Field name
   * @return  void
   */
  public function __unset($name)
  {
    $this->_unset($name);
  }

  /**
   * Clear the document data
   *
   * @return  Mongo_Document
   */
  public function clear()
  {
    $this->_object = $this->_changed = $this->_operations = $this->_dirty = $this->_related_objects = array();
    $this->_loaded = NULL;
    return $this;
  }

  /**
   * Return TRUE if field has been changed
   *
   * @param   string   $name  field name (no parameter returns TRUE if there are *any* changes)
   * @return  boolean  field has been changed
   */
  public function is_changed($name = NULL)
  {
    if($name === NULL)
    {
      return ($this->_changed || $this->_operations);
    }
    else
    {
      $name = $this->get_field_name($name);
      return isset($this->_changed[$name]) || isset($this->_dirty[$name]);
    }
  }

  /** Return TRUE if document is being created */
  public function is_new()
  {
    return !isset($this->_object['_id']) || isset($this->_changed['_id']);
  }

  /** Changes emulation mode. See $this->_emulate */
  public function set_emulation($emulate)
  {
    $this->_emulate = $emulate;
  }

  /** Returns emulation mode. See $this->_emulate */
  public function get_emulation()
  {
    return $this->_emulate;
  }

  /**
   * Return the Mongo_Database reference (proxy to the collection's db() method)
   *
   * @return  Mongo_Database
   */
  public function db()
  {
    return $this->collection()->db();
  }

  /**
   * Get a corresponding collection singleton
   *
   * @param  boolean  $fresh  Pass TRUE if you don't want to get the singleton instance
   * @return Mongo_Collection
   */
  public function collection($fresh = FALSE)
  {
    if($fresh === TRUE)
    {
      if($this->name)
      {
        if ($this->db === NULL)
        {
          $this->db = Mongo_Database::$default;
        }
        return new Mongo_Collection($this->name, $this->db, $this->gridFS, get_class($this));
      }
      else
      {
        $class_name = $this->get_collection_class_name();
        return new $class_name(NULL, NULL, NULL, get_class($this));
      }
    }

    if($this->name)
    {
      $name = "$this->db.$this->name.$this->gridFS";
      if( ! isset(self::$collections[$name]))
      {
        if ($this->db === NULL)
        {
          $this->db = Mongo_Database::$default;
        }
        self::$collections[$name] = new Mongo_Collection($this->name, $this->db, $this->gridFS, get_class($this));
      }
      return self::$collections[$name];
    }
    else
    {
      $name = $this->get_collection_class_name();
      if( ! isset(self::$collections[$name]))
      {
        self::$collections[$name] = new $name(NULL, NULL, NULL, get_class($this));
      }
      return self::$collections[$name];
    }
  }

  /**
   * Generates the collection name
   * @return  string
   */
  protected function get_collection_class_name()
  {
    return get_class($this).'_Collection';
  }

  /**
   * Current magic methods supported:
   *
   *  find_<search>()  -  Perform predefined search (using key from $_searches)
   *
   * @param  string $name
   * @param  array  $arguments
   * @throws Exception
   * @return Mongo_Collection|Mongo_Document
   */
  public function __call($name, $arguments)
  {
    // Workaround Reserved Keyword 'unset'
    // http://php.net/manual/en/reserved.keywords.php
    if($name == 'unset')
    {
        return $this->_unset($arguments[0]);
    }

    $parts = explode('_', $name, 2);
    if( ! isset($parts[1]))
    {
      throw new Exception('Method not found by '.get_class($this).': '.$name);
    }

    switch($parts[0])
    {
      case 'find':
        $search = $parts[1];
        if( ! isset($this->_searches[$search])){
          throw new Exception('Predefined search not found by '.get_class($this).': '.$search);
        }
        return Mongo_Document::factory($this->_searches[$search]['model'])
                ->collection(TRUE)
                ->find(array($this->_searches[$search]['field'] => $this->_id));
      break;

      default:
        throw new Exception('Method not found by '.get_class($this).': '.$name);
      break;
    }
  }

  /**
   * Gets one of the following:
   *
   *  - A referenced object
   *  - A search() result
   *  - A field's value
   *
   * @param   string  $name field name
   * @return  mixed
   * @throws  \Exception
   */
  public function __get($name)
  {
    //$name = $this->get_field_name($name, FALSE);
    if($name == 'id')  $name='_id';
   return isset($this->_object[$name]) ? $this->_object[$name] : NULL;
    // Auto-loading for special references
    if(array_key_exists($name, $this->_references))
    {
      if (isset($this->_references[$name]['getter']))
      {
        if ($this->_references[$name]['getter'] == null) throw new \Exception("'$name' is write only!");
        else if (is_string($this->_references[$name]['getter'])) return call_user_func(array($this, $this->_references[$name]['getter']), $name);
        else return call_user_func(array($this, $this->_references[$name]['getter']), $this, $name);
      }
      if( ! isset($this->_related_objects[$name]))
      {
        $model = isset($this->_references[$name]['model']) ? $this->_references[$name]['model'] : $name;
        $foreign_field = isset($this->_references[$name]['foreign_field']) ? $this->_references[$name]['foreign_field'] : FALSE;
        if ($foreign_field) {
          $this->_related_objects[$name] = Mongo_Document::factory($model)
            ->collection(TRUE)
            ->find($foreign_field, $this->id);
          return $this->_related_objects[$name];
        }
        $id_field = isset($this->_references[$name]['field']) ? $this->_references[$name]['field'] : "_$name";
        $value = $this->__get($id_field);

        if( ! empty($this->_references[$name]['multiple']))
        {
          $this->_related_objects[$name] = Mongo_Document::factory($model)
                  ->collection(TRUE)
                  ->find(array('_id' => array('$in' => (array) $value)));
        }
        else
        {
          // Extract just id if value is a DBRef
          if(is_array($value) && isset($value['$id']))
          {
            $value = $value['$id'];
          }
          $this->_related_objects[$name] = Mongo_Document::factory($model, $value);
        }
      }
      return $this->_related_objects[$name];
    }

    $this->load_if_needed($name);

    return isset($this->_object[$name]) ? $this->_object[$name] : NULL;
  }

  /**
   * Reload document only if there is need for it
   * @param string $name Name of the field to check for (no dot notation)
   * @return bool
   */
  protected function load_if_needed($name)
  {
    // Reload when retrieving dirty data
    if ($this->_loaded && empty($this->_operations) && !empty($this->_dirty[$name]))
    {
      return $this->load();
    }

    // Lazy loading!
    else if ($this->_loaded === NULL && isset($this->_object['_id']) && !isset($this->_changed['_id']) && $name != '_id')
    {
      return $this->load();
    }
    return FALSE;
  }
 public function is_Set($name)
    {
     return isset($this->_object[$name]) ?true:false;
    }
  /**
   * Magic method for setting the value of a field. In order to set the value of a nested field,
   * you must use the "set" method, not the magic method. Examples:
   *
   * <code>
   * // Works
   * $doc->set('address.city', 'Knoxville');
   *
   * // Does not work
   * $doc->address['city'] = 'Knoxville';
   * </code>
   *
   * @param string  $name  field name
   * @param mixed   $value
   * @throws Exception
   * @return  mixed
   */
  public function __set($name, $value)
  {
    $name = $this->get_field_name($name, FALSE);

    // Automatically save references to other Mongo_Document objects
    if(array_key_exists($name, $this->_references))
    {
      if (isset($this->_references[$name]['setter']))
      {
        if ($this->_references[$name]['setter'] == null) throw new \Exception("'$name' is read only!");
        else if (is_string($this->_references[$name]['setter'])) return call_user_func(array($this, $this->_references[$name]['setter']), $value, $name);
        else return call_user_func(array($this, $this->_references[$name]['setter']), $value, $this, $name);
      }
      if( ! $value instanceof Mongo_Document)
      {
        throw new Exception('Cannot set reference to object that is not a Mongo_Document');
      }
      $this->_related_objects[$name] = $value;
      if(isset($value->_id))
      {
        $id_field = isset($this->_references[$name]['field']) ? $this->_references[$name]['field'] : "_$name";
        $this->__set($id_field, $value->_id);
      }
      return;
    }

    // Do not save sets that result in no change
    $value = $this->_cast($name, $value);
    if ( isset($this->_object[$name]) && $this->_object[$name] === $value)
    {
      return;
    }
    if (!empty($this->_object[$name]))
    {

      $is='isCanChange'.ucwords($name);
      if (method_exists($this,$is))
      {
          if (!$this->$is) return true;
      }
    }
    if ($name=='_id')
    {
        //$this->id()
    }

    $this->_object[$name] = $value;
    $this->_changed[$name] = TRUE;
  }

  /**
   * @param $name
   * @return Mongo_Document
   */
  protected function _set_dirty($name)
  {
    if($pos = strpos($name, '.'))
    {
      $name = substr($name, 0, $pos);
    }
    $this->_dirty[$name] = TRUE;
    return $this;
  }

  /** Get the value for a key (using dot notation)  */
  public function get($name, $default = null)
  {
    $name = $this->get_field_name($name);
    $dotPos = strpos($name, '.');
    if (!$dotPos && $default === null)
    {
      return $this->__get($name);
    }
    $this->load_if_needed($dotPos ? substr($name, 0, $dotPos) : $name);
    $ref = $this->get_field_reference($name, FALSE, $default);
    return $ref;
  }

  /** Get the raw value for a key (using dot notation), without lazy loading, aliasing and references  */
  public function get_raw($name, $default = null)
  {
    $ref = $this->get_field_reference($name, FALSE, $default);
    return $ref;
  }

  /**
   * Set the value for a key. This function must be used when updating nested documents.
   *
   * @param   string  $name The key of the data to update (use dot notation for embedded objects)
   * @param   mixed   $value The data to be saved
   * @param   boolean $emulate TRUE will emulate the database function for eventual consistency, FALSE will not change the object until save & reload. @see $_emulate
   * @return  Mongo_Document
   */
  public function set($name, $value, $emulate = null)
  {
    if (!strpos($name, '.'))
    {
      $this->__set($name, $value);
      return $this;
    }
    $name = $this->get_field_name($name);
    $this->_operations['$set'][$name] = $value;
    if ($emulate === FALSE || ($emulate === null && $this->_emulate === FALSE))
    {
      return $this->_set_dirty($name);
    }
    else
    {
      $ref = & $this->get_field_reference($name, TRUE);
      $ref = $value;
      return $this;
    }
  }

  /**
   * Unset a key
   *
   * Note: unset() method call for _unset() is defined in __call() method since 'unset' method name
   *       is reserved in PHP. ( Requires PHP > 5.2.3. - http://php.net/manual/en/reserved.keywords.php )
   *
   * @param   string  $name The key of the data to update (use dot notation for embedded objects)
   * @param   boolean $emulate TRUE will emulate the database function for eventual consistency, FALSE will not change the object until save & reload.
   * @see $_emulate
   * @return Mongo_Document
   */
  public function _unset($name, $emulate = null)
  {
    $name = $this->get_field_name($name);
    $this->_operations['$unset'][$name] = 1;
    if ($emulate === FALSE || ($emulate === null && $this->_emulate === FALSE))
    {
      return $this->_set_dirty($name);
    }
    else
    {
      self::unset_named_reference($this->_object, $name);
      return $this;
    }
  }

  /**
   * Increment a value atomically
   *
   * @param   string  $name The key of the data to update (use dot notation for embedded objects)
   * @param   mixed   $value The amount to increment by (default is 1)
   * @param   boolean $emulate TRUE will emulate the database function for eventual consistency, FALSE will not change the object until save & reload. @see $_emulate
   * @return  Mongo_Document
   */
  public function inc($name, $value = 1, $emulate = null)
  {
    $name = $this->get_field_name($name);
    if(isset($this->_operations['$inc'][$name]))
    {
      $this->_operations['$inc'][$name] += $value;
    }
    else
    {
      $this->_operations['$inc'][$name] = $value;
    }
    if ($emulate === FALSE || ($emulate === null && $this->_emulate === FALSE))
    {
      return $this->_set_dirty($name);
    }
    else
    {
      $ref = & $this->get_field_reference($name, TRUE, 0);
      $ref += $value;
      return $this;
    }
  }

  /**
   * Push a vlaue to an array atomically. Can be called multiple times.
   *
   * @param   string  $name The key of the data to update (use dot notation for embedded objects)
   * @param   mixed   $value The value to push
   * @param   boolean $emulate TRUE will emulate the database function for eventual consistency, FALSE will not change the object until save & reload. @see $_emulate
   * @return  Mongo_Document
   */
  public function push($name, $value, $emulate = null)
  {
    $name = $this->get_field_name($name);
    if(isset($this->_operations['$pushAll'][$name]))
    {
      $this->_operations['$pushAll'][$name][] = $value;
    }
    else if(isset($this->_operations['$push'][$name]))
    {
      $this->_operations['$pushAll'][$name] = array($this->_operations['$push'][$name],$value);
      unset($this->_operations['$push'][$name]);
      if( ! count($this->_operations['$push']))
        unset($this->_operations['$push']);
    }
    else
    {
      $this->_operations['$push'][$name] = $value;
    }
    if ($emulate === FALSE || ($emulate === null && $this->_emulate === FALSE))
    {
      return $this->_set_dirty($name);
    }
    else
    {
      $ref = & $this->get_field_reference($name, TRUE, array());
      if (!is_array($ref)) throw new MongoException("Value '$name' cannot be used as an array");
      array_push($ref, $value);
      return $this;
    }
  }

  /**
   * Push an array of values to an array in the document
   *
   * @param   string  $name The key of the data to update (use dot notation for embedded objects)
   * @param   array   $value An array of values to push
   * @param   boolean $emulate TRUE will emulate the database function for eventual consistency, FALSE will not change the object until save & reload. @see $_emulate
   * @return  Mongo_Document
   */
  public function pushAll($name, $value, $emulate = null)
  {
    $name = $this->get_field_name($name);
    if(isset($this->_operations['$pushAll'][$name]))
    {
      $this->_operations['$pushAll'][$name] += $value;
    }
    else
    {
      $this->_operations['$pushAll'][$name] = $value;
    }
    if ($emulate === FALSE || ($emulate === null && $this->_emulate === FALSE))
    {
      return $this->_set_dirty($name);
    }
    else
    {
      $ref = & $this->get_field_reference($name, TRUE, array());
      if (!is_array($ref)) throw new MongoException("Value '$name' cannot be used as an array");
      foreach ($value as $v) array_push($ref, $v);
      return $this;
    }
  }

  /**
   * Pop a value from the end of an array
   *
   * @param   string  $name The key of the data to update (use dot notation for embedded objects)
   * @param   boolean $last Pass TRUE to pop last element
   * @param   boolean $emulate TRUE will emulate the database function for eventual consistency, FALSE will not change the object until save & reload. @see $_emulate
   * @return  Mongo_Document
   */
  public function pop($name, $last = TRUE, $emulate = null)
  {
    $name = $this->get_field_name($name);
    $this->_operations['$pop'][$name] = $last ? 1 : -1;
    if ($emulate === FALSE || ($emulate === null && $this->_emulate === FALSE))
    {
      return $this->_set_dirty($name);
    }
    else
    {
      $ref = & $this->get_field_reference($name, TRUE, null);
      if ($ref === null) return $this;
      if (!is_array($ref)) throw new MongoException("Value '$name' cannot be used as an array");
      if ($last) array_pop($ref);
      else array_shift($ref);
      return $this;
    }
  }

  /**
   * Pop a value from the beginning of an array
   *
   * @param   string  $name The key of the data to update (use dot notation for embedded objects)
   * @param   boolean $emulate TRUE will emulate the database function for eventual consistency, FALSE will not change the object until save & reload. @see $_emulate
   * @return  Mongo_Document
   */
  public function shift($name, $emulate = null)
  {
    return $this->pop($name, FALSE, $emulate);
  }

  /**
   * Pull (delete) a value from an array
   *
   * @param   string  $name The key of the data to update (use dot notation for embedded objects)
   * @param   mixed   $value
   * @param   boolean $emulate TRUE will emulate the database function for eventual consistency, FALSE will not change the object until save & reload. @see $_emulate
   * @return  Mongo_Document
   */
  public function pull($name, $value, $emulate = null)
  {
    $name = $this->get_field_name($name);
    if(isset($this->_operations['$pullAll'][$name]))
    {
      $this->_operations['$pullAll'][$name][] = $value;
    }
    else if(isset($this->_operations['$pull'][$name]))
    {
      $this->_operations['$pullAll'][$name] = array($this->_operations['$pull'][$name],$value);
      unset($this->_operations['$pull'][$name]);
      if( ! count($this->_operations['$pull']))
        unset($this->_operations['$pull']);
    }
    else
    {
      $this->_operations['$pull'][$name] = $value;
    }
    if ($emulate === FALSE || ($emulate === null && $this->_emulate === FALSE))
    {
      return $this->_set_dirty($name);
    }
    else
    {
      $ref = & $this->get_field_reference($name, TRUE, null);
      if ($ref === null) return $this;
      if (!is_array($ref)) throw new Exception("Value '$name' cannot be used as an array");
      $ref = array_filter($ref, function($v) use ($value) {
                return $v !== $value;
              });
      return $this;
    }
  }

  /**
   * Pull (delete) all of the given values from an array
   *
   * @param   string  $name The key of the data to update (use dot notation for embedded objects)
   * @param   array   $value An array of value to pull from the array
   * @param   boolean $emulate TRUE will emulate the database function for eventual consistency, FALSE will not change the object until save & reload. @see $_emulate
   * @return  Mongo_Document
   */
  public function pullAll($name, array $value, $emulate = null)
  {
    $name = $this->get_field_name($name);
    if(isset($this->_operations['$pullAll'][$name]))
    {
      $this->_operations['$pullAll'][$name] += $value;
    }
    else
    {
      $this->_operations['$pullAll'][$name] = $value;
    }
    if ($emulate === FALSE || ($emulate === null && $this->_emulate === FALSE))
    {
      return $this->_set_dirty($name);
    }
    else
    {
      $ref = & $this->get_field_reference($name, TRUE, null);
      if ($ref === null) return $this;
      if (!is_array($ref)) throw new Exception("Value '$name' cannot be used as an array");
      $ref = array_filter($ref, function($v) use ($value) {
        return !in_array($v, $value, TRUE);
      });
      return $this;
    }
  }

  /**
   * Bit operators
   *
   * @param   string  $name The key of the data to update (use dot notation for embedded objects)
   * @param   array   $value
   * @todo some emulation love
   * @return  Mongo_Document
   */
  public function bit($name,$value)
  {
    $name = $this->get_field_name($name);
    $this->_operations['$bit'][$name] = $value;
    return $this->_set_dirty($name);
  }

  /**
   * Adds value to the array only if its not in the array already.
   *
   * @param   string  $name The key of the data to update (use dot notation for embedded objects)
   * @param   mixed   $value  The value to add to the set
   * @param   boolean $emulate TRUE will emulate the database function for eventual consistency, FALSE will not change the object until save & reload. @see $_emulate
   * @return  Mongo_Document
   */
  public function addToSet($name, $value, $emulate = null)
  {
    $name = $this->get_field_name($name);
    if(isset($this->_operations['$addToSet'][$name]))
    {
      if( ! isset($this->_operations['$addToSet'][$name]['$each']))
      {
        $this->_operations['$addToSet'][$name] = array('$each' => array($this->_operations['$addToSet'][$name]));
      }
      if(isset($value['$each']))
      {
        foreach($value['$each'] as $val)
        {
          $this->_operations['$addToSet'][$name]['$each'][] = $val;
        }
      }
      else
      {
        $this->_operations['$addToSet'][$name]['$each'][] = $value;
      }
    }
    else
    {
      $this->_operations['$addToSet'][$name] = $value;
    }
    if ($emulate === FALSE || ($emulate === null && $this->_emulate === FALSE))
    {
      return $this->_set_dirty($name);
    }
    else
    {
      $ref = & $this->get_field_reference($name, TRUE);
      if ($ref === null)
      {
        $ref = array($value);
      }
      else
      {
        if (!is_array($ref)) throw new Exception("Value '$name' cannot be set as an array"); // $ref = array($ref);
        if (!in_array($value, $ref, TRUE))
        {
          array_push($ref, $value);
        }
      }
      return $this;
    }
  }

  /**
   * Load all of the values in an associative array. Ignores all fields
   * not in the model.
   *
   * @param   array    $values  field => value pairs
   * @param   boolean  $clean   values are clean (from database)?
   * @return  Mongo_Document
   */
  public function load_values(array $values, $clean = FALSE)
  {
    if($clean === TRUE)
    {
      $this->before_load();

      $this->_object = $values;
      $this->_loaded = ! empty($this->_object);


      $this->after_load();
    }
    else
    {

      foreach ($values as $field => $value)
      {
//        if ($field=='_id') $this->_id=$value;
        $this->__set($field, $value);
      }
    }

    return $this;
  }

  public function overload($add=false)
      {
        if (is_array($add)) $this->_overload=array_merge($this->_overload,$add);
        if ($add===false)
            {
            $dat=array();
                foreach ($this->_overload as $key)
                {
                    $name='get'.ucwords($key);
                    if (method_exists($this, $name)) $dat[$key]=$this->$name();
                }
            return $dat;
            }
        return array();
      }

  /**
   * Get the model data as an associative array.
   *
   * @param   boolean  retrieve values directly from _object
   * @return  array  field => value
   */
  public function as_array( $clean = FALSE )
  {
    if($clean === TRUE)
    {
      $array = $this->_object;
    }
    else
    {
      $array = array();
      foreach($this->_object as $name => $value)
      {
        $array[$name] = isset($this->_object[$name]) ? $this->_object[$name] : NULL;
      }
      foreach($this->_aliases as $alias => $name)
      {
        if(isset($array[$name]))
        {
          $array[$alias] = $array[$name];
          unset($array[$name]);
        }
      }
    }
    if ($clean==ARRAY_FLAT) 
        {
            if (!empty($array['_id']))
            if (is_object($array['_id'])) $array['_id']=strval($array['_id']);
        }
    return $array;
  }

  /**
   * Return TRUE if the document is loaded.
   *
   * @return  boolean
   */
  public function loaded()
  {
    if($this->_loaded === NULL)
    {
      $this->load();
    }
    return $this->_loaded;
  }

  /**
   * Load the document from the database. The first parameter may be one of:
   *
   *  a FALSE value - the object data will be used to construct the query
   *  a JSON string - will be parsed and used for the query
   *  an non-array value - the query will be assumed to be for an _id of this value
   *  an array - the array will be used for the query
   *
   * @param   string|array  $criteria  specify additional criteria
   * @param   array         $fields    specify the fields to return
   * @throws  MongoException
   * @return  boolean  TRUE if the load succeeded
   */
  public function load($criteria = array(), array $fields = array())
  {
    $keepId = null;
    // Use of json for querying is allowed
    if(is_string($criteria) && $criteria[0] == "{")
    {
      $criteria = JSON::arr($criteria);
    }

    else if($criteria && ! is_array($criteria))
    {
      $keepId = $criteria; // in case if we won't load it, we should set this object to this id
      $criteria = array('_id' => $criteria);
    }

    else if(isset($this->_object['_id']))
    {
      $keepId = $this->_object['_id']; // in case if we won't load it, we should set this object to this id
      $criteria = array('_id' => $this->_object['_id']);
    }

    else if(isset($criteria['id']))
    {
      $keepId = $criteria['id']; // in case if we won't load it, we should set this object to this id
      $criteria = array('_id' => $criteria['id']);
    }

    else if( ! $criteria)
    {
      $criteria = $this->_object;
    }

    if( ! $criteria)
    {
       throw new MongoException('Cannot find '.get_class($this).' without _id or other search criteria.');
    }

    // Cast query values to the appropriate types and translate aliases
    $new = array();
    foreach($criteria as $key => $value)
    {
      $key = $this->get_field_name($key);
      $new[$key] = $this->_cast($key, $value);
    }
    $criteria = $new;

    // Translate field aliases
    $fields = array_map(array($this,'get_field_name'), $fields);

    $values = $this->collection()->__call('findOne', array($criteria, $fields));

    // Only clear the object if necessary
    if($this->_loaded !== NULL || $this->_changed || $this->_operations)
    {
      $this->clear();
    }
    $this->load_values($values ? $values : array(), TRUE);

    if ($values) $this->_truLoad=TRUE;

    if (!$this->_loaded && $keepId) $this->id = $keepId; // restore the id previously set on this object...

    return $this->_loaded;
  }
  public function dump()
      {
        var_dump($this->as_array(),'DATA');
//        p($this->_changed,'_changed');
//        p($this->_id,'_id');
      }
  public function isLoad()
      {
      return $this->_loaded;
      }
  public function reload($force=false)
      {
        if ($force) {
            $this->load();
            return $this;
        }
        if (!$this->_truLoad || !$this->isLoad())
        {
            $this->load();
        }
          return $this;
      }
  /**
   * Save the document to the database. For newly created documents the _id will be retrieved.
   *
   * @param   array|bool  $options  Insert options
   * @throws  MongoException
   * @return  Mongo_Document
   */
  public function save($options = TRUE)
  {
    // Update references to referenced models
    $this->_update_references();

    // Convert old bool argument to options array
    if (is_bool($options)) {
      $options = array('w' => 1);
    }
    if (isset($options['safe'])) {
      $options['w'] = (int) $options['safe']; $options['j'] = (bool) $options['safe'];
      unset($options['safe']);
    }
    if ( ! isset($options['w'])) {
      $options['w'] = $this->db()->db()->w == 0 ? 1 : $this->db()->db()->w;
    }

    // Insert new record if no _id or _id was set by user
    if( ! isset($this->_object['_id']) || isset($this->_changed['_id']))
    {
      $action = self::SAVE_INSERT;

      $this->before_save($action);

      $values = array();
      foreach($this->_changed as $name => $_true)
      {
        $values[$name] = $this->_object[$name];
      }

      if(empty($values))
      {
        throw new MongoException('Cannot insert empty array.');
      }

      if ($this->autoSequenceBase32 && empty($values[$this->autoSequenceBase32]))
      {
        $start=12020;
        $increment=1;
        $c=array(
            'findandmodify' => '_mondon_behavior_sequence',
            'query'  => array('_id' => $this->name.'_'.$this->autoSequenceBase32),
            'update' => array('$inc' => array('sequence' => $increment)),
            'fields' => array('sequence' => 1),
            'new'    => true,
            'upsert'=>true
        );

        $result= $this->db()->command($c);
        if ($result['ok'])
        {
            $i=$start+$result['value']['sequence'];
            $values[$this->autoSequenceBase32]=base_convert($i, 10, 32);
        }
        else
        {
            throw new Exception('Cant autoSequenceBase32 in '.$this->name);
        }
      }// autoSequenceBase32




      $err = $this->collection()->insert($values, $options);

      if($err['err'] && (! empty($options['w']) || ! empty($options['j'])))
      {
        throw new MongoException('Unable to insert '.get_class($this).': '.$err['err']);
      }

      if ( ! isset($this->_object['_id']))
      {
        // Store (assigned) MongoID in object
        $this->_object['_id'] = $values['_id'];
        $this->_loaded = TRUE;
      }

      // Save any additional operations
      /** @todo  Combine operations into the insert when possible to avoid this update */
      if($this->_operations)
      {
        if( ! $this->collection()->update(array('_id' => $this->_object['_id']), $this->_operations))
        {
          $err = $this->db()->lastError();
          throw new MongoException('Update of '.get_class($this).' failed: '.$err['err']);
        }
      }
    }

    // Update assumed existing document
    else
    {
      $action = self::SAVE_UPDATE;

      $this->before_save($action);

      if($this->_changed)
      {
        foreach($this->_changed as $name => $_true)
        {
          $this->_operations['$set'][$name] = $this->_object[$name];
        }
      }

      if($this->_operations)
      {
        if( ! $this->collection()->update(array('_id' => $this->_object['_id']), $this->_operations))
        {
          $err = $this->db()->lastError();
          throw new MongoException('Update of '.get_class($this).' failed: '.$err['err']);
        }
      }
    }

    $this->_changed = $this->_operations = array();

    $this->after_save($action);
    $this->_loaded=true;
    return $this;
  }

  /**
   * Updates references but does not save models to avoid infinite loops
   */
  protected function _update_references()
  {
    foreach($this->_references as $name => $ref)
    {
      if(isset($this->_related_objects[$name]) && $this->_related_objects[$name] instanceof Mongo_Document)
      {
        $model = $this->_related_objects[$name];
        $id_field = isset($ref['field']) ? $ref['field'] : "_$name";
        if( ! $this->__isset($id_field) || $this->__get($id_field) != $model->_id)
        {
          $this->__set($id_field, $model->_id);
        }
      }
    }
  }
  public function getSize()
  {
      return sizeof($this->_object);
  }
  public function setArray($array,$convertFunction='',$skipKeys=false)
  {
      foreach ($array as $key=>$val)
          {
            if ($skipKeys) if (in_array($key,$skipKeys)) continue;
            if ($convertFunction && is_string($convertFunction)) $val=$convertFunction($val);

            $this->__set($key,$val);
          }
  }
  /**
   * Override this method to take certain actions before the data is saved
   *
   * @param   string  $action  The type of save action, one of Mongo_Document::SAVE_*
   */
  protected function before_save($action){}

  /**
   * Override this method to take actions after data is saved
   *
   * @param   string  $action  The type of save action, one of Mongo_Document::SAVE_*
   */
  protected function after_save($action){}

  /**
   * Override this method to take actions before the values are loaded
   */
  protected function before_load(){}

  /**
   * Override this method to take actions after the values are loaded
   */
  protected function after_load(){}

  /**
   * Override this method to take actions before the document is deleted
   */
  protected function before_delete(){}

  /**
   * Override this method to take actions after the document is deleted
   */
  protected function after_delete(){}

  /**
   * Upsert the document, does not retrieve the _id of the upserted document.
   *
   * @param   array $operations
   * @throws  MongoException
   * @return  Mongo_Document
   */
  public function upsert($operations = array())
  {
    if( ! $this->_object)
    {
      throw new MongoException('Cannot upsert '.get_class($this).': no criteria');
    }

    $this->before_save(self::SAVE_UPSERT);

    $operations = self::array_merge_recursive_distinct($this->_operations, $operations);

    if( ! $this->collection()->update($this->_object, $operations, array('upsert' => TRUE)))
    {
      $err = $this->db()->lastError();
      throw new MongoException('Upsert of '.get_class($this).' failed: '.$err['err']);
    }

    $this->_changed = $this->_operations = array();

    $this->after_save(self::SAVE_UPSERT);

    return $this;
  }
  public function get_changed()
  {
      return $this->_changed;
  }

  /**
   * Delete the current document using the current data. The document does not have to be loaded.
   * Use $doc->collection()->remove($criteria) to delete multiple documents.
   *
   * @throws  MongoException
   * @return  Mongo_Document
   */
  public function delete()
  {
    if( ! isset($this->_object['_id']))
    {
      throw new MongoException('Cannot delete '.get_class($this).' without the _id.');
    }
    $this->before_delete();
    $criteria = array('_id' => $this->_object['_id']);

    if( ! $this->collection()->remove($criteria, array('justOne' => TRUE)))
    {
      throw new MongoException('Failed to delete '.get_class($this));
    }

    $this->clear();
    $this->after_delete();

    return $this;
  }

  /**
   * array_merge_recursive_distinct does not change the datatypes of the values in the arrays.
   * @param array $array1
   * @param array $array2
   * @return array
   * @author Daniel <daniel (at) danielsmedegaardbuus (dot) dk>
   * @author Gabriel Sobrinho <gabriel (dot) sobrinho (at) gmail (dot) com>
   */
  protected static function array_merge_recursive_distinct ( array &$array1, array &$array2 )
  {
    $merged = $array1;

    foreach ( $array2 as $key => &$value )
    {
      if ( is_array ( $value ) && isset ( $merged [$key] ) && is_array ( $merged [$key] ) )
      {
        $merged [$key] = self::array_merge_recursive_distinct ( $merged [$key], $value );
      }
      else
      {
        $merged [$key] = $value;
      }
    }

    return $merged;
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
    $this->set($name, $value, TRUE);
  }

  public function offsetUnset($name)
  {
    $this->_unset($name, TRUE);
  }

  /** Returns direct reference to a field, using dot notation.
   * @param string $name Dot notation name
   * @param bool $create TRUE to create a field if it's missing
   * @param mixed $default Use default value to create missing fields, or return it if $create == FALSE
   * @return mixed
   *  */
  public function &get_field_reference($name, $create = FALSE, $default = null)
  {
    return self::get_named_reference($this->_object, $name, $create, $default);
  }

  /** Returns direct reference to a field, using dot notation.
   * @param array $arr Array with data
   * @param string $name Dot notation name
   * @param bool $create TRUE to create a field if it's missing
   * @param mixed $default Use default value to create missing fields, or return it if $create == FALSE
   * @return mixed
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

public function setIfChange($key,$value)
{
    if ($this->$key!=$value)
    {
        $this->$key=$value;
        return true;
    }
    return false;
}
public function isUnique($key,$field='_id')
{
    $d=$this->collection(true)->findOne($key,array('_id'));
    if ($d)
    {
        return false;
    }
    return true;
}


}

