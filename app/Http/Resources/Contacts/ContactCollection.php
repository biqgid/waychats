<?php

namespace App\Http\Resources\Contacts;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ContactCollection extends ResourceCollection
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
            'data' => ContactResource::collection($this->collection),
            'section' => 'контакты',
        ];
    }
}
