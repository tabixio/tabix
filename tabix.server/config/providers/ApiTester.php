<?php
return [
'servers'=>[
    'chDevelop2'=>[
        'type'=>'Clickhouse',
//        'connection'=>['host'=>'192.168.1.21','port'=>'8123','username'=>'default','password'=>'']
        'connection'=>['host'=>'127.0.0.1','port'=>'8123','username'=>'default','password'=>'']

    ],
    'chDevelop1'=>[
        'type'=>'Clickhouse',
    ],

    'sqldb'=>[
        'type'=>'MySQL',
        'driver'=>'PDO',
        'connection'=>['dsn'=>'mysql:host=127.0.0.1;dbname=sys','username'=>'tabix','password'=>'tabix858']
    ]
],

'query'=>
    [
        'hash'=>'MY_CRYPTO_KEY',
    ],



'mongodb'=>
    [
        // mongodb://${username}:${password}@localhost
        'client'=>"mongodb://superAdmin:admin123@127.0.0.1:27017",
        'database'=>"tabix_ApiTester",
        'cleanDatabaseKey'=>'##VFTQWESDFXCV##' // need for api.test only ! use `empty` or not set -- on production!
    ],




'auth'=>[
            'type'=>'plaintext',
            'helper'=>[
                ['login'=>'tabix','password'=>'tabix','enabledb'=>['chDevelop2','chDevelop1','mysqldb']],
                ['login'=>'tabix2','password'=>'tabix2','enabledb'=>['chDevelop2']],
                ['login'=>'tabix3','password'=>'tabix3'],
            ]
]
];