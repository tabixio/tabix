<?php
namespace Tabix;

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

    public function query(\Tabix\Query\Result $q)
    {


        $insert=[];
        $insert['db']=$q->toArray();
        // @todo  sizeOf insert[data]
        $insert['dt']=time();
        $insert['dtm']=microtime(true);
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
    public function cleanDevDatabase()
    {
        $this->collection_dashboards()->drop();
        $this->collection_query()->drop();
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