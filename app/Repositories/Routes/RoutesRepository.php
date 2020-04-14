<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 02.05.2019
 * Time: 11:26
 */

namespace App\Repositories\Routes;


use Illuminate\Database\Eloquent\Collection;

interface RoutesRepository
{
    public function search(string $query = ""): Collection;
}
