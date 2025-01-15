<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pizza extends Model
{
    protected $fillable = ['name', 'ingredients', 'price', 'image_url'];

}
