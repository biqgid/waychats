<?php

namespace App\Http\Resources\Users;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResourse extends JsonResource
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
            'user_key' => $this->user_key,
            'phone' => $this->phone,
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => $this->avatar
        ];
    }
}
