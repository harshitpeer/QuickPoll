<?php
header("Access-Control-Allow-Origin: *");
require 'vendor/autoload.php';
use App\QuickPoll;

echo (new QuickPoll)->getQuestions();