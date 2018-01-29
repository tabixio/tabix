<?php
// ----------------------------------------------------------------------
use Codeception\Util\Fixtures;

$I = new ApiTester($scenario);
$I->wantTo('check Online service');
$I->sendGET('/');
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200





$I->wantTo('Login as Default user');
$I->haveHttpHeader('Content-Type', 'application/json');
$I->sendPOST('/login', ['auth' => ['login'=>'tabix','password'=>'tabix','confid'=>'ApiTester'] ] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseIsJson();
$I->seeResponseContainsJson(['result' => 'ok']);


// ------------------------------------------------------------------------------------


$I->wantTo('Login as Default user : load by domain');
$I->haveHttpHeader('Content-Type', 'application/json');
$I->sendPOST('/login', ['auth' =>['login'=>'tabix','password'=>'tabix'] ] ); //
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseIsJson();
$I->seeResponseContainsJson(['result' => 'ok']);


$I->wantTo('Login as sha1');
$I->haveHttpHeader('Content-Type', 'application/json');
$I->sendPOST('/login', ['auth' =>['login'=>'sha1sha','password'=>'txtxt'] ] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseIsJson();
$I->seeResponseContainsJson(['result' => 'ok']);



$I->wantTo('Login as lambda function ');
$I->haveHttpHeader('Content-Type', 'application/json');
$I->sendPOST('/login', ['auth' =>['login'=>'tabixsha','password'=>'mypassword'] ] );
$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
$I->seeResponseIsJson();
$I->seeResponseContainsJson(['result' => 'ok']);

