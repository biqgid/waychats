<?php

namespace App\Http\Resources\Messages;

use App\Http\Resources\Users\UserResourse;
use App\Model\Users\User;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicMessageResource extends JsonResource
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
            'views' => $this->views,
            'bookmarks' => $this->bookmarks,
            'content' => $this->content,
            'selfMessage' => $this->selfMessage,
            'created_at' => $this->created_at,
            'user' => new UserResourse(User::find($this->user_id)),
        ];
    }
}
