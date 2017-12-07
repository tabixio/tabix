<?php
use Codeception\Util\Fixtures;
$I = new ApiTester($scenario);
$I->haveHttpHeader('Content-Type', 'application/json');
// Сохраняем Widgets -> список Widget есть Dashboard ???Зачем Query???
// Widgets==Query - если его добавили в Dashboard

$I->wantTo('Удалить все данные в mongoDB');
$I->sendPOST('/developapi/cleandb', ['auth' =>Fixtures::get('auth'),'cleanDatabaseKey'=>'##VFTQWESDFXCV##' ] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseJsonMatchesXpath('//dev//ok');
// ------------------------

$I->wantTo('Отправка запросов в CH + widget');
$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),
    'query'=>
            'SELECT number FROM $chDevelop2.system.numbers LIMIT 3
          DRAW_PLOTLY {
            yAxis:numver
          }

          DRAW_CHART {
            xAxis:numver
          }
          
',
    'widget'=>[
        'type'=>'table'
    ]
] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseJsonMatchesXpath('//tabix//qid');
$quid1 = $I->grabDataFromResponseByJsonPath('tabix.qid')[0];
$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),
    'query'=>
        'SELECT number FROM $chDevelop2.system.numbers LIMIT 3',
    'widget'=>[
        'type'=>'table'
    ]
] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseJsonMatchesXpath('//tabix//qid');
$quid2 = $I->grabDataFromResponseByJsonPath('tabix.qid')[0];



// Сохранить запрос на Dashboard новый,path=root - получить DID
$I->sendPOST('/dashboard/new',
    [
            'auth' =>Fixtures::get('auth'),
            'dash'=>[
                'path'   => false,
                'widgets'=>[
                        'id1'=>['id'=>$quid1],
                        'id2'=>['id'=>$quid2]
                ],
                'title'  => 'My first report dash'
            ]
    ]);

$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseJsonMatchesXpath('//did');
$dash1 = $I->grabDataFromResponseByJsonPath('did')[0];

// Сохранить запрос на Dashboard новый,path="Sales & Продажи / Лето 2017 " - получить DID
$I->sendPOST('/dashboard/new',
    [
        'auth' =>Fixtures::get('auth'),
        'dash'=>[
            'path'   => ['Sales & Продажи','Лето 2017'],
            'widgets'=>
            [
                    'id1'=>['id'=>$quid1,'x'=>0,'y'=>0,'w'=>3,'h'=>3],
                    'id2'=>['id'=>$quid2],
            ],
            'title'  => 'Продажи летом 2017',

        ]
    ]);


$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseJsonMatchesXpath('//did');
$dash2 = $I->grabDataFromResponseByJsonPath('did')[0];




// Получить даш по DID

$I->wantTo('Получить Dashboard '.$dash2);

$I->sendPOST('/dashboard/'.$dash2,
    [
        'auth' =>Fixtures::get('auth'),
    ]
);
$I->seeResponseJsonMatchesXpath('//did');
$I->seeResponseJsonMatchesXpath('//dash//path');
$I->seeResponseJsonMatchesXpath('//dash//title');

// ------------------------------------------------------------------------
$I->wantTo('Обновить Dashboard '.$dash2);
$I->sendPOST('/dashboard/'.$dash2.'/update',
    [
        'auth' =>Fixtures::get('auth'),
        'dash'=>['title'=>'Продажи Lетом 2017']
    ]
);
$I->seeResponseJsonMatchesXpath('//did');

// ------------------------------------------------------------------------
$I->wantTo('Обновить Dashboard '.$dash1);
$I->sendPOST('/dashboard/'.$dash1.'/update',
    [
        'auth' =>Fixtures::get('auth'),
        'dash'=>['title'=>'Продажи Весной 2017']
    ]
);
// ------------------------------------------------------------------------


// Получить все дашборды

// Удалить дашборд

// Удалить запрос из дашборд

// Обновить запрос в дашборд

// Добавить в DID один запрос


