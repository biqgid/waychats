<?php

namespace App\Http\Resources\Messages;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PublicMessageCollection extends ResourceCollection
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
            'data' => PublicMessageResource::collection($this->collection),
            'section' => 'Все сообщения',
        ];
    }
}
