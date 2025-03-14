<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReadingHistory extends Model
{
    use HasFactory;

    protected $table = 'reading_history';

    protected $fillable = [
        'user_id', 'book_id', 'title', 'author', 'cover', 'download_count', 
        'read_format', 'download_format'
    ];

    public $timestamps = true;
}
