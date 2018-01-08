<?php
return [
'domains'=>['tabix.dev7','*'],
'servers'=>[
    'chDevelop2'=>[
        'type'=>'Clickhouse',
//        'connection'=>['host'=>'192.168.1.21','port'=>'8123','username'=>'default','password'=>'']
        'connection'=>['host'=>'127.0.0.1','port'=>'8123','username'=>'default','password'=>'']

    ],
//    'chDevelop1'=>[
//        'type'=>'Clickhouse',
//    ],

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
    // ----------------------------------------------------------------------------
    [ // PLAINTEXT
            'type'=>'plaintext',
            'helper'=>[
                ['login'=>'tabix','password'=>'tabix','enabledb'=>['chDevelop2','chDevelop1','mysqldb']],
                ['login'=>'tabix2','password'=>'tabix2','enabledb'=>['chDevelop2']],
                ['login'=>'tabix3','password'=>'tabix3'],
                ['login'=>'sha1sha','password'=>'6b3f7fe6f07e9426bec45f7cec98813a51999383'], // pass: `txtxt`

            ]
    ],
    // ----------------------------------------------------------------------------
    [ // Lambda
        'type'=>'lambda',
        'helper'=>function(\Tabix\Auth\LambdaProvider $ls)
                {
                    $code=sha1($ls->getLogin().'#'.$ls->getPassword()); // tabixsha + mypassword

                    return (in_array($code,['882f554a018cb4c20ddf233a1301f4b89ef865c1']));


                }

    ],
    // ----------------------------------------------------------------------------
    [ // LDAP
        'type'=>'ldap',
        'helper'=>[
            'domain_controllers'    => ['ACME-DC01.corp.acme.org', '192.168.1.1'],    // use the either the host name or the IP address of your host.
            'base_dn'               => 'dc=corp,dc=acme,dc=org',// The base distinguished name of your domain.
            // The account to use for querying / modifying LDAP records.
            'admin_username'        => 'admin@corp.acme.org',
            'admin_password'        => 'password',
            'cache'=>true,
        ]
    ]
]//auth
// ----------------------------------------------------------------------------

];//config

