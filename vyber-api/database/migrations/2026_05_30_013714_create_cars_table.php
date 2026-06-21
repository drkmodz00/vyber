<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('subtitle');
            $table->string('category');
            $table->string('price');
            $table->integer('horsepower');
            $table->decimal('zero_sixty', 3, 1);
            $table->string('top_speed');
            $table->string('model_url');
            $table->string('color_accent')->default('#00d4ff');
            $table->integer('sort_order')->default(0); 
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};