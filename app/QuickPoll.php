<?php
 
namespace App;

use PDO;
use App\SQLiteConnection;

class QuickPoll {

    public function getQuestions() {
        $data = explode("\n", file_get_contents("data.txt"));
        $return = array();
        $return["question"] = array_shift($data);
        $return["answers"] = array();
        foreach($data as $key => $value) {
            $return["answers"][$key] = $value;
        }
        return json_encode($return);
    }

    public function putAnswers($res) {
        try {
            $pdo = (new SQLiteConnection())->connect();
            $create = "
            CREATE TABLE responses (
                res INTEGER,
                ip VARCHAR(255) UNIQUE
            )
            ";
            $pdo->exec($create);
            $ip = $this->get_client_ip();
            $pdo->exec("INSERT INTO responses('res', 'ip') VALUES (".$res.",'".$ip."')");
            $select = $pdo->query("SELECT res, count(*) AS `votes` FROM responses GROUP by res");
            $total = $pdo->query("SELECT count(*) AS `total` FROM responses");
            $total_votes = $total->fetch();
            $total_votes = $total_votes['total'];
            $votes = $select->fetchAll(PDO::FETCH_CLASS);
            $data = explode("\n", file_get_contents("data.txt"));
            $result = array();
            for($i=0; $i<count($data)-1; $i++) {
                $result[$i] = 0;
            }
            foreach($votes as $vote) {
                $result[intval($vote->res)] = round(intval($vote->votes) / intval($total_votes) * 100);
            }
            return json_encode($result);
        } catch(PDOException $e) {
            return $e->getMessage();
        }
    }

    private function get_client_ip() {
        $ipaddress = '';
        if (getenv('HTTP_CLIENT_IP'))
            $ipaddress = getenv('HTTP_CLIENT_IP');
        else if(getenv('HTTP_X_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        else if(getenv('HTTP_X_FORWARDED'))
            $ipaddress = getenv('HTTP_X_FORWARDED');
        else if(getenv('HTTP_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        else if(getenv('HTTP_FORWARDED'))
           $ipaddress = getenv('HTTP_FORWARDED');
        else if(getenv('REMOTE_ADDR'))
            $ipaddress = getenv('REMOTE_ADDR');
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }

}