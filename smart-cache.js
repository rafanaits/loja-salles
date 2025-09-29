// Sistema de Cache Inteligente para Loja Salles
// Atualiza automaticamente os dados sem cache fixo

class SmartCache {
    constructor() {
        this.cacheKey = 'loja_salles_data';
        this.versionKey = 'loja_salles_version';
        this.currentVersion = '1.1.0'; // Nova versão para corrigir agrupamento
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutos
    }

    // Verificar se precisa atualizar cache
    needsUpdate() {
        const lastUpdate = localStorage.getItem('last_cache_update');
        if (!lastUpdate) return true;
        
        const timeDiff = Date.now() - parseInt(lastUpdate);
        return timeDiff > this.cacheTimeout;
    }

    // Limpar cache antigo
    clearOldCache() {
        const storedVersion = localStorage.getItem(this.versionKey);
        if (storedVersion !== this.currentVersion) {
            localStorage.removeItem(this.cacheKey);
            localStorage.removeItem('last_cache_update');
            localStorage.setItem(this.versionKey, this.currentVersion);
            return true;
        }
        return false;
    }

    // Carregar dados com cache inteligente
    loadData() {
        // Limpar cache se versão mudou
        if (this.clearOldCache()) {
            console.log('🔄 Cache limpo - nova versão detectada');
        }

        // Verificar se precisa atualizar
        if (this.needsUpdate()) {
            console.log('🔄 Cache expirado - atualizando dados');
            this.updateCache();
        }

        return JSON.parse(localStorage.getItem(this.cacheKey) || '[]');
    }

    // Atualizar cache
    updateCache() {
        // Carregar dados padrão atualizados
        const defaultData = this.loadDefaultProducts();
        localStorage.setItem(this.cacheKey, JSON.stringify(defaultData));
        localStorage.setItem('last_cache_update', Date.now().toString());
        console.log('✅ Cache atualizado com sucesso');
    }

    // Carregar produtos padrão
    loadDefaultProducts() {
        const productList = `08 Redmi A5 128/4 preto 890 
        19 Redmi A5 128/4 azul 890 
        14 Redmi A5 128/4 gold 890 
        06 Redmi A5 128/4 verde 890 
        
        14 Redmi 13 128/6 gold 1090
        09 Redmi  13 128/6 preto 1090
        03 Redmi 13 128/6 azul 1090
        07 Redmi 13 128/6 pink 1090
        
        08 Redmi  13 256/8 preto 1150
        09  Redmi 13 256/8 azul 1150
        07 Redmi 13 256/8 gold 1150
        
        07 redmi 14c 128/6 azul 1090 
        04 Redmi 14c 128/6 preto 1090 
        06 Redmi 14c 128/6 verde 1090 
        
        07 Redmi 14c 256/8 verde 1190 
        
        08 Redmi 15c 128/4 preto 1290
        08 Redmi 15c 128/4 verde 1290
        08 redmi 15c 128/4 azul 1290
        
        09 Redmi 15c 256/8 azul 1390
        11 Redmi 15c 256/8 preto 1390
        09  Redmi 15c 256/8 laranja 1390
        04  Redmi 15c 256/8 verde 1390
        
        14 Redmi 15 256/8 silver 1490
        18 Redmi 15 256/8 preto 1490
        
        03 Note 14 128/6 preto 1390
        04 Note 14 128/6 roxo 1390
        10 Note 14 128/6 gold 1390
        08 note 14 128/6 azul 1390 
        
        29 Note 14 256/8 azul 1490
        19Note 14 256/8 verde 1490
        02 Note 14 256/8 roxo 1490 
        35 Note 14 256/8 preto 1490
        08 Note 14 256/8 gold 1490 
        
        06 note 14 5g 256/8 verde 1790
        05 Note 14 5g 256/8 roxo 1790
        06 Note 14 5g 256/8 preto 1790
        
        12 Note 14s 256/8 preto 1690
        17 Note 14s 256/8 azul 1690
        05  Note 14s 256/8 roxo 1690 
        
        17 Note 14 pro 256/8 preto 1890
        10 Note 14 pro 256/8 azul 1890
        08 Note 14 pro 256/8 roxo 1890
        14 Note 14 pro 256/8 Gold 1890
        
        02 Note 14 pro 512/12 roxo 2090
        04 Note 14 pro 512/12 azul 2090 
        03 note 14 pro 512/12 preto 2090 
        
        11 Note 14 pro 5g 256/8 preto 1990
        09 Note 14 pro 5g 256/8 verde 1990
        13 Note 14 pro 5g 256/8 roxo 1990
        15 Note 14 pro 5g 256/8 gold 1990
        
        02 Note 14 pro 5g 512/12 roxo 2290 
        02 Note 14 pro 5g 512/12 preto 2290 
        
        02 note 14 pro + 256/8 roxo 2350
        05 note 14 pro + 256/8 azul 2350
        03 note 14 pro + 256/8 preto 2350 
        
        03 Note 14 pro + 5g 512/12 azul 2790  
        07 Note 14 pro + 5g 512/12 roxo 2790 
        08  note 14 pro + 5g 512/12 dourado 2790
        03 note 14 pro + 5g 512/12 preto 2790  
        
        09 Poco c71 128/4 preto 950
        01 Poco c71 128/4 azul 950
        15 Poco c71 128/4 gold 950
        
        07 Poco c75 256/8 verde 1450 
        22 Poco c75  256/8 preto 1450 
        01 Poco c75 256/8 gold 1450 
        
        10 Poco c85 128/6 preto 1390
        12 Poco c85 128/6 verde 1390
        06 Poco c85 128/6 roxo 130
        
        09  Poco c85 256/8 verde 1490
        20 Poco c85 256/8 preto 1490
        13 Poco c85 256/8 roxo 1490
        
        02 Poco x7 5g 256/8 verde 1680 
        27 Poco x7 5g 256/8 silver 1680
        20 Poco x7 5g 256/8 preto 1690 
        
        23 Poco x7 5g 512/12 silver 1990
        13 Poco x7 5g 512/12 verde 1990 
        25 Poco x7 5g 512/12 preto 1900 
        
        16 Poco x7 pro 5g 256/8 amarelo 1980
        06 Poco x7 pro 5g 256/8 verde 1980 
        21 Poco x7 pro 5g 256/8 preto 1980   
        
        42 Poco x7 pro 5g 512/12 amarelo 2490 
        23 Poco x7 pro 5g 512/12 preto 2490   
        08  Poco x7 pro 5g 512/12 verde 2490 
        
        09 Poco x7 pro 256/12 verde 2250 
        14 Poco x7 pro 256/12 amarelo 2250
        
        06 poco F7 256/12 preto 2560
        05 poco F7 256/12 branco 2560
        08 Poco F7 256/12 silver 2560
        
        06 Poco f7 512/12 5g preto 2750 
        06 Poco f7 512/12 5g branco 2750 
        10 Poco f7 512/12 5g silver 2730 
        
        02 Poco f7 pro 5g 512/12 azul 3180 
        00 Poco f7 pro 5g 512/12 preto 3180
        
        13 note 60 128/4 azul 890 
        09 note  60 128/4 preto 890
        
        09 Realme c61 256/8 verde 1150 
        01 Realme c61 256/8 gold 1150 
        
        11Realme c61 128/4 gold 1050
        13 Realme c61 128/4 verde 1050 
        
        10 realme note 70 128/4 dourado 990 
        10 realme note 70 128/4 preto 990 
        
        08 Realme note 70 256/8 gold 1090 
        
        15 Realme c75 256/8 gold 1490 
        03 Realme c75 256/8 preto 1490 
        12  Realme c75 256/8 ruby 1490 
        
        09 Realme c75x 256/8 azul 1350 
        08 Realme c75x 256/8 pink 1350 
        
        02 Relame  c71 256/8 verde 1350 
        02  realme c71 256/8 branco 1350
        
        06 Realme c71 128/4 verde 1090
        06 Realme c71 128/4 branco 1090
        
        04 starlink  3 mini 1790 
        
        01 série 10 42 mm silver 2400
        01 serie 10 42 mm preto 2400
        02 serie 10 42 mm gold 2500
        
        00 serie 10 46 mm preto 2680 
        
        01 Serie 10 ultra 49 mm 5150 
        
        00 PlayStation mídia digital slim 1tb com jogo astro bot 3600 
        
        02 Playstation 5 mídia física com jogo bolt  3950
        
        01 PlayStation 5 mídia física com jogo call of duty 6 3950
        
        01 PlayStation 5 mídia física sem jogo 3.850 
        
        01 JBL encore 1600 
        01 JBL encore 2 2300 
        01 bombox3 camuflado 2690
        01 bombox3 preto 2690 
        03 boombox 3 Wi-Fi preto 2790 
        01 bombox4 3450
        02 Party box 320 3150 
        01 Party box 120 2250`;
        
        // Processar lista de produtos
        const lines = productList.split('\n');
        const newProducts = [];
        
        lines.forEach(line => {
            const product = this.parseProductLine(line);
            if (product) {
                newProducts.push(product);
            }
        });
        
        return newProducts;
    }

    // Função para processar linha do produto
    parseProductLine(line) {
        if (!line || line.trim() === '') return null;
        
        const parts = line.trim().split(/\s+/);
        if (parts.length < 4) return null;
        
        const quantity = parseInt(parts[0]) || 0;
        const price = parseInt(parts[parts.length - 1]) || 0;
        
        // Extrair modelo, storage, ram e cor
        const middleParts = parts.slice(1, -1);
        let model = '';
        let storage = 'N/A';
        let ram = 'N/A';
        let color = 'N/A';
        
        // Tentar extrair informações
        for (let i = 0; i < middleParts.length; i++) {
            const part = middleParts[i].toLowerCase();
            
            // Verificar se é cor
            if (['preto', 'azul', 'verde', 'gold', 'pink', 'roxo', 'silver', 'branco', 'laranja', 'dourado', 'camuflado'].includes(part)) {
                color = middleParts[i];
            }
            // Verificar se contém storage/ram
            else if (part.includes('/') || part.includes('gb') || part.includes('tb')) {
                storage = middleParts[i];
                ram = this.extractRamFromStorage(middleParts[i]);
            }
            // Resto é modelo
            else {
                model += (model ? ' ' : '') + middleParts[i];
            }
        }
        
        // Se não encontrou cor, usar a última parte que não é número
        if (color === 'N/A' && middleParts.length > 0) {
            const lastPart = middleParts[middleParts.length - 1];
            if (!/^\d+$/.test(lastPart)) {
                color = lastPart;
            }
        }
        
        const category = this.extractCategory(model);
        
        // Normalizar modelo para agrupamento correto
        const normalizedModel = this.normalizeModel(model);
        
        return {
            id: Date.now() + Math.random(),
            category: category,
            model: normalizedModel, // Usar modelo normalizado
            storage: storage,
            ram: ram,
            color: color,
            price: price,
            quantity: quantity,
            status: quantity > 0 ? 'disponivel' : 'indisponivel'
        };
    }

    // Normalizar modelo para agrupamento correto
    normalizeModel(model) {
        if (!model) return model;
        
        // Converter para minúsculas e remover espaços extras
        let normalized = model.toLowerCase().trim();
        
        // Padronizar variações comuns
        normalized = normalized.replace(/\s+/g, ' '); // Múltiplos espaços para um
        normalized = normalized.replace(/\s+5g\s*/g, ' 5g'); // Espaçamento do 5g
        normalized = normalized.replace(/\s+pro\s*/g, ' pro'); // Espaçamento do pro
        normalized = normalized.replace(/\s+plus\s*/g, ' plus'); // Espaçamento do plus
        
        // Capitalizar primeira letra de cada palavra
        normalized = normalized.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        return normalized;
    }

    // Função para extrair categoria
    extractCategory(model) {
        const modelLower = model.toLowerCase();
        
        if (modelLower.includes('redmi')) return 'Redmi';
        if (modelLower.includes('note')) return 'Note';
        if (modelLower.includes('poco')) return 'Poco';
        if (modelLower.includes('realme')) return 'Realme';
        if (modelLower.includes('starlink')) return 'Starlink';
        if (modelLower.includes('serie') || modelLower.includes('série')) return 'Apple Watch';
        if (modelLower.includes('playstation') || modelLower.includes('playstation')) return 'PlayStation';
        if (modelLower.includes('jbl') || modelLower.includes('boombox') || modelLower.includes('party box')) return 'JBL';
        
        return 'Outros';
    }

    // Função para extrair RAM do storage
    extractRamFromStorage(storage) {
        if (!storage || storage === 'N/A') return 'N/A';
        
        const parts = storage.split('/');
        if (parts.length >= 2) {
            return parts[1] + 'GB';
        }
        
        // Tentar extrair RAM de outras formas
        const ramMatch = storage.match(/(\d+)\s*gb/i);
        if (ramMatch) {
            return ramMatch[1] + 'GB';
        }
        
        return 'N/A';
    }

    // Forçar atualização
    forceUpdate() {
        localStorage.removeItem(this.cacheKey);
        localStorage.removeItem('last_cache_update');
        this.updateCache();
        console.log('🔄 Cache forçado - dados atualizados');
    }
}

// Instanciar cache inteligente
const smartCache = new SmartCache();

// Função global para forçar atualização
window.forceUpdateCache = () => {
    smartCache.forceUpdate();
    location.reload();
};

// Função global para limpar cache
window.clearAllCache = () => {
    localStorage.clear();
    console.log('🗑️ Cache completamente limpo');
    location.reload();
};
