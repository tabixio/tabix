<?php
use Codeception\Util\Fixtures;
// ----------------------------------------------------------------------
$I = new ApiTester($scenario);
$I->wantTo('2 check Online service');
$I->sendGET('/');
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200


$I->wantTo('2 login as default user');

$I->haveHttpHeader('Content-Type', 'application/json');
$I->sendPOST('/state', ['auth' =>Fixtures::get('auth') ] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseIsJson();
$I->seeResponseContainsJson(['_status' => '200']);

// ------------------------------------------------------------------------


$I->wantTo('check path to DB');
$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),'query'=>'SELECT number FROM $chDevelop2.system.numbers LIMIT 3' ] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseJsonMatchesXpath('//tabix');
$I->seeResponseJsonMatchesXpath('//tabix//qid');


// Отправить запрос и получить его QUID



// Получить еще раз отправленный запрос по QUID

// Получить еще раз данные по QUID

// Получить еще раз данные по QUID : CSV

// Получить еще раз данные по QUID : TSV

// Получить еще раз данные по QUID c limit & date - т/е передавая переменные

// Сделать запрос с доступом по ключу

// Получить с ключем


// Отпривить запрос с DRAW_COMMAND

// Отпривить запрос с DRAW_COMMAND и получить QUID




