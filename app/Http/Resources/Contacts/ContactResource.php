<?php

namespace App\Http\Resources\Contacts;

use App\Http\Resources\Users\UserResourse;
use App\Model\Users\User;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
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
            'user' => new UserResourse(User::find($this->contact_id)),
        ];
    }
}
