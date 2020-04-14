<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 02.05.2019
 * Time: 11:26
 */

namespace App\Repositories\Routes;

use App\Model\Routes\RouteList;
use Illuminate\Database\Eloquent\Collection;

class EloquentRoutesRepository implements RoutesRepository
{
    /**
     * @param string $query
     * @return Collection
     */
    public function search(string $query = ""): Collection
    {
        $data = RouteList::where('location', 'like', "%{$query}%")
            ->orWhere('destination', 'like', "%{$query}%")
            ->orWhere('intermediate', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->get();

        return $data;
    }
}
