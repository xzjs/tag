<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    public function tags(){
        return $this->hasMany('App\Tag');
    }

    protected $fillable = ['content'];
}
