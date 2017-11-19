<?php
// ----------------------------------------------------------------------
use Codeception\Util\Fixtures;

$I = new ApiTester($scenario);
$I->wantTo('check Online service');
$I->sendGET('/');
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200


$I->wantTo('login as default user');

$I->haveHttpHeader('Content-Type', 'application/json');
$I->sendPOST('/login', ['auth' =>Fixtures::get('auth') ] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseIsJson();
$I->seeResponseContainsJson(['result' => 'ok']);


$I->wantTo('check login as default select');
$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),'query'=>'SELECT "%TABIX_CHECK_LOGIN%"' ] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseJsonMatchesXpath('//db//data');
$I->seeResponseJsonMatchesXpath('//db//meta');
// ----------------------------------------------------------------------


$I->wantTo('Check Default db');
$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),'query'=>'SELECT number FROM system.numbers LIMIT 3' ] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseJsonMatchesXpath('//db//data');
$I->seeResponseJsonMatchesXpath('//db//meta');
$I->seeResponseJsonMatchesXpath('//db//meta//name');
$I->seeResponseJsonMatchesXpath('//db//rows');
$I->seeResponseJsonMatchesJsonPath('$.db.meta[0].name');
$I->seeResponseJsonMatchesJsonPath('$.db.data[0].number');
// ----------------------------------------------------------------------

$I->wantTo('check path to DB');
$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),'query'=>'SELECT number FROM $chDevelop2.system.numbers LIMIT 3' ] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseJsonMatchesXpath('//db//data');
$I->seeResponseJsonMatchesXpath('//db//meta');
$I->seeResponseJsonMatchesXpath('//db//meta//name');
$I->seeResponseJsonMatchesXpath('//db//rows');
$I->seeResponseJsonMatchesJsonPath('$.db.meta[0].name');
$I->seeResponseJsonMatchesJsonPath('$.db.data[0].number');
// ----------------------------------------------------------------------
//
$I->wantTo('check path to MySQL_DB');
$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),'query'=>'SELECT * FROM $sqldb.sys.metrics limit 1' ] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseJsonMatchesXpath('//db//data');
$I->seeResponseJsonMatchesXpath('//db//meta');
$I->seeResponseJsonMatchesXpath('//db//meta//name');
$I->seeResponseJsonMatchesXpath('//db//rows');
//$I->seeResponseJsonMatchesJsonPath('$.meta[0].name');
//$I->seeResponseJsonMatchesJsonPath('$.data[0].number');
// ----------------------------------------------------------------------
////
$I->wantTo('check path to MySQL_DB');
$I->sendPOST('/query', ['auth' =>Fixtures::get('auth'),'query'=>'SELECT * FROM $sqldb.information_schema.FILES limit 1' ] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseJsonMatchesXpath('//db//data');
$I->seeResponseJsonMatchesXpath('//db//meta');
$I->seeResponseJsonMatchesXpath('//db//meta//name');
$I->seeResponseJsonMatchesXpath('//db//rows');
$I->seeResponseJsonMatchesJsonPath('$.db.meta[0].name');
$I->seeResponseJsonMatchesJsonPath('$.db.data[0].FILE_NAME');
// ----------------------------------------------------------------------