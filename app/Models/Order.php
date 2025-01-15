<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public function pizzas()
    {
        return $this->belongsToMany(Pizza::class, 'order_pizzas')->withPivot('quantity');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id', // Add this
        'total_price', // Add any other attributes being assigned
    ];
}
