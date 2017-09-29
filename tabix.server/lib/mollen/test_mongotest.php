<?php

/* Row Data Gateway Pattern */
class Model_Document_Collection extends Mongo_Collection {
  protected $name = 'mongotest';
  protected $db = 'mongotest';
}

class Model_Document extends Mongo_Document {
  protected $_references = array(
    'other' => array('model' => 'other'),
    'lots'  => array('model' => 'other', 'field' => '_lots', 'multiple' => TRUE)
  );
}

/* Table Data Gateway Pattern */
class Model_Other extends Mongo_Document {
  protected $name = 'mongotest';
  protected $db = 'mongotest';

  protected $_searches = array(
    'docs' => array('model' => 'document', 'field' => '_other'),
  );
}

/* Test Controller */
class Controller_Mongotest extends Controller {

  protected $db;

  public function before()
  {
    echo "<h1>STARTING MONGO TESTS</h1><style>span.highlight { background-color:#ffffdf }</style>";
    $this->setup();
  }

  public function after()
  {
    echo "<h1>TESTS COMPLETE</h1>";
    echo '<div id="kohana-profiler">'.View::factory('profiler/stats').'</div>';
    $this->teardown();
  }

  public function assert($desc, $condition)
  {
    if($condition)
      echo $desc.' <span class="pass">OK</span><br/>';
    else
    {
      echo $desc.' <span class="fail">FAIL</span><br/>';
      $this->teardown();
      $bt = debug_backtrace();
      $bt = array_shift($bt);
      echo "<hr/><b>{$bt['file']}: ({$bt['line']})</b><br/>";
      echo Kohana::debug_source($bt['file'], $bt['line']);
      $this->after(TRUE);
      exit;
    }
  }

  public function test($str)
  {
    echo "<hr/><b>$str</b><br/>";
  }

  public function out()
  {
    $args = func_get_args(); $str = array_shift($args);
    echo "<pre>$str</pre>";
    foreach($args as $arg) echo Kohana::debug($arg);
  }

  public function setup()
  {
    $this->db = Mongo_Database::instance('mongotest', array(
      'database' => 'mongotest',
      'profiling' => TRUE
    ));

    $this->db->createCollection('mongotest');
    $this->db->mongotest->remove(array());
  }

  public function teardown()
  {
  }


  public function action_document()
  {
    $this->out('Driver Version: '.Mongo::VERSION);

    $this->test('INSERT Document WITHOUT _id');
    $data = array(
      'name' => 'mongo',
      'counter' => 10,
      'set' => array('foo','bar','baz'),
      'simplenested' => array(
        'foo' => 'bar',
      ),
      'doublenested' => array(
        'foo' => array('bar' => 'baz'),
      ),
    );
    $this->out('BEFORE',$data);
    $doc = new Model_Document();
    $doc->load_values($data);
    $doc->save();
    $this->assert('document loaded after save', $doc->loaded() === TRUE);
    $this->out('AFTER',$doc->as_array());
    $this->assert('_id exists', $doc->id);

    $this->test('RETRIEVE DOCUMENT BY _id');
    $id = $doc->id;
    $doc = new Model_Document($id);
    $doc->load();
    $this->assert('document found', $doc->loaded() && $doc->name == 'mongo');

    $this->test('UPDATE Document');
    $doc->size = 'huge';
    $doc->save()->load();
    $this->assert('update saved', $doc->size == 'huge');

    $this->test('INCREMENT COUNTER');
    $old = $doc->counter;
    $doc->inc('counter')->save()->load();
    $this->assert('counter incremented', $old + 1 === $doc->counter);

    $this->test('UPSERT NON-EXISTING DOCUMENT');
    $doc = new Model_Document();
    $doc->name = 'Bugs Bunny';
    $doc->push('friends','Daffy Duck');
    $doc->upsert();
    $doc->load();
    $this->assert('document inserted on upsert', !empty($doc->id));

    $this->test('UPSERT EXISTING DOCUMENT');
    $doc = new Model_Document();
    $doc->name = 'Bugs Bunny';
    $doc->push('friends','Elmer Fudd');
    $doc->upsert();
    $doc->load();
    $this->assert('document updated on upsert', $doc->friends === array('Daffy Duck','Elmer Fudd'));

    $this->test('DELETE Document');
    $doc->delete();
    $doc->load(array('name' => 'Bugs Bunny'));
    $this->assert('document deleted', empty($doc->id));

    $this->test('INSERT Document WITH _id');
    $data = array('name' => 'mongo', 'counter' => 10, 'set' => array('foo','bar','baz'));
    $doc = new Model_Document();
    $doc->id = 'test_doc';
    $doc->load_values($data)->save();
    $doc = new Model_Document('test_doc');
    $doc->load();
    $this->assert('document found', $doc->loaded());
  }


  public function action_collection()
  {
    $col = Mongo_Document::factory('document')->collection();

    $this->test('INSERT MULTIPLE');
    $batch = array();
    for($i = 0; $i < 20; $i++){
      $batch[] = array('name' => base64_encode(rand(0xFFF,0xFFFF)), 'number' => $i);
    }
    $col->batchInsert($batch);
    $this->assert('all records inserted', $col->count(array()) == 20);

    $this->test('ITERATE WITH FILTER LIMIT AND SORT');
    $col->reset()->find('{number: { $gt: 10 }}')->limit(6)->sort_asc('name');
    $this->assert('collection limit', count($col->as_array()) <= 6);
    $last = '';
    foreach($col as $doc){
      $this->assert("$doc->name: $doc->number ($doc->id)", $doc->number > 10 && $last < $doc->name);
      $last = $doc->name;
    }

    $col->count();
    $col->count(array('number' => array('$gt' => 10)));
  }

  public function action_reference()
  {
    $this->test('CREATE DOCUMENT WITH REFERENCED DOCUMENT');
    $doc = new Model_Document();
    $doc->id = 'foo';
    $doc->other = Mongo_Document::factory('other');
    $doc->other->bar = 'baz';
    $doc->other->save();
    $doc->save();
    $this->assert('referenced document reference exists', $doc->_other);
    $doc = new Model_Document('foo');
    $this->assert('nested document saved',$doc->other->bar == 'baz');

    $this->test('SEARCH DOCUMENTS BY PREDEFINED SEARCH');
    $docs = $doc->other->find_docs();
    $this->assert('1 docs found', $docs->count() == 1);
    $doc0 = $docs->getNext();
    $this->assert('doc id is expected', $doc0->id == 'foo');

    $this->test('LOAD MULTIPLE REFERENCED DOCUMENTS FROM ARRAY OF _ids');
    for($i = 0; $i < 3; $i++){
      $newdoc = Mongo_Document::factory('other')->load_values(array('id' => 'more'.$i, 'foo' => 'bar'.$i))->save();
      $doc->push('_lots',$newdoc->id);
    }
    $doc->save();
    $lots = $doc->lots;
    $this->assert('found 3 referenced docs', $lots->count() == 3);
  }

}
