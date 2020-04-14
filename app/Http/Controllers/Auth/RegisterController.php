<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\Users\UserRequest;
use Illuminate\Support\Facades\Hash;
use App\Model\Users\User;
use App\Http\Controllers\Controller;

class RegisterController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }



    protected function register(UserRequest $request) {

        $userKey = '#'.substr(number_format(time() * mt_rand(),0,'',''),0,11);

        $user = User::create([
            'user_key' => $userKey,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['user' => $user]);
    }
}
