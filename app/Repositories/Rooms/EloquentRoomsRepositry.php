<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 14.05.2019
 * Time: 16:44
 */

namespace App\Repositories\Rooms;


use App\Model\Message\Room;
use App\Repositories\Routes\RoutesRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\Resource;

class EloquentRoomsRepositry implements RoomsRepository
{
    /**
     * @return Room[]|\Illuminate\Database\Eloquent\Collection
     */
    public function all(): Collection {
        return Room::all();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function findRoomById($id): Resource {
        return Room::find($id);
    }

    /**
     * @return mixed
     */
    public function getRoomUsers() {
        return Room::where('user_one', auth()->user()->id)->get();
    }

    public function getRoomUserMessages($id) {
        $messages = Room::whre('user_one', auth()->user()->id)->where('user_two', $id)->first();
        return $messages->privateMessages;
    }
}
