<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 02.05.2019
 * Time: 10:20
 */

namespace App\Repositories\Adverts;


use App\Model\Adverts\Car;
use Illuminate\Database\Eloquent\Collection;

class EloquentCarsRepository implements CarsRepository
{
    /**
     * @param string $query
     * @return Collection
     */
    public function search(string $query = ""): Collection
    {
        $data = Car::where('model', 'like', "%{$query}%")
            ->orWhere('carcass', 'like', "%{$query}%")
            ->get();

        return $data;
    }
}
