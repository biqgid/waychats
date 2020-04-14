<?php

namespace App\Http\Resources\Adverts;

use Illuminate\Http\Resources\Json\JsonResource;

class CarResource extends JsonResource
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
            'tonnage' => $this->tonnage,
            'description' => $this->description,
            'status' => $this->status,
        ];
    }
}
