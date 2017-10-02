<?php
return [


'servers'=>[
    'MyClickhouseHost'=>[
        'type'=>'Clickhouse',
        'connection'=>['host'=>'127.0.0.1','port'=>'8123','username'=>'default','password'=>'']

    ],
//    'sqldb'=>[
//        'type'=>'MySQL',
//        'driver'=>'PDO',
//        'connection'=>['dsn'=>'mysql:host=127.0.0.1;dbname=sys','username'=>'tabix','password'=>'tabix858']
//    ]
],

'query_id_settings'=>
    [
        'hash'=>'MY_CRYPTO_KEY',
    ],

'mongodb'=>
    [
        'client'=>"mongodb://localhost:27017"
    ],
'auth'=>
    [
            'type'=>'plaintext',
            'helper'=>[
                ['login'=>'tabix','password'=>'wx4s8Mj3s8MsK3SR'],
                ['login'=>'tabix2','password'=>'mXEBHjCzNr36mMa7'],
                ['login'=>'tabix3','password'=>'hDxefkqREJmBCX5h'],
            ]
    ]
];
