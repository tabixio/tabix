<?php
use Codeception\Util\Fixtures;
// ----------------------------------------------------------------------
$I = new ApiTester($scenario);
$I->wantTo('2 check Online service');
$I->sendGET('/');
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->haveHttpHeader('Content-Type', 'application/json');


// ------------------------------------------------------------------------

// Отправить запрос и получить его QUID
$I->wantTo('check path to DB');
$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),'query'=>'SELECT number FROM $chDevelop2.system.numbers LIMIT 3' ] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseJsonMatchesXpath('//tabix');
$I->seeResponseJsonMatchesXpath('//tabix//qid');
$I->seeResponseJsonMatchesXpath('//tabix//sign');
$quid = $I->grabDataFromResponseByJsonPath('tabix.qid')[0];
$sign = $I->grabDataFromResponseByJsonPath('tabix.sign')[0];



// --------------------------------------------------------------------------------
$I->wantTo('Получить еще раз данные по QUID : JSON');
$I->sendPOST('/fetch', ['auth' =>Fixtures::get('auth'),'sign'=>$sign,'quid'=>$quid,'format'=>'json'] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
// ????
$I->seeResponseContainsJson(array('name' => 'john'));


$I->wantTo('Получить еще раз данные по QUID : csv');
$I->sendPOST('/fetch', ['auth' =>Fixtures::get('auth'),'sign'=>$sign,'quid'=>$quid,'format'=>'csv'] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseContains('BBBB');
$I->seeBinaryResponseEquals('BBBB');

$I->wantTo('Получить еще раз данные по QUID : tsv');
$I->sendPOST('/fetch', ['auth' =>Fixtures::get('auth'),'sign'=>$sign,'quid'=>$quid,'format'=>'tsv'] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseContains('BBBB');
$I->seeBinaryResponseEquals('BBBB');



// --------------------------------------------------------------------------------
//



// Сделать запрос с доступом по ключу - [public share key]

// Получить с ключем по QUID + KEY


// Отпривить запрос с DRAW_COMMAND


// Отпривить запрос с DRAW_COMMAND и получить QUID




