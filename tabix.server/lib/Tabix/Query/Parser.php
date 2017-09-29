<?php
namespace Tabix\Query;

class Parser
{
    private $sql;
    private $_parse;
    public function __construct($sql)
    {
        $this->sql=$sql;
    }

    /**
     * @return \PHPSQLParser\PHPSQLParser
     */
    private function parse()
    {
        if (!$this->_parse)
        {
            $this->_parse=new \PHPSQLParser\PHPSQLParser($this->sql);
        }
        return $this->_parse;
    }

    public function get($key=false)
    {
        $p= $this->parse()->parsed;

        if ($key) return isset($p[$key])?$p[$key]:null;

        return $p;
    }
    public function options()
    {
        return $this->get('OPTIONS');
    }

    public function from()
    {
        return $this->get('FROM');
    }
    public function select()
    {
        return $this->get('SELECT');
    }
}

//
//```php
//Array
//(
//    [OPTIONS] => Array
//        (
//            [0] => STRAIGHT_JOIN
//        )
//
//    [SELECT] => Array
//        (
//            [0] => Array
//                (
//                    [expr_type] => colref
//                    [base_expr] => a
//                    [sub_tree] =>
//                    [alias] => `a`
//                )
//
//            [1] => Array
//                (
//                    [expr_type] => colref
//                    [base_expr] => b
//                    [sub_tree] =>
//                    [alias] => `b`
//                )
//
//            [2] => Array
//                (
//                    [expr_type] => colref
//                    [base_expr] => c
//                    [sub_tree] =>
//                    [alias] => `c`
//                )
//
//        )
//
//    [FROM] => Array
//        (
//            [0] => Array
//                (
//                    [table] => some_table
//                    [alias] => an_alias
//                    [join_type] => JOIN
//                    [ref_type] =>
//                    [ref_clause] =>
//                    [base_expr] =>
//                    [sub_tree] =>
//                )
//
//        )
//
//    [WHERE] => Array
//        (
//            [0] => Array
//                (
//                    [expr_type] => colref
//                    [base_expr] => d
//                    [sub_tree] =>
//                )
//
//            [1] => Array
//                (
//                    [expr_type] => operator
//                    [base_expr] => >
//                    [sub_tree] =>
//                )
//
//            [2] => Array
//                (
//                    [expr_type] => const
//                    [base_expr] => 5
//                    [sub_tree] =>
//                )
//
//        )
//
//)
//```
