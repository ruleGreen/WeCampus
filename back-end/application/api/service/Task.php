<?php
/**
 * Created by PhpStorm.
 * User: 30222
 * Date: 2017/11/30
 * Time: 10:37
 */

namespace app\api\service;

use app\api\model\Task as TaskModel;
use app\lib\exception\TaskException;

class Task
{
    public function JudgeTaskStatus($taskno)
    {
        $task = TaskModel::getByTaskNo($taskno);

        if(!$task)
        {
            throw new TaskException();
        }
        else
        {
            if($task->status != 1)
            {
                throw new TaskException([
                    'msg' => '任务已被接或删除',
                    'errorCode' => '60002'
                ]);
            }
            else
            {
                //修改数据表
                //首先将task表中的status状态置1
                //然后在order表中新增一条数据
                return ;
            }
        }
    }
}