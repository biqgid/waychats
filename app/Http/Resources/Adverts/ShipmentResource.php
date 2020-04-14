<?php

namespace App\Http\Resources\Adverts;

use Illuminate\Http\Resources\Json\JsonResource;

class ShipmentResource extends JsonResource
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
            'model' => $this->model,
            'carcass' => $this->carcass,
            'width' => $this->width,
            'height' => $this->height,
            'weight' => $this->weight,
            'length' => $this->length,
        ];
    }
}
