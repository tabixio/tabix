<?php
namespace Tabix;

use ClickHouseDB\Exception;

class Mongo
{
    /**
     * @var ConfigProvider
     */
    private $_config;
    /**
     * @var User
     */
    private $_user;

    /**
     * @var \MongoDB\Client
     */
    private $__connect;

    /**
     * @var \MongoDB\Database
     */
    private $__db;
    public function __construct(ConfigProvider $configProvider,User $user)
    {
        $this->_config=$configProvider;
        $this->_user=$user;
    }

    /**
     * @return \MongoDB\Client
     */
    public function connect()
    {

        if (!$this->__connect)
        {
            $this->__connect=new \MongoDB\Client( $this->_config->getMongoDB('client'));
            $this->__db=$this->__connect->selectDatabase($this->_config->getMongoDB('database'));
        }
        return $this->__connect;

    }
    public function initCreateMongoDataBase()
    {
//        \Tabix\Initialization::createMongo($this->__connect,$this->_config);
    }


    /**
     * @return \MongoDB\Database
     */
    public function db()
    {
        if (!$this->__db) $this->connect();
        return $this->__db;
    }
    /**
     * @return \MongoDB\Client
     */
    public function client()
    {
        return $this->connect();
    }
    public function collection_dashboards()
    {
        return $this->db()->dashboards;
    }
    public function collection_query()
    {
        return $this->db()->query;
    }
    private function makeNewObject()
    {
        $insert=[];
        $insert['uid']=$this->_user->userId();
        $insert['dt']=time();
        $insert['dtm']=microtime(true);
        return $insert;
    }
    public function query(\Tabix\Query\Result $q)
    {
        $insert=$q->toArray();
        // @todo  sizeOf insert[data]

        $insert=array_merge_recursive($insert,$this->makeNewObject());

        $insert['sign']=$q->getSign();

        $x=$this->collection_query()->insertOne($insert);
        $q->setQuid($x->getInsertedId());
        return $q;
    }
    public function fetch($quid,$sing)
    {
        //$quid,$sing
        return iterator_to_array($this->collection_query()->findOne(['_id'=>new \MongoDB\BSON\ObjectId($quid),'sign'=>$sing]));


    }
    public function listDashboards()
    {

    }
    public function historySearch($param,$value)
    {

    }
    public function history()
    {

    }
    public function dropHistory()
    {

    }

    private function load_dash($id)
    {
        $a=$this->collection_dashboards()->findOne(['_id'=>new \MongoDB\BSON\ObjectId($id)]);
        if (!$a) throw new \Exception("Not find dashboard : ".$id);
        $a=iterator_to_array($a);
        $a['did']=strval($a['_id']);
        unset($a['_id']);
        return $a;
    }

    public function dashboards(\dotArray $params)
    {
        $out=[];


        $result = $this->collection_dashboards()->find( );
        foreach ($result as $entry) {
            $entry['id']=strval($entry['_id']);
            unset($entry['_id']);
            $out[$entry['id']]=$entry;
        }
        return $out;
    }
    public function dashboard($id)
    {
        $dash=$this->load_dash($id);
        return ['did'=>$id,'dash'=>$dash];
    }
    public function dashboardUpdate($id,$params)
    {
        $dash=$this->load_dash($id);
        $dash=array_replace_recursive($dash,$params);
        $dash['dtu']=time();
        unset($dash['did']);
        $this->collection_dashboards()->updateOne(['_id'=>new \MongoDB\BSON\ObjectId($id)],['$set' =>$dash]);
        return ['did'=>$id,'dash'=>$dash];
    }
    public function dashboardNew($params)
    {
        $insert=array_replace_recursive($params,$this->makeNewObject());
        $x=$this->collection_dashboards()->insertOne($insert);
        return ['did'=>strval($x->getInsertedId())];
    }
    public function cleanDevDatabase($value=false)
    {
        if (!$value)
        {
            $this->collection_dashboards()->drop();
            $this->collection_query()->drop();
        } elseif ($value=='query')
        {
            $this->collection_query()->drop();
        } elseif ($value=='dashboard')
        {
            $this->collection_dashboards()->drop();
        }
        return ['ok'=>true];
    }
    public function test()
    {
        return sizeof($this->connect()->listDatabases());

//        $collection = $client->demo->beers;
//        $result = $collection->insertOne( [ 'name' => 'Hinterland', 'brewery' => 'BrewDog' ] );
//        echo "Идентификатор вставленного документа '{$result->getInsertedId()}'";
//        $result = $collection->find( [ 'name' => 'Hinterland', 'brewery' => 'BrewDog' ] );
//        foreach ($result as $entry) {
//            echo $entry['_id'], ': ', $entry['name'], "\n";
//        }
//        $search['$text'] = ['$search' => "foo"];
//        $options["projection"] = ['score' => ['$meta' => "textScore"]];
//        $options["sort"] = ["score" => ['$meta' => "textScore"]];
//        $cursor = $collection->find($search, $options);

    }
}