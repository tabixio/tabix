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


    if (!empty($response['flash'])) unset($response['flash']);


    $status = \intval($status);
    $app->response()->status($status);



    if (!is_array($response))
    {
          $app->response()->status(500);
          $app->response()->body($response);

      }

       $app->response()->body(
//           json_encode($response,JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
           json_encode($response,
               JSON_PARTIAL_OUTPUT_ON_ERROR|
                        JSON_PRETTY_PRINT |
                        JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE)
        );
  }

}