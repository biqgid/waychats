<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 02.05.2019
 * Time: 11:27
 */

namespace App\Repositories\Users;

use App\Model\Users\User;
use Illuminate\Database\Eloquent\Collection;

class EloquentUsersRepository implements UsersRepository
{
    /**
     * @param string $query
     * @return Collection
     */
    public function search($query = ""): Collection
    {
        $data = User::where('name', 'like', "%{$query}%")
            ->orWhere('phone', 'like', "%{$query}%")
            ->orWhere('email', 'like', "%{$query}%")
            ->orWhere('user_key', 'like', "%{$query}%")
            ->get();

        return $data;
    }
}
