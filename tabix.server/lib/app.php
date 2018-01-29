<?php
use Slim\Slim;

class App extends Slim {

    private $_json_input=null;

    public function __construct(array $userSettings = array())
    {
        parent::__construct($userSettings);
    }
    public function json($key=null,$default=null)
    {
        if (!$this->_json_input)
        {
            $this->_json_input = json_decode($this->request()->getBody(),true);
        }
        if ($key)
        {
            if (!isset($this->_json_input[$key])) return $default;
            return $this->_json_input[$key];
        }
        return $this->_json_input;
    }


}
// ------------------------------------------------------------
$app = new App([
    'version'        => '17.08.0',
    'mode'           => 'testing',
    'templates.path' => __DIR__ . '/../app/templates',
    'debug'          => true,//(@$HTTP_ENV_VARS['develop']),
]);

$app->response()->header('Content-Type', 'application/json;charset=utf-8');

// Add the middleware globally
$app->add(new \SlimJson\Middleware(array( // https://github.com/dogancelik/slim-json
    'json.cors' => true,
    'json.status' => true,
    'json.override_error' => true,
    'json.override_notfound' => true
)));
// For fast answer options always is ok
$app->hook('slim.before.dispatch', function () use ($app) {

    if ($app->request->isOptions()) {
        $app->response()->header('Access-Control-Allow-Origin', '*');
        $app->response()->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, X-Jquery-Json, Authorization');
        $app->halt(200);
    }
});

// ------------------------------------------------------------------------------------------------------------------------
// init routers

$app->any('/',function () use ($app) {
    $app->render(200, ['msg' =>"OK!"]);
});

$app->any('/ping',function () use ($app) {
    $app->render(200, ['msg' =>"PONG!"]);
});

$app->any('/:action(/:first(/:second))', function ($action,$first=null,$second=null) use ($app)
{
    try
    {
        $router=new \Tabix\Actions($app->json());

        $call='action'.ucwords($action).''.ucwords($first);
        if (!method_exists($router,$call))
        {
            $call='action'.ucwords($action);
            if (!method_exists($router,$call))
            {
                throw new \Exception("Method ".$action." not exists");
            }
        }
        $result=$router->$call($first,$second);
        if (!is_array($result)) {
            throw  new Exception("Result not array:".json_encode($result));
        }
        $app->render(200, $result);
    }
    catch (Exception $E)
    {
        $app->render(500,[
                'error'=>$E->getMessage(),
                'file'=>$E->getFile().':'.$E->getLine(),
//                'trace'=>$E->getTrace()
                ]
        );
    }
});



$app->run();