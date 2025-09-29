<?php
// configurar-hostgator.php
// Script de configuração automática para HostGator

echo "<h1>🚀 Configuração Automática HostGator</h1>";
echo "<p>Configurando banco de dados e inserindo dados iniciais...</p>";

// Configuração do banco de dados
$host = 'localhost';
$dbname = 'admin_loja_loja_salles'; // Formato HostGator
$username = 'admin_loja';
$password = 'SUA_SENHA_AQUI'; // SUBSTITUA PELA SUA SENHA

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<p>✅ Conexão com banco estabelecida!</p>";
    
    // Criar tabelas
    echo "<p>📱 Criando tabelas...</p>";
    
    $sql = "
    CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(50) NOT NULL,
        model VARCHAR(100) NOT NULL,
        storage VARCHAR(20),
        ram VARCHAR(20),
        color VARCHAR(30),
        price DECIMAL(10,2) NOT NULL,
        quantity INT DEFAULT 0,
        status VARCHAR(20) DEFAULT 'disponivel',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'funcionaria',
        last_login TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(50) UNIQUE NOT NULL,
        setting_value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    ";
    
    $pdo->exec($sql);
    echo "<p>✅ Tabelas criadas com sucesso!</p>";
    
    // Inserir usuários padrão
    echo "<p>👥 Inserindo usuários padrão...</p>";
    
    $users = [
        ['admin', 'admin@sallesinformatica.com', 'admin123', 'admin'],
        ['funcionaria1', 'func1@sallesinformatica.com', 'func123', 'funcionaria'],
        ['funcionaria2', 'func2@sallesinformatica.com', 'func123', 'funcionaria'],
        ['vendedora', 'vend@sallesinformatica.com', 'vend123', 'funcionaria']
    ];
    
    $stmt = $pdo->prepare("INSERT IGNORE INTO users (username, email, password, role) VALUES (?, ?, ?, ?)");
    foreach($users as $user) {
        $stmt->execute($user);
        echo "<p>✅ Usuário {$user[0]} inserido</p>";
    }
    
    // Inserir configurações
    echo "<p>⚙️ Inserindo configurações...</p>";
    
    $settings = [
        ['installment_rates', '{"mastercard":[1.5,2.0,2.5,3.0,3.5,4.0,4.5,5.0,5.5,6.0,6.5,7.0],"others":[2.0,2.5,3.0,3.5,4.0,4.5,5.0,5.5,6.0,6.5,7.0,7.5]}'],
        ['site_title', 'Salles Informática'],
        ['currency', 'BRL'],
        ['domain', 'sallesinformatica.com']
    ];
    
    $stmt = $pdo->prepare("INSERT IGNORE INTO settings (setting_key, setting_value) VALUES (?, ?)");
    foreach($settings as $setting) {
        $stmt->execute($setting);
        echo "<p>✅ Configuração {$setting[0]} inserida</p>";
    }
    
    // Inserir produtos
    echo "<p>📱 Inserindo produtos...</p>";
    
    $products = [
        ['Redmi', 'A5', '128/4', '4GB', 'preto', 890, 8, 'disponivel'],
        ['Redmi', 'A5', '128/4', '4GB', 'azul', 890, 19, 'disponivel'],
        ['Redmi', 'A5', '128/4', '4GB', 'gold', 890, 14, 'disponivel'],
        ['Redmi', 'A5', '128/4', '4GB', 'verde', 890, 6, 'disponivel'],
        ['Redmi', '13', '128/6', '6GB', 'gold', 1090, 14, 'disponivel'],
        ['Redmi', '13', '128/6', '6GB', 'preto', 1090, 9, 'disponivel'],
        ['Redmi', '13', '128/6', '6GB', 'azul', 1090, 3, 'disponivel'],
        ['Redmi', '13', '128/6', '6GB', 'pink', 1090, 7, 'disponivel'],
        ['Redmi', '13', '256/8', '8GB', 'preto', 1150, 8, 'disponivel'],
        ['Redmi', '13', '256/8', '8GB', 'azul', 1150, 9, 'disponivel'],
        ['Redmi', '13', '256/8', '8GB', 'gold', 1150, 7, 'disponivel'],
        ['Note', '14', '128/6', '6GB', 'preto', 1390, 3, 'disponivel'],
        ['Note', '14', '128/6', '6GB', 'roxo', 1390, 4, 'disponivel'],
        ['Note', '14', '128/6', '6GB', 'gold', 1390, 10, 'disponivel'],
        ['Note', '14', '128/6', '6GB', 'azul', 1390, 8, 'disponivel'],
        ['Note', '14', '256/8', '8GB', 'azul', 1490, 29, 'disponivel'],
        ['Note', '14', '256/8', '8GB', 'verde', 1490, 19, 'disponivel'],
        ['Note', '14', '256/8', '8GB', 'roxo', 1490, 2, 'disponivel'],
        ['Note', '14', '256/8', '8GB', 'preto', 1490, 35, 'disponivel'],
        ['Note', '14', '256/8', '8GB', 'gold', 1490, 8, 'disponivel'],
        ['Poco', 'c71', '128/4', '4GB', 'preto', 950, 9, 'disponivel'],
        ['Poco', 'c71', '128/4', '4GB', 'azul', 950, 1, 'disponivel'],
        ['Poco', 'c71', '128/4', '4GB', 'gold', 950, 15, 'disponivel'],
        ['Poco', 'c75', '256/8', '8GB', 'verde', 1450, 7, 'disponivel'],
        ['Poco', 'c75', '256/8', '8GB', 'preto', 1450, 22, 'disponivel'],
        ['Poco', 'c75', '256/8', '8GB', 'gold', 1450, 1, 'disponivel'],
        ['Realme', 'note 60', '128/4', '4GB', 'azul', 890, 13, 'disponivel'],
        ['Realme', 'note 60', '128/4', '4GB', 'preto', 890, 9, 'disponivel'],
        ['Realme', 'c61', '256/8', '8GB', 'verde', 1150, 9, 'disponivel'],
        ['Realme', 'c61', '256/8', '8GB', 'gold', 1150, 1, 'disponivel'],
        ['Starlink', '3 mini', 'N/A', 'N/A', 'N/A', 1790, 4, 'disponivel'],
        ['Apple Watch', 'série 10', '42 mm', 'N/A', 'silver', 2400, 1, 'disponivel'],
        ['Apple Watch', 'série 10', '42 mm', 'N/A', 'preto', 2400, 1, 'disponivel'],
        ['Apple Watch', 'série 10', '42 mm', 'N/A', 'gold', 2500, 2, 'disponivel'],
        ['Apple Watch', 'série 10', '46 mm', 'N/A', 'preto', 2680, 0, 'disponivel'],
        ['Apple Watch', 'Serie 10 ultra', '49 mm', 'N/A', 'N/A', 5150, 1, 'disponivel'],
        ['PlayStation', 'mídia digital slim', '1tb', 'N/A', 'N/A', 3600, 0, 'disponivel'],
        ['PlayStation', '5 mídia física', 'N/A', 'N/A', 'N/A', 3950, 2, 'disponivel'],
        ['PlayStation', '5 mídia física', 'N/A', 'N/A', 'N/A', 3950, 1, 'disponivel'],
        ['PlayStation', '5 mídia física', 'N/A', 'N/A', 'N/A', 3850, 1, 'disponivel'],
        ['JBL', 'encore', 'N/A', 'N/A', 'N/A', 1600, 1, 'disponivel'],
        ['JBL', 'encore 2', 'N/A', 'N/A', 'N/A', 2300, 1, 'disponivel'],
        ['JBL', 'bombox3', 'N/A', 'N/A', 'camuflado', 2690, 1, 'disponivel'],
        ['JBL', 'bombox3', 'N/A', 'N/A', 'preto', 2690, 1, 'disponivel'],
        ['JBL', 'boombox 3 Wi-Fi', 'N/A', 'N/A', 'preto', 2790, 3, 'disponivel'],
        ['JBL', 'bombox4', 'N/A', 'N/A', 'N/A', 3450, 1, 'disponivel'],
        ['JBL', 'Party box 320', 'N/A', 'N/A', 'N/A', 3150, 2, 'disponivel'],
        ['JBL', 'Party box 120', 'N/A', 'N/A', 'N/A', 2250, 1, 'disponivel']
    ];
    
    $stmt = $pdo->prepare("INSERT IGNORE INTO products (category, model, storage, ram, color, price, quantity, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    foreach($products as $product) {
        $stmt->execute($product);
    }
    
    echo "<p>✅ " . count($products) . " produtos inseridos!</p>";
    
    echo "<h2>🎉 CONFIGURAÇÃO COMPLETA!</h2>";
    echo "<p>✅ Banco de dados configurado</p>";
    echo "<p>✅ Usuários criados</p>";
    echo "<p>✅ Produtos importados</p>";
    echo "<p>✅ Sistema pronto para uso!</p>";
    
    echo "<h3>👥 Usuários disponíveis:</h3>";
    echo "<ul>";
    echo "<li>admin / admin123</li>";
    echo "<li>funcionaria1 / func123</li>";
    echo "<li>funcionaria2 / func123</li>";
    echo "<li>vendedora / vend123</li>";
    echo "</ul>";
    
    echo "<h3>🌐 URLs do seu site:</h3>";
    echo "<ul>";
    echo "<li><a href='https://sallesinformatica.com'>https://sallesinformatica.com</a></li>";
    echo "<li><a href='https://sallesinformatica.com/loja.html'>https://sallesinformatica.com/loja.html</a></li>";
    echo "<li><a href='https://sallesinformatica.com/admin.html'>https://sallesinformatica.com/admin.html</a></li>";
    echo "<li><a href='https://sallesinformatica.com/games.html'>https://sallesinformatica.com/games.html</a></li>";
    echo "<li><a href='https://sallesinformatica.com/jbl.html'>https://sallesinformatica.com/jbl.html</a></li>";
    echo "</ul>";
    
    echo "<p><strong>⚠️ IMPORTANTE:</strong> Após testar, delete este arquivo por segurança!</p>";
    
} catch(PDOException $e) {
    echo "<p>❌ Erro: " . $e->getMessage() . "</p>";
    echo "<p>💡 Verifique se:</p>";
    echo "<ul>";
    echo "<li>O banco de dados foi criado no cPanel</li>";
    echo "<li>O usuário tem permissões</li>";
    echo "<li>A senha está correta</li>";
    echo "</ul>";
}
?>
