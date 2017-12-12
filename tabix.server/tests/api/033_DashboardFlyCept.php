<?php
use Codeception\Util\Fixtures;
$I = new ApiTester($scenario);
$I->haveHttpHeader('Content-Type', 'application/json');
$I->wantTo('Удалить все данные в mongoDB');
$I->sendPOST('/developapi/cleandb', ['auth' =>Fixtures::get('auth'),'cleanDatabaseKey'=>'##VFTQWESDFXCV##' ] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseJsonMatchesXpath('//dev//ok');
// ------------------------
$I->wantTo('Отправка запросов в CH + widget');
$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),
    'query'=>
'
SELECT FlightDate , count(*) AS `count fly` FROM ontime
GROUP BY FlightDate
ORDER BY FlightDate

DRAW_CHART
{

}
',
    'widget'=>[
        'type'=>'table',
        'title'=>'Все полеты по дате'
    ]
] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$quidFly = $I->grabDataFromResponseByJsonPath('tabix.qid')[0];



$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),
    'query'=>
'
SELECT FlightDate , count(*) AS `count fly` FROM ontime
WHERE FlightDate=:date
GROUP BY FlightDate
ORDER BY FlightDate
',
    'widget'=>[
        'type'=>'table',
        'title'=>'Полеты на дату'
    ],
    'vars'=>
        [
            'date'=>'2017-05-03'
        ],
] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$onDate = $I->grabDataFromResponseByJsonPath('tabix.qid')[0];



$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),
    'query'=>
        '

select Carrier,c3  FROM
(
SELECT Carrier, c, c2, c*100/c2 as c3
FROM
(
    SELECT
        Carrier,
        count(*) AS c
    FROM ontime
    WHERE DepDelay>10
        AND Year=2017
    GROUP BY Carrier
)
ANY INNER JOIN
(
    SELECT
        Carrier,
        count(*) AS c2
    FROM ontime
    WHERE Year=2017
    GROUP BY Carrier
) USING Carrier
ORDER BY c3 DESC
)
ORDER BY c3 DESC
DRAW_BAR
{

}
',
    'widget'=>[
        'title'=>'Процент задержек по перевозчикам за 2017 год'
    ],


] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$q1 = $I->grabDataFromResponseByJsonPath('tabix.qid')[0];



$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),
    'query'=>
        '
SELECT
(OriginId || \' = \' || toString(c)) as title,c, toFloat64(latitude) as latitude,toFloat64(longitude) as longitude
FROM (
SELECT
toString(Origin) as OriginId, count(*) AS c FROM ontime

WHERE DepDelay>10
GROUP BY OriginId ORDER BY c DESC LIMIT :limit
)
ANY LEFT JOIN (
SELECT Origin as OriginId, latitude , longitude FROM default.aircode

) USING (OriginId)
DRAW_MAP
{
name:\'title\',
count:\'c\'
}
',
    'widget'=>[
        'title'=>'Количество задержек по аэропортам'
    ],
    'vars'=>[
        'limit'=>10
    ]


] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$q2 = $I->grabDataFromResponseByJsonPath('tabix.qid')[0];




// Сохранить запрос на Dashboard новый,path=root - получить DID
$I->sendPOST('/dashboard/new',
    [
            'auth' =>Fixtures::get('auth'),
            'dash'=>[
                'path'   => 'Полеты onTime',
                'widgets'=>[
                        'id1'=>['id'=>$quidFly],
                        'id2'=>['id'=>$onDate],
                        'id3'=>['id'=>$q1],
                        'id4'=>['id'=>$q2]
                ],
                'vars'=>
                [
                    'date'=>['type'=>'date','title'=>'Дата','default'=>'2017-05-03'],
                    'limit'=>['type'=>'int','title'=>'Кол-во аэропортов','default'=>10]
                ],
                'title'  => 'Полеты на дату'
            ]
    ]);

$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseJsonMatchesXpath('//did');
$dash1 = $I->grabDataFromResponseByJsonPath('did')[0];




$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),
    'query'=>
        '
SELECT FlightDate as dt , count(*) AS `value` FROM ontime
GROUP BY FlightDate
ORDER BY FlightDate
DRAW_CALENDAR
{

}
',
    'widget'=>[
        'type'=>'table',
        'title'=>'Полеты на дату'
    ]
] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$onDate = $I->grabDataFromResponseByJsonPath('tabix.qid')[0];


$I->sendPOST('/dashboard/new',
    [
        'auth' =>Fixtures::get('auth'),
        'dash'=>[
            'path'   => 'Полеты onTime',
            'widgets'=>[
                'id1'=>['id'=>$onDate],
            ],
            'title'  =>'Календарь полетов',
        ]
    ]);

$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseJsonMatchesXpath('//did');
$dash1 = $I->grabDataFromResponseByJsonPath('did')[0];








$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),
    'query'=>
        'SELECT number,sin(number) as s,cos(number) as c FROM $chDevelop2.system.numbers LIMIT :limit
          DRAW_PLOTLY { 
    trace:{
    z:data.c,
    x:data.number,
    y:data.c, 
    mode: \'markers\',
    type:\'scatter3d\',opacity:0.3}

}
         
',

    'vars'=>[
        'limit'=>100
    ],
    'widget'=>[ 'title'=>'Sin&Cos scatter 3D PlotLy',

    ]
] );

$quid1 = $I->grabDataFromResponseByJsonPath('tabix.qid')[0];



$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),
    'query'=>
        'select number as nu,
sin(number) as s,
cos(number) as c 
from system.numbers limit :limit
DRAW_PLOTLY { 
    trace:{x:data.nu,y:data.s,type:\'scatter\',name:\'sin()\'},
    trace1:{x:data.nu,y:data.c,type:\'scatter\',name:\'cos()\'}
}',

    'vars'=>[
        'limit'=>100
    ],
    'widget'=>['title'=>'Sin&Cos scatter PlotLy',

    ]
] );

$quid2 = $I->grabDataFromResponseByJsonPath('tabix.qid')[0];




$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),
    'query'=>
        'select number as nu,
sin(number) as s,
cos(number) as c 
from system.numbers limit :limit
DRAW_PLOTLY { 
    trace:{x:data.s,y:data.nu,z:data.c,type:\'mesh3d\',opacity:0.8}

}
         
',

    'vars'=>[
        'limit'=>100
    ],
    'widget'=>[ 'title'=>'Sin&Cos mesh 3D PlotLy',

    ]
] );

$quid3 = $I->grabDataFromResponseByJsonPath('tabix.qid')[0];





// Сохранить запрос на Dashboard новый,path=root - получить DID
$I->sendPOST('/dashboard/new',
    [
        'auth' =>Fixtures::get('auth'),
        'dash'=>[
            'path'   => false,
            'widgets'=>[
                'id1'=>['id'=>$quid1],
                'id2'=>['id'=>$quid2],
                'id3'=>['id'=>$quid3]
            ],
            'vars'=>
                [
                    'limit'=>['type'=>'int','title'=>'Кол-во','default'=>'100']
                ],
            'title'  => 'Sin & Cos - PlotLY'
        ]
    ]);

$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseJsonMatchesXpath('//did');
$dash1 = $I->grabDataFromResponseByJsonPath('did')[0];








