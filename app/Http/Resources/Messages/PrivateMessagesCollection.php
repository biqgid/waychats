<?php

namespace App\Http\Resources\Messages;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PrivateMessagesCollection extends ResourceCollection
{

    /**
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function toArray($request)
    {
        return PrivateMessagesResource::collection($this->collection);
    }
}
