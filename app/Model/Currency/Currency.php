<?php

namespace App\Model\Currency;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $guarded = [];

    //protected $appends = ['courses'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function course() {
        return $this->hasMany(Course::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getCoursesAttribute()
    {
        return $this->course();
    }
}
