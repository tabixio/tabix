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
        $this->__connect=new \MongoDB\Client( $this->_config->getMongoDB('client'));
        return $this->__connect;

    }

    public function initCreateMongoDataBase()
    {
        \Tabix\Initialization::createMongo($this->__connect,$this->_config);
    }


    /**
     * @return \MongoDB\Client
     */
    public function client()
    {
        return $this->connect();
    }

    public function query(\Tabix\Query\Result $q)
    {

        $signKey=$this->_config->getQuerySignkey();
        $collection=$this->client()->queryes;


        $insert=$q->toArray();

        // sizeOf insert[data]

        $insert['dt']=time();
        $insert['dtm']=microtime(true);
        $insert['sing']=substr(sha1($signKey.microtime(true).$q->sql().$signKey),0,10);


        $collention->insertOne(
          $insert
        );


        return $q;
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