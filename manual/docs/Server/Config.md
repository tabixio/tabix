Minimal config file :

```php
<?php
return [
'servers'=>[
    'chDevelop2'=>[
        'type'=>'Clickhouse',
        'connection'=>['host'=>'127.0.0.1','port'=>'8123','username'=>'default','password'=>'']
    ],
    'chDevelop1'=>[
        'type'=>'Clickhouse',
    ],
    'mysqldb'=>[
        'type'=>'MySQL',
        'driver'=>'PDO',
        'connection'=>['dsn'=>'mysql:host=127.0.0.1;dbname=sys','username'=>'tabix','password'=>'tabix858']
    ]
],

'query'=>
    [
        'hash'=>'MY_CRYPTO_KEY_HASH', //random srtring
    ],

'mongodb'=>
    [
        // mongodb://${username}:${password}@localhost
        'client'=>"mongodb://superAdmin:admin123@127.0.0.1:27017",
        'database'=>"tabix_db"
    ],

'auth'=>[
            'type'=>'plaintext',
            'helper'=>[
                ['login'=>'tabix','password'=>'tabix'],
                ['login'=>'tabix2','password'=>'tabix2'],
                ['login'=>'tabix3','password'=>'tabix3'],
            ]
]
];
```

## Config.Servers

List ClickHouse servers or MySQL, other database.

Now support :
* Clickhouse `type=Clickhouse`
* MySQL `type=MySQL`

### Config.mongodb

Change `database` and `client`

```
mongodb://{login}:{password}@{host}:{port}
```

### Config.Auth

Now support only plain text
