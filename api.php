<?php
// api.php - Backend PHP para HostGator
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Configuração do banco de dados HostGator
$host = 'localhost';
$dbname = 'admin_loja_loja_salles'; // Formato HostGator: usuario_dbname
$username = 'admin_loja';
$password = 'SUA_SENHA_AQUI'; // Substitua pela sua senha

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro de conexão: ' . $e->getMessage()]);
    exit;
}

// Obter método e URL
$method = $_SERVER['REQUEST_METHOD'];
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);
$path = str_replace('/api/', '', $path);

// Roteamento
switch($method) {
    case 'GET':
        handleGet($path, $pdo);
        break;
    case 'POST':
        handlePost($path, $pdo);
        break;
    case 'PUT':
        handlePut($path, $pdo);
        break;
    case 'DELETE':
        handleDelete($path, $pdo);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
}

// Funções de roteamento
function handleGet($path, $pdo) {
    switch($path) {
        case 'test':
            echo json_encode(['success' => true, 'message' => 'Conexão OK']);
            break;
            
        case 'products':
            $stmt = $pdo->query("SELECT * FROM products ORDER BY category, model");
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['products' => $products]);
            break;
            
        case 'users':
            $stmt = $pdo->query("SELECT * FROM users ORDER BY username");
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['users' => $users]);
            break;
            
        case 'settings':
            $stmt = $pdo->query("SELECT * FROM settings");
            $settings = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $result = [];
            foreach($settings as $setting) {
                $result[$setting['setting_key']] = $setting['setting_value'];
            }
            echo json_encode(['settings' => $result]);
            break;
            
        case 'backup':
            $backup = [
                'products' => $pdo->query("SELECT * FROM products")->fetchAll(PDO::FETCH_ASSOC),
                'users' => $pdo->query("SELECT * FROM users")->fetchAll(PDO::FETCH_ASSOC),
                'settings' => $pdo->query("SELECT * FROM settings")->fetchAll(PDO::FETCH_ASSOC),
                'timestamp' => date('Y-m-d H:i:s')
            ];
            echo json_encode(['backup' => $backup]);
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint não encontrado']);
    }
}

function handlePost($path, $pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    switch($path) {
        case 'products':
            $stmt = $pdo->prepare("INSERT INTO products (category, model, storage, ram, color, price, quantity, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $input['category'],
                $input['model'],
                $input['storage'],
                $input['ram'],
                $input['color'],
                $input['price'],
                $input['quantity'],
                $input['status']
            ]);
            echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
            break;
            
        case 'products/import':
            $pdo->beginTransaction();
            try {
                // Limpar produtos existentes
                $pdo->exec("DELETE FROM products");
                
                // Inserir novos produtos
                $stmt = $pdo->prepare("INSERT INTO products (category, model, storage, ram, color, price, quantity, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                foreach($input['products'] as $product) {
                    $stmt->execute([
                        $product['category'],
                        $product['model'],
                        $product['storage'],
                        $product['ram'],
                        $product['color'],
                        $product['price'],
                        $product['quantity'],
                        $product['status']
                    ]);
                }
                $pdo->commit();
                echo json_encode(['success' => true, 'count' => count($input['products'])]);
            } catch(Exception $e) {
                $pdo->rollback();
                throw $e;
            }
            break;
            
        case 'users':
            $stmt = $pdo->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $input['username'],
                $input['email'],
                $input['password'],
                $input['role']
            ]);
            echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
            break;
            
        case 'settings':
            foreach($input as $key => $value) {
                $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?");
                $stmt->execute([$key, $value, $value]);
            }
            echo json_encode(['success' => true]);
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint não encontrado']);
    }
}

function handlePut($path, $pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    $pathParts = explode('/', $path);
    
    switch($pathParts[0]) {
        case 'products':
            $id = $pathParts[1];
            $fields = [];
            $values = [];
            
            foreach($input as $key => $value) {
                $fields[] = "$key = ?";
                $values[] = $value;
            }
            $values[] = $id;
            
            $sql = "UPDATE products SET " . implode(', ', $fields) . " WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($values);
            echo json_encode(['success' => true]);
            break;
            
        case 'users':
            if($pathParts[1] === 'password') {
                $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE username = ?");
                $stmt->execute([$input['password'], $input['username']]);
                echo json_encode(['success' => true]);
            } else {
                $id = $pathParts[1];
                $fields = [];
                $values = [];
                
                foreach($input as $key => $value) {
                    $fields[] = "$key = ?";
                    $values[] = $value;
                }
                $values[] = $id;
                
                $sql = "UPDATE users SET " . implode(', ', $fields) . " WHERE id = ?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute($values);
                echo json_encode(['success' => true]);
            }
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint não encontrado']);
    }
}

function handleDelete($path, $pdo) {
    $pathParts = explode('/', $path);
    
    switch($pathParts[0]) {
        case 'products':
            $id = $pathParts[1];
            $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
            break;
            
        case 'users':
            $id = $pathParts[1];
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint não encontrado']);
    }
}
?>
