<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 02.05.2019
 * Time: 11:24
 */

namespace App\Repositories\Contacts;


use Illuminate\Database\Eloquent\Collection;

interface ContactsRepository
{
    public function search(string $query = ""): Collection;
}
