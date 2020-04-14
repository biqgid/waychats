<?php

namespace App\Http\Resources\CRM;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
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
            'name' => $this->name,
            'data' => $this->data,
            'status' => $this->status,
            'price' => $this->price,
            'currency' => $this->currency,
            'stage' => $this->stage,
            'created_at' => $this->created_at,
        ];
    }
}
