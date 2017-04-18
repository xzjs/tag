<?php

use Illuminate\Database\Seeder;

class ArticleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $arr=['leiphone.com','baijia.baidu.com','toutiao.io'];
        for($i=0;$i<300;$i++){
            $r=rand(0,2);
            DB::table('articles')->insert([
                'href'=>'http://baidu.com',
                'title'=>'百度',
                'source'=>$arr[$r],
                'releasedate'=>date('Y-m-d H:i:s')
            ]);
        }
    }
}
