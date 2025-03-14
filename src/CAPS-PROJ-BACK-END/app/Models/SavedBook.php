<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedBook extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'book_id', 'title', 'author', 'cover', 'download_count', 'read_format', 'download_format'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
