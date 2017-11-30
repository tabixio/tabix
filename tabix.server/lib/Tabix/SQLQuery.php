<?php
namespace Tabix;


class SQLQuery
{
    /**
     * @var \Tabix\Query\Parser
     */
    private $_parse;

    private $_text;

    private $_vars;

    public function __construct($text_SQL,$vars=[])
    {
        $this->_text=$text_SQL;
        $this->_vars=$vars;
        $this->variablesSQL();
    }

    /**
     * @return \Tabix\Query\Parser
     */
    public function parse()
    {
        ///
        if (!$this->_parse)
        {
            $this->_parse=new \Tabix\Query\Parser($this->_text,$this->_vars);
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

    private function variablesSQL()
    {
    }

    public function vars()
    {
        return $this->_vars;
    }
    public function originalSql()
    {
        return $this->_text;
    }
    public function sql()
    {

        $sql=$this->_text;
        if (is_array($this->_vars))
        {

            // convert SQL
            $deg=new \Tabix\Degeneration();
            $deg->bindParams($this->_vars);
            $sql=$deg->process($sql);
        }


        return $sql;
    }
}