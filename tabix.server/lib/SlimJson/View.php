<?php
// https://github.com/dogancelik/slim-json/blob/master/SlimJson/
namespace SlimJson;

use Slim\Slim;

class View extends \Slim\View {

  /**
   * @param int|string $status
   * @param array|null $data
   * @return void
   */
  public function render($status, $data = null)
  {
    $app = Slim::getInstance();
    $response = $this->all();

    $status = \intval($status);
    $app->response()->status($status);
    if ($app->config(Config::Status)) {
      $response['_status'] = $status;
//      $response['_data']= $data;
//      $response['_trace'] = debug_backtrace(false);
    }

    if (isset($response['flash']) && \is_object($response['flash'])) {
      $flash = $this->data->flash->getMessages();
      if (count($flash)) {
        $response['flash'] = $flash;
      } else {
        unset($response['flash']);
      }
    }
//

       $app->response()->body(
//           json_encode($response,JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
           json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE)
        );
  }

}