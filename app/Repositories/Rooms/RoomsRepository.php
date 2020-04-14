<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 14.05.2019
 * Time: 16:43
 */

namespace App\Repositories\Rooms;


use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\Resource;

interface RoomsRepository
{
    /**
     * @return Collection
     */
    public function all(): Collection;

    /**
     * @return Resource
     */
    public function findRoomById(int $id): Resource;

    /**
     * @return mixed
     */
    public function getRoomUsers();

    /**
     * @return mixed
     */
    public function getRoomUserMessages();

}
