<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 02.05.2019
 * Time: 11:26
 */

namespace App\Repositories\Messages;

use App\Model\Message\PublicMessage;
use Illuminate\Database\Eloquent\Collection;

class EloquentMessagesRepository implements MessagesRepository
{
    /**
     * @param string $query
     * @return Collection
     */
    public function search(string $query = ""): Collection
    {
        $data = PublicMessage::where('content', 'like', "%{$query}%")
            ->get();

        return $data;
    }
}
