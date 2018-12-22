<?php
/**
 * Created by PhpStorm.
 * User: 30222
 * Date: 2017/11/30
 * Time: 10:34
 */

namespace app\api\model;


class Task extends BaseModel
{
    public static function getByTaskNo($taskno)
    {
        $task = self::where('taskno','=',$taskno)
                    ->find();

        return $task;
    }
}