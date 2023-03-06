<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Student extends Authenticatable
{
    // use HasFactory;
    // use HasApiTokens, HasFactory, Notifiable;

    // protected $fillable = [
    //     'name',
    //     'username',
    //     'email',
    //     'password',
    // ];

    // protected $hidden = [
    //     'password',
    // ];

    use HasApiTokens, HasFactory;
    protected $guarded = [
        'id',
        'created_at',
        'updated_at'
    ];
}
