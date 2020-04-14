<?php

namespace App\Http\Resources\RouteList;

use App\Http\Resources\Adverts\CarCollection;
use App\Http\Resources\Adverts\CarResource;
use App\Http\Resources\Adverts\ShipmentResource;
use App\Http\Resources\Contacts\ContactCollection;
use App\Http\Resources\Users\UserResourse;
use App\Model\Users\User;
use Illuminate\Http\Resources\Json\JsonResource;

class RouteListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'location' => $this->location,
            'intermediate' => $this->intermediate,
            'destination' => $this->destination,
            'distance' => $this->distance,
            'price' => $this->price,
            'description' => $this->description,
            'loading_data' => $this->loading_data,
            'unloading_data' => $this->unloading_data,
            'user' => new UserResourse(User::find($this->user_id)),
            'cars' => new CarResource($this->cars),
            'shipment' => new ShipmentResource($this->shipment),
            'created' => $this->created_at,
        ];
    }
}
