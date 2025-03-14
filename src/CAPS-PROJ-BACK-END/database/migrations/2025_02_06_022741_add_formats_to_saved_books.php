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
        Schema::table('saved_books', function (Blueprint $table) {
            $table->string('read_format')->nullable()->after('cover');
            $table->string('download_format')->nullable()->after('read_format');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('saved_books', function (Blueprint $table) {
            //$table->dropColumn(['read_format', 'download_format']);
        });
    }
};
