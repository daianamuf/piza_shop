<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create the order_pizzas table
        Schema::create('order_pizzas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade'); // Reference to orders table
            $table->foreignId('pizza_id')->constrained()->onDelete('cascade'); // Reference to pizzas table
            $table->integer('quantity')->default(1); // Quantity of pizzas
            $table->timestamps(); // Created at and updated at timestamps
        });

        // Add the pizzas JSON column to the orders table
        Schema::table('orders', function (Blueprint $table) {
            $table->json('pizzas')->nullable()->after('total_price'); // Add JSON column to store pizzas
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the order_pizzas table
        Schema::dropIfExists('order_pizzas');

        // Remove the pizzas column from the orders table
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('pizzas');
        });
    }
};
