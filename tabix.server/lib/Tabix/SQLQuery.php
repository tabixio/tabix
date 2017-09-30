<?php
namespace Tabix;


class SQLQuery
{
    /**
     * @var \Tabix\Query\Parser
     */
    private $_parse;

    private $_text;

    public function __construct($text_SQL)
    {
        $this->_text=$text_SQL;
    }

    /**
     * @return \Tabix\Query\Parser
     */
    public function parse()
    {
        ///
        if (!$this->_parse)
        {
            $this->_parse=new \Tabix\Query\Parser($this->_text);
        }
        return $this->_parse;
    }

    public function __toString()
    {
        return $this->_text;
    }

    public function replaceHost($server_id)
    {
        $this->_text=str_ireplace('$'.$server_id.'.','',$this->_text);
    }
    public function sql()
    {
        return $this->_text;
    }
}