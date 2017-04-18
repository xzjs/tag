<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * 登录
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function login(Request $request){
        $user=User::where('name',$request->name)->where('pwd',md5($request->pwd))->first();
        if($user){
            return response()->json($user);
        }else{
            return response('false');
        }
    }
}
