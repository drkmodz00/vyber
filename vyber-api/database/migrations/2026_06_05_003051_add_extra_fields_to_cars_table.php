<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->string('engine')->nullable()->after('top_speed');
            $table->string('transmission')->nullable()->after('engine');
            $table->string('drivetrain')->nullable()->after('transmission');
            $table->string('torque')->nullable()->after('drivetrain');
            $table->integer('seats')->nullable()->after('torque');
            $table->integer('year')->nullable()->after('seats');
            $table->string('color')->nullable()->after('year');
            $table->json('features')->nullable()->after('color');
        });
    }

    public function down(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropColumn([
                'engine', 'transmission', 'drivetrain',
                'torque', 'seats', 'year', 'color', 'features',
            ]);
        });
    }
};