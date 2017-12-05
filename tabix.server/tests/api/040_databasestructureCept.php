<?php
$I = new ApiTester($scenario);
$I->wantTo('perform actions and see result');


//
//$I->wantTo('get database structure');
//$I->sendPOST('/structure',['auth' =>Fixtures::get('auth')]);
//$I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
//$I->seeResponseIsJson();
//$I->seeResponseMatchesJsonType([
//    'user_id' => 'integer',
//    'name' => 'string|null',
//    'is_active' => 'boolean'
//]);

//$I->seeResponseContainsJson(['structure' => 'ok']);
//
//$quid = $I->grabDataFromResponseByJsonPath('tabix.qid')[0];
//$sign = $I->grabDataFromResponseByJsonPath('tabix.sign')[0];
//

