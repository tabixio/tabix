<?php
//https://github.com/dogancelik/slim-json/blob/master/SlimJson/

namespace SlimJson;

use Slim\Slim;

abstract class Config {
  const Debug = 'json.debug';
  const Status = 'json.status';
  const OverrideError = 'json.override_error';
  const OverrideNotFound = 'json.override_notfound';
  const Protect = 'json.protect';
  const Cors = 'json.cors';
  const ClearData = 'json.clear_data';
}

class Middleware extends \Slim\Middleware {

  /**
   * @param array $config
   */
  function __construct($config = null)
  {
    $app=Slim::getInstance();

    $app->view(new View());

    $defaultConfig = array(
      'debug' => false, // Disable PrettyException middleware
      Config::Debug => false,
      Config::Status => false,
      Config::OverrideError => true,
      Config::OverrideNotFound => true,
      Config::Protect => false,
      Config::Cors => false,
      Config::ClearData => false,
    );
    if (\is_array($config)) {
      $config = array_merge($defaultConfig, $config);
    } else {
      $config = $defaultConfig;
    }
    $app->config($config);

    $overrideError = $app->config(Config::OverrideError);
    if ($overrideError) {
      $app->error(function (\Exception $e) use ($app, $overrideError) {

        if (\is_callable($overrideError)) {
          $func = $overrideError;
        }

        $return = array(
          'error' =>
            isset($func)
              ? \call_user_func($func, $e)
              : (intval($e->getCode()) <1 ? '' : '(#' . $e->getCode() . ') ') . $e->getMessage()
        );

        if ($app->config(Config::Debug)) {
          $return['_debug'] = array(
            'code' => $e->getCode(),
            'message' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'trace' => $e->getTrace(),
          );
        }
        if (isset($return['error']))
        {
            $arr=@json_decode($return['error'],true);
            if (sizeof($arr))
            {
                $return=$arr;
            }
        }

        $app->render(500, $return);
      });
    }

    $overrideNotFound = $app->config(Config::OverrideNotFound);
    if ($overrideNotFound) {
      $app->notFound(function() use ($app, $overrideNotFound) {

        if (\is_callable($overrideNotFound)) {
          $func = $overrideNotFound;
        }

        $return = array(
          'error' =>
            isset($func)
              ? \call_user_func($func, $app->request())
              : '\'' . $app->request()->getPath() . '\' is not found.'
        );

        $app->render(404, $return);
      });
    }

    if ($app->config(Config::ClearData)) {
      $app->view->clear();
    }

    $app->hook('slim.after.router', function () use ($app) {
      if($app->response()->header('Content-Type') === 'application/octet-stream') {
        return;
      }

      $cors = $app->config(Config::Cors);
      if ($cors) {
        if(\is_callable($cors)) {
          $allowOrigin = \call_user_func($cors, $app->request()->headers->get('Origin'));
        } else {
          if (!\is_string($cors)) {
            $allowOrigin = '*';
          } else {
            $allowOrigin = $cors;
          }
        }

        if($allowOrigin) {
          $app->response()->header('Access-Control-Allow-Origin', $allowOrigin);
          $app->response()->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, X-Jquery-Json, Authorization');
        }
      }

      if ($app->config(Config::Protect)) {
        $app->response()->body('while(1);' . $app->response()->body());
      }
    });
  }

  public function call()
  {
    $this->next->call();
  }

  private function setConfigFunction($config, $func) {
    $app = Slim::getInstance();

    if (\is_callable($func) || \is_bool($func)) {
      $app->config($config, $func);
      return true;
    } else {
      return false;
    }
  }

  public function setErrorMessage($func)
  {
    return $this->setConfigFunction(Config::OverrideError, $func);
  }

  public function setNotFoundMessage($func)
  {
    return $this->setConfigFunction(Config::OverrideNotFound, $func);
  }

  static public function inject()
  {
    $args = \func_get_args();

    $app = Slim::getInstance();
    $config = null;
    foreach ($args as $arg) {
      if ($arg instanceof Slim) {
        $app = $arg;
      }

      if (\is_array($arg)) {
        $config = $arg;
      }
    }

    $app->add(new \SlimJson\Middleware($config));
  }

}