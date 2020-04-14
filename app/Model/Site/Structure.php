<?php

namespace App\Model\Site;

use App\Model\Users\User;
use Illuminate\Database\Eloquent\Model;

class Structure extends Model
{
    protected $fillable = ['structure'];

    protected $casts = [
        'structure' => 'array',
    ];
}
