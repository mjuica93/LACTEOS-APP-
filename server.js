const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad y optimización
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com", "https://unpkg.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://unpkg.com"],
            scriptSrcAttr: ["'unsafe-hashes'", "'sha256-tXaTi/SzNlVJNc0mXiTKjyQCOclAnKZ2yiQlpkfPrvk='", "'sha256-O0D50oco61Hfgl8oCwmO7wBZQxKzECZLfDORdWg8lqM='", "'sha256-IW+4etldt9Ktr/ZIz0q1+86c6LttrWV3w8HiWkYFtFw='", "'sha256-YnKwBCadPBQsEu0//IkA1qLyRXn/SMQC1AFA0C4m/5M='", "'sha256-StNTghApKMmv2Qvd8OGDjtDTeHqgD7tHdH1O9dZVhzM='", "'sha256-OYD/B97oXW/xdiOHBGMC13Rx/QVw4Cmis0NcR+b+DhA='", "'sha256-Q+K7wgclW1ApL5mt15AKOjiQCNNpVpBsIfOCBXvyCXM='", "'sha256-z81L0lTSNVgBEeinPK1H/bdQss1JGdNZ1GJOJ2msMYo='", "'sha256-P+9ed5lmg/bhqRjLJYTqwFMf4y6Vss+UknYPg48rit4='", "'sha256-qR3S3nRkipcHv4LZk2YZ22pgj+m4HdLnaJ7A6vmO9/Q='", "'sha256-4RVXZWj3mbhtOAijMHe5/VPpvl8xjWBmMMkNxqsVjmE='", "'sha256-eg23cV51I0x0/+i/11LVq+sJ6IBKcDtjyjRIXGD2i9Y='", "'sha256-oF3pLS5eGsoAKfimFCI5TddAo/iSJIJC+lXWlFzubgw='", "'sha256-2wHxT+XXloUm5seCd4c5SPA+hsPREyOAzCpndM/r8jc='", "'sha256-3dURnRrlgb163wCrvZOhawesb1QrxKsx05AU2X34wxU='", "'sha256-/C8STVQs6bd6teLhUZHpyEAd58b8CDzh3zxWnFUH7Xg='", "'sha256-ZsHR+gWGlLpWHF16rqhbv5f7uLCbW4D4LO/cdZ91VFU='", "'sha256-g5ycnpmbUma3/78UukzTJvfAmq1V3kyFRH957qT7tnM='", "'sha256-Q7UtBGrpHwS8MpKLTxvF9dmmdKGNtvjaDamZXgaD/xw='"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"]
        }
    }
}));
app.use(cors());
app.use(compression());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta de salud para Railway
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Soprole Catálogos App funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Manejo de rutas no encontradas
app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor Soprole iniciado en puerto ${PORT}`);
    console.log(`📱 Aplicación disponible en: http://localhost:${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
}); 