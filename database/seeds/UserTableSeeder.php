<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'zk',
            'pwd' => 'ae7b7c53c828f59efc0f1e07a1af72d5'
        ]);
        DB::table('users')->insert([
            'name' => 'lss',
            'pwd' => '4ee4ea3d0591f335b48c1637917bbcbd'
        ]);
        DB::table('users')->insert([
            'name' => 'ly',
            'pwd' => 'e728b47751c6555942cb60f97d1e4553'
        ]);
    }
}
