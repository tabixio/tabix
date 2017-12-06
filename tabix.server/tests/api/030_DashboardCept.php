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


$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),
    'query'=>
            'SELECT number FROM $chDevelop2.system.numbers LIMIT 3
          DRAW_PIVOT {
          
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
$quid1 = $I->grabDataFromResponseByJsonPath('tabix.qid')[0];





// Сохранить запрос на Dashboard новый,path=root - получить DID

// Сохранить запрос на Dashboard новый,path=sales - получить DID

// Сохранить запрос на Dashboard новый,path=sales - получить DID


// Получить даш по DID

// Добавить в DID только график

// Получить все дашборды

// Удалить дашборд

// Удалить запрос из дашборд

