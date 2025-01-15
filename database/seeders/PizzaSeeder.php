<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pizza;

class PizzaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Pizza::create(['name' => 'Margherita', 'description' => 'Classic cheese pizza', 'price' => 8.99]);
        Pizza::create(['name' => 'Pepperoni', 'description' => 'Pepperoni with cheese', 'price' => 10.99]);
        Pizza::create(['name' => 'Veggie', 'description' => 'Loaded with vegetables', 'price' => 9.99]);
    }
}
