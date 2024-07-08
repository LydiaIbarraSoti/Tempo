<?php
    require 'variables_globales.php';
    //$nombreDBMaster = "soticomm_VIDO_FDA1";
    // if (isset($_POST["CLIENTE"])) {
    //     crearDB($_POST["CLIENTE"]);
    // }
    


    function exec_curl($url, $user, $token) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: cpanel $user:$token"
        ]);
    
        // Especifica la ruta al archivo cacert.pem
        curl_setopt($ch, CURLOPT_CAINFO, __DIR__ . '/cacert.pem');
    
        $result = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if (curl_errno($ch)) {
            $error = curl_error($ch);
            curl_close($ch);
            return ['success' => false, 'error' => $error, 'result' => null, 'http_code' => $http_code];
        }
        curl_close($ch);
        return ['result' => $result, 'http_code' => $http_code];
    } 



    function crearDB($dbnombre) {
        global $cpanel_user, $cpanel_token, $cpanel_host, $existing_username, $existing_password, $servername, $nom_db;
    
        $errores = "";
        $response_data = []; // Array to collect all the response data
    
        // Obtener el nombre de la base de datos
        $dbName = nombreDB($dbnombre);
        $nom_db = $dbName;
        //$nombreDBMaster = $dbName;
        $response_data['dbName'] = $dbName;
        //echo $dbName;
    
        // Crear la base de datos usando UAPI
        $url = "https://$cpanel_host:2083/execute/Mysql/create_database?name=$dbName";
        $response = exec_curl($url, $cpanel_user, $cpanel_token);
    
        if (isset($response['error']) && $response['error']) {
            $response_data['success'] = false;
            $response_data['error'] = "cURL Error: " . $response['error'];
            return json_encode($response_data);
        }
    
        if ($response['http_code'] == 403) {
            $response_data['success'] = false;
            $response_data['error'] = "Acceso denegado. Verifica los permisos del token de API.";
            return json_encode($response_data);
        }
    
        $result = json_decode($response['result'], true);
    
        if ($result === null) {
            $response_data['success'] = false;
            $response_data['error'] = 'Error decodificando respuesta JSON: ' . json_last_error_msg();
            return json_encode($response_data);
        }
    
        if (!(isset($result['status']) && $result['status'] === 1)) {
            $errorMessage = isset($result['errors'][0]['message']) ? $result['errors'][0]['message'] : 'Error No esta signado la base de datos';
            $response_data['success'] = false;
            $response_data['error'] = $errorMessage;
            return json_encode($response_data);
        }
    
        // Asignar privilegios al usuario de la base de datos usando UAPI
        $url = "https://$cpanel_host:2083/execute/Mysql/set_privileges_on_database?user=$existing_username&database=$dbName&privileges=ALL";
        $response = exec_curl($url, $cpanel_user, $cpanel_token);
    
        if (isset($response['error']) && $response['error']) {
            $response_data['success'] = false;
            $response_data['error'] = "cURL Error: " . $response['error'];
            return json_encode($response_data);
        }
    
        if ($response['http_code'] == 403) {
            $response_data['success'] = false;
            $response_data['error'] = "Acceso denegado. Verifica los permisos del token de API.";
            return json_encode($response_data);
        }
    
        $result = json_decode($response['result'], true);
    
        if ($result === null) {
            $response_data['success'] = false;
            $response_data['error'] = 'Error decodificando respuesta JSON: ' . json_last_error_msg();
            return json_encode($response_data);
        }
    
        $conn = new mysqli($servername, $existing_username, $existing_password, $dbName);
    
        if ($conn->connect_error) {
            $response_data['success'] = false;
            $response_data['error'] = "Conexión fallida: " . $conn->connect_error;
            return json_encode($response_data);
        }
    
        $filename = __DIR__ . '/soticomm_VIDO.sql'; // Usamos __DIR__ para obtener la ruta absoluta
        $response_data = array();

        if (file_exists($filename)) {
            $sql = file_get_contents($filename);
            
            if ($sql === false) {
                $response_data['success'] = false;
                $response_data['error'] = "Error al leer el archivo $filename";
            }
        } else {
            $response_data['success'] = false;
            $response_data['error'] = "El archivo $filename no existe";
        }
        // echo json_encode($response_data);
        
    
        $sql = str_replace('soticomm_VIDO_SOTI', $dbName, $sql);
        $sql_commands = explode(';', $sql);
    
        foreach ($sql_commands as $command) {
            $command = trim($command);
            if (!empty($command)) {
                if ($conn->query($command) === FALSE) {
                    $errores .= $conn->error . "\n";
                }
            }
        }
    
        if (!empty($errores)) {
            $response_data['success'] = true;
            $response_data['error'] = 'Error al ejecutar los comandos SQL: ' . $errores;
            $conn->close();
            return json_encode($response_data);
        }
    
        $conn->close();
    
        $response_data['success'] = true;
        return json_encode($response_data);
    }    
    function nombreDB($cliente)
    {
        $cli = claveCliente($cliente);
        conexion_cliente();
        $nom = "soticomm_VIDO_".$cli;
        return $nom;
    }
    function claveCliente($nombreC)
    {
        $cont = 0;
        $clave = "";
        // Convertir la cadena a mayúsculas y eliminar caracteres no deseados
        $nombreC = strtoupper(preg_replace('/[^a-zA-Z0-9\s]/', '', $nombreC));

        // Obtener la longitud de la cadena
        $length = strlen($nombreC);

        // Obtener el primer carácter limpio de la cadena como parte de la clave
        if ($length > 0) {
            $clave .= $nombreC[0];
        }

        // Construir la clave usando el primer carácter después de cada espacio
        for ($i = 0; $i < $length - 1; $i++) {
            if ($nombreC[$i] == " " && isset($nombreC[$i + 1])) {
                $clave .= $nombreC[$i + 1];
            }
        }

        conexion_cliente();
        $claveArray = [];
        $stmt = $GLOBALS['db']->prepare("SELECT CLAVE FROM CLIENTES");
        if ($stmt === false) {
            die('Error al preparar la consulta: ' . $GLOBALS['db']->error);
        }
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado === false) {
            die('Error al ejecutar la consulta: ' . $stmt->error);
        }
        // Insertar los resultados en el array
        while ($fila = $resultado->fetch_assoc()) {
            $claveArray[] = $fila['CLAVE'];
        }
        // Cerrar la consulta preparada
        $stmt->close();

        $oClave = $clave;
        foreach($claveArray as $claveArr){
            while($claveArr == $clave)
            {
                $cont++;
                //$clave = $clave . $cont;
                $clave = $oClave . $cont;
            }
        }
        return $clave;
    }

?>