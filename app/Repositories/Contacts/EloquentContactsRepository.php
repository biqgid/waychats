<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 02.05.2019
 * Time: 11:25
 */

namespace App\Repositories\Contacts;


use App\Model\Users\Contact;
use Illuminate\Database\Eloquent\Collection;

class EloquentContactsRepository implements ContactsRepository
{
    /**
     * @param string $query
     * @return Collection
     */
    public function search(string $query = ""): Collection
    {
        $data = Contact::where('name', 'like', "%{$query}%")
            ->orWhere('surname', 'like', "%{$query}%")
            ->get();

        return $data;
    }
}
