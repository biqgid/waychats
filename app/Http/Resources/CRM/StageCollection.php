<?php

namespace App\Http\Resources\CRM;

use Illuminate\Http\Resources\Json\ResourceCollection;

class StageCollection extends ResourceCollection
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
            'data' => StageResource::collection($this->collection),
            'section' => 'Этапы сделок',
        ];
    }
}
