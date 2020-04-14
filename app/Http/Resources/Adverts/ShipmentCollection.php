<?php

namespace App\Http\Resources\Adverts;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ShipmentCollection extends ResourceCollection
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
            'data' => ShipmentResource::collection($this->collection),
            'section' => 'Грузы',
        ];
    }
}
