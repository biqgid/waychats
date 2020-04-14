<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 02.05.2019
 * Time: 11:27
 */

namespace App\Repositories\Users;


use Illuminate\Database\Eloquent\Collection;

interface UsersRepository
{
    public function search($query = ""): Collection;
}
