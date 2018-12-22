<?php
/**
 * Created by PhpStorm.
 * User: 30222
 * Date: 2017/11/28
 * Time: 9:13
 */

namespace app\api\validate;


class TaskValidate extends BaseValidate
{
    protected $rule = [
        'taskNo' => 'require'
    ];

    protected $message = [
        'taskNo' => '任务号不能为空'
    ];
}