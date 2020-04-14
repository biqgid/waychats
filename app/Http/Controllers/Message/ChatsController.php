<?php

namespace App\Http\Controllers\Message;

use App\Http\Resources\Contacts\ContactCollection;
use App\Http\Resources\Rooms\RoomCollection;
use App\Model\Message\PrivateMessage;
use App\Model\Users\Contact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class ChatsController extends Controller
{
    /**
     * ChatsController constructor.
     */
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index() {
        return response()->json(new RoomCollection(auth()->user()->rooms));
    }

}
