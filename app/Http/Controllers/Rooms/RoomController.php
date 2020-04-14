<?php

namespace App\Http\Controllers\Rooms;

use App\Events\Messenger\PrivateMessages;
use App\Model\Message\Message;
use App\Model\Message\PrivateMessage;
use App\Model\Message\Room;
use App\Model\Users\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RoomController extends Controller
{
    public function getRooms() {

    }

    public function getRoomUser() {

    }

    /**
     * @param $room_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRoomMessages($room_id) {
        $data = Room::find($room_id);
        return response()->json($data->privateMessages);
    }

    /**
     * @param Request $request
     * @param $room_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function addRoomMessages(Request $request, $room_id) {
        $data = $request->user()->private_messages()->create($request->all());
        broadcast(new PrivateMessages($data))->toOthers();

        return response()->json($data);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addNewRoom(Request $request) {
        $room = Room::create([
            'name' => 'new room '. $request->user_id,
            'user_one' => $request->user()->id,
            'user_two' => $request->user_id,
        ]);

        $request->user()->rooms()->attach($room->id);

        $user = User::find($request->user_id);

        $user->rooms()->attach($room->id);

        $data = $request->user()->private_messages()->create([
            'message' => $request->message,
            'status' => $request->status,
            'room_id' => $room->id,
        ]);


        broadcast(new PrivateMessages($data))->toOthers();

        return response()->json($data);
    }
}
