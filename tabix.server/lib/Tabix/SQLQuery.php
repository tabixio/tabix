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

    private $_drawCommands;

    private $_originalSQL='';

    private $_server_id=false;

    public function __construct($text_SQL,$vars=[])
    {
        $this->_server_id=false;
        $this->_vars=$vars;
        $this->_drawCommands=[];
        $this->preProcessSQL($text_SQL);

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

    public function applyHost($server_id)
    {
        $this->_server_id=$server_id;

        $this->_text=str_ireplace('$'.$server_id.'.','',$this->_text);
    }

    public function vars()
    {
        return $this->_vars;
    }
    public function originalSql()
    {
        return $this->_originalSQL;
    }

    private function preProcessSQL($sql)
    {
        $this->_originalSQL=$sql;
        $drawCommands=[];
        if (stripos($sql,'DRAW_'))
        {
            $sql=str_ireplace('DRAW_','DRAW_',$sql);
            // drop draw command

            $z=explode('DRAW_',$sql);
            if (sizeof($z)) {

                foreach ($z as $pos=>$item)
                {
                    if ($pos==0) {
                        $sql=$item;
                    } else {
                        $drawCommands[]='DRAW_'.$item;
                    }
                }
            }

        }
        $this->_drawCommands=$drawCommands;


        //




        if (is_array($this->_vars))
        {

            // convert SQL
            $deg=new \Tabix\Degeneration();
            $deg->bindParams($this->_vars);
            $sql=$deg->process($sql);
        }





        $this->_text=$sql;

        return $sql;
    }

    public function sql()
    {

        $sql=$this->_text;


        return $sql;
    }
}