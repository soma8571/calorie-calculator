<?php

function newFood($vars, $body) {
    if (isset($body) && !empty($body)) {
        $insert = "INSERT INTO foods (food_name, protein_content, fat_content, ch_content, calories) VALUES (?, ?, ?, ?, ?)";
        $pdo = getConnection();
        $stmt = $pdo->prepare($insert);
        $stmt->execute([
            $body["food_name"],
            $body["protein_content"],
            $body["fat_content"],
            $body["ch_content"],
            $body["calories"]
        ]);
        if ($stmt->rowCount() > 0)
            echo json_encode(["msg" => "Az étel mentése sikeres volt."]);
        else
            echo json_encode(["msg" => "Hiba. Az étel mentése sikertelen volt."]);
        return;
    }
    echo json_encode(["msg" => "Hiba. Hiányzó adatok."]);  
}

?>