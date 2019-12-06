<?php
header("Access-Control-Allow-Origin: *");
require 'vendor/autoload.php';
use App\QuickPoll;

$res = preg_replace('/\D/', '', filter_input(INPUT_GET, 'res', FILTER_SANITIZE_NUMBER_INT)); 
echo (new QuickPoll)->putAnswers($res);