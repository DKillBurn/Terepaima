<?php
try {
    $dsn='mysql:host=localhost;dbname=terepaima_db';
    $username='news_reader';
    $passwd='news_reader_hidden';
    $conn=new PDO($dsn, $username, $passwd);
} catch (Exception $exc) {
   $conn=null;
}
