<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 02.05.2019
 * Time: 10:18
 */

namespace App\Repositories\Adverts;


use Illuminate\Database\Eloquent\Collection;

interface CarsRepository
{
    public function search(string $query = ""): Collection;
}
