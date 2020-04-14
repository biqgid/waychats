<?php

namespace App\Http\Controllers\Users;

use App\Http\Resources\Users\UserResourse;
use App\Model\Users\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * @param $id
     * @return UserResourse
     */
    public function user($id) {
        return new UserResourse(User::find($id));
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        $query = $request['query'];
        $users = User::where('phone', 'like', '%' . $query . '%')->get();
        return response()->json($users);
    }
}
