<?php

 
class SlimHelper
{
    /**
     * @param $text
     * @param $level
     */
    public function flashMessage($text, $level)
    {
        $app = \Slim\Slim::getInstance();
        $app->flash('message', array('text' => $text, 'level' => $level));
    }

    /**
     * @param array $data
     * @param null $error
     */
    public function responseJson(array $data, $error = null)
    {
        $result = $error ? array('success' => 0, 'error' => $error) : array('success' => 1);
        $result += $data;

        $app = \Slim\Slim::getInstance();
        $app->response->headers->set('Content-type', 'application/json');
        echo json_encode($result);
        $app->stop();
    }
}