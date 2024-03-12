<?php

function newFood($vars, $body) {
    if (isset($body) && !empty($body)) {
        echo json_encode(["msg" => "newfood lefut és van body, food_name: ".$body["food_name"]]);
        return;
    }
    echo json_encode(["msg" => "newfood lefut DE NINCS body"]);      
}

?>