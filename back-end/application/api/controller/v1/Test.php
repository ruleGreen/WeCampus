<?php
/**
 * Created by PhpStorm.
 * User: 30222
 * Date: 2017/11/29
 * Time: 23:15
 */

namespace app\api\controller\v1;

use app\api\validate\IDMustBePositiveInt;

class Test
{
    public function Test()
    {
        (new IDMustBePositiveInt())->goCheck();

        return 'test';
    }
}