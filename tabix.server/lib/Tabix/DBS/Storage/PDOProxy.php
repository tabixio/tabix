<?php
namespace Tabix\DBS\Storage;


use Tabix\SQLQuery;

class PDOProxy
{
    /**
     * @var \PDO
     */
    private $client;

    /**
     * PDOProxy constructor.
     * @param \PDO $config
     */
    public function __construct(Array $config)
    {
        if (empty($config['dsn'])) throw new \Exception("Not set PDO - dsn param");
        if (empty($config['username'])) throw new \Exception("Not set PDO - username param");
        $this->client=new \PDO($config['dsn'],$config['username'],$config['password']);
        $this->client->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    }

    /**
     * @param $query SQLQuery
     * @param $bind
     * @return array
     */
    public function fetchAll(SQLQuery $query,$bind=[])
    {
        $sql=$query->sql();
        $sth = $this->client->prepare($sql, array(\PDO::ATTR_CURSOR => \PDO::CURSOR_FWDONLY));


        $sth->execute($bind);

        $out['data']=$sth->fetchAll(\PDO::FETCH_ASSOC);

        $meta=[];
        if ($sth->columnCount())
        {
            foreach(range(0, $sth->columnCount() - 1) as $column_index)
            {
                $z= $sth->getColumnMeta($column_index);

                $c['name']=$z['name'];
                $c['type']=$this->convertType($z['native_type']);

                $meta[]=$c;
            }
        }
        $out['meta']=$meta;
        $out['rows']=$sth->rowCount();
        $out['rows_before_limit_at_least']=-1;

        $out['statistics']=[
            'bytes_read'=>0,
            'rows_read'=>0,
            'elapsed'=>0,
        ];

        return $out;
    }

    public function convertType($type)
    {
        $trans = array(
            'VAR_STRING' => 'String',
            'STRING' => 'String',
            'BLOB' => 'String',
            'LONGLONG' => 'Int64',
            'LONG' => 'Int64',  // 32
            'SHORT' => 'Int32', // 16
            'DATETIME' => 'DateTime',
            'DATE' => 'Date',
            'DOUBLE' => 'Float64',
            'TIMESTAMP' => 'DateTime'
        );
        if (isset($trans[$type])) {
            return $trans[$type];
        }
        return ucwords($type);
    }
}