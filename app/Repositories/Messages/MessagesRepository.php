<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 02.05.2019
 * Time: 11:25
 */

namespace App\Repositories\Messages;


use Illuminate\Database\Eloquent\Collection;

interface MessagesRepository
{
    public function search(string $query = ""): Collection;
}
