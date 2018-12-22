<?php
/**
 * Created by PhpStorm.
 * User: 30222
 * Date: 2017/11/28
 * Time: 9:03
 */

namespace app\api\controller\v1;


use app\api\controller\BaseController;
use app\api\validate\TaskValidate;

class Task extends BaseController
{
    public function taketask($taskNo)
    {
        //操作流程
        //验证taskno是否合法
        //验证task现在的状态，如果是非1状态，接单失败，如果是1状态接单成功
        //接单成功后改变修改数据库
        (new TaskValidate()) -> goCheck();

        if($taskNo == '1234123')
        {
            return 'error';
        }

        return $taskNo;
    }
}