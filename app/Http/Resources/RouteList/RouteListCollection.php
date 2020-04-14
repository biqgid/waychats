<?php

namespace App\Http\Resources\RouteList;

use Illuminate\Http\Resources\Json\ResourceCollection;

class RouteListCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => RouteListResource::collection($this->collection),
            'section' => 'Рейсы',
        ];
    }
}
