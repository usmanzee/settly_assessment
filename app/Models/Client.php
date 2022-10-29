<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_id',
        'name',
        'email',
        'image',
    ];

    /**
     * Append Value
     */
    protected $appends = ['image_url'];

    /**
     * Custom Accessor
     */
    protected function imageUrl(): Attribute {
        return new Attribute(
            get: fn () => Request()->getSchemeAndHttpHost() . '/images/clients/' . $this->image,
        );
    }
}
