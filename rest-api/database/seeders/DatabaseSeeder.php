<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Student::create([
            'name' => 'Arif Widagdo',
            'username' => 'arif_widagdo',
            'email' => 'arifwidagdo24@gmail.com',
            'password' => Hash::make('password'),
        ]);
        \App\Models\Student::factory(25)->create();
    }
}
