<?php
/**
 * Created by PhpStorm.
 * User: 30222
 * Date: 2017/11/24
 * Time: 17:27
 */

namespace app\api\service;


use app\lib\enum\ScopeEnum;
use app\lib\exception\TokenException;
use app\lib\exception\WxChatException;
use think\Exception;
use app\api\model\User as UserModel;

class UserToken extends Token
{
    protected $code;
    protected $wxAppID;
    protected $wxAppSecret;
    protected $wxLoginUrl;

    function __construct($code)
    {
        $this->code = $code;
        $this->wxAppID = config('wx.app_id');
        $this->wxAppSecret = config('wx.app_secret');
        $this->wxLoginUrl = sprintf(config('wx.login_url'),
            $this->wxAppID,$this->wxAppSecret,$this->code);
    }

    public function get()
    {
        $result = curl_get($this->wxLoginUrl);
        $wxresult = json_decode($result,true);

        if(empty($wxresult))
        {
            throw new Exception('获取seesion_key及openid时错误，微信内部异常');
        }
        else
        {
            $loginFail = array_key_exists('errcode',$wxresult);
            if($loginFail)
            {
                $this->processLoginError($wxresult);
            }
            else
            {
                return $this->grantToken($wxresult);
            }
        }
    }

    private function grantToken($wxresult)
    {
        $openid = $wxresult['openid'];

        $user = UserModel::getByOpenID($openid);

        if($user)
        {
            $uid = $user->id;
        }
        else
        {
            $uid = $this->newUser($openid);
        }

        $cachedValue = $this->prepareCachedValue($wxresult,$uid);

        $token = $this->saveToCache($cachedValue);

        return $token;
    }

    private function newUser($openid)
    {
        $user = UserModel::create([
            'openid' => $openid
        ]);

        return $user->id;
    }

    private function prepareCachedValue($wxresult,$uid)
    {
        $cachedValue = $wxresult;
        $cachedValue['uid'] = $uid;
        //权限标记
        $cachedValue['scope'] = ScopeEnum::User;

        return $cachedValue;
    }

    private function saveToCache($cacheValue)
    {
        $key = self::generateToken();
        $value = json_encode($cacheValue);
        $expire_in = config('setting.token_expire_in');

        $request = cache($key,$value,$expire_in);

        if(!$request)
        {
            throw new TokenException([
                'msg' => '服务器缓存异常',
                'errorcode' => 10005
            ]);
        }

        return $key;
    }

    private function processLoginError($wxresult)
    {
        throw new WxChatException([
            'msg' => $wxresult['errmsg'],
            'errorcode' => $wxresult['errcode']
        ]);
    }

}