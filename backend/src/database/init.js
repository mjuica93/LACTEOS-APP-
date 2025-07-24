const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crear directorio de base de datos si no existe
const dbPath = path.join(__dirname, '../../database/lacteos.db');

// Crear conexión a la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos SQLite');
  }
});

// Habilitar foreign keys
db.run('PRAGMA foreign_keys = ON');

// Crear tablas
const createTables = () => {
  return new Promise((resolve, reject) => {
    // Tabla de usuarios
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        full_name TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creando tabla users:', err.message);
        reject(err);
      } else {
        console.log('✅ Tabla users creada');
      }
    });

    // Tabla de categorías de productos
    db.run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creando tabla categories:', err.message);
        reject(err);
      } else {
        console.log('✅ Tabla categories creada');
      }
    });

    // Tabla de productos
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        category_id INTEGER,
        price DECIMAL(10,2) NOT NULL,
        nutritional_info TEXT,
        benefits TEXT,
        image_url TEXT,
        is_available BOOLEAN DEFAULT 1,
        stock_quantity INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories (id)
      )
    `, (err) => {
      if (err) {
        console.error('Error creando tabla products:', err.message);
        reject(err);
      } else {
        console.log('✅ Tabla products creada');
      }
    });

    // Tabla de clientes
    db.run(`
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        business_type TEXT,
        address TEXT,
        preferences TEXT,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creando tabla clients:', err.message);
        reject(err);
      } else {
        console.log('✅ Tabla clients creada');
      }
    });

    // Tabla de presentaciones
    db.run(`
      CREATE TABLE IF NOT EXISTS presentations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        client_id INTEGER,
        user_id INTEGER,
        template_type TEXT DEFAULT 'default',
        products_data TEXT,
        custom_data TEXT,
        pdf_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients (id),
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `, (err) => {
      if (err) {
        console.error('Error creando tabla presentations:', err.message);
        reject(err);
      } else {
        console.log('✅ Tabla presentations creada');
      }
    });

    // Tabla de ventas
    db.run(`
      CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        product_id INTEGER,
        quantity INTEGER NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        total_price DECIMAL(10,2) NOT NULL,
        sale_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        notes TEXT,
        FOREIGN KEY (client_id) REFERENCES clients (id),
        FOREIGN KEY (product_id) REFERENCES products (id)
      )
    `, (err) => {
      if (err) {
        console.error('Error creando tabla sales:', err.message);
        reject(err);
      } else {
        console.log('✅ Tabla sales creada');
      }
    });

    // Tabla de plantillas de presentación
    db.run(`
      CREATE TABLE IF NOT EXISTS presentation_templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        template_data TEXT NOT NULL,
        is_default BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creando tabla presentation_templates:', err.message);
        reject(err);
      } else {
        console.log('✅ Tabla presentation_templates creada');
        resolve();
      }
    });
  });
};

// Insertar datos iniciales
const insertInitialData = () => {
  return new Promise((resolve, reject) => {
    // Insertar categorías básicas
    const categories = [
      { name: 'Yogures', description: 'Productos lácteos fermentados' },
      { name: 'Leches', description: 'Leche fresca y procesada' },
      { name: 'Quesos', description: 'Variedades de queso' },
      { name: 'Mantequillas', description: 'Productos grasos lácteos' },
      { name: 'Postres Lácteos', description: 'Postres y dulces lácteos' }
    ];

    const insertCategory = db.prepare('INSERT OR IGNORE INTO categories (name, description) VALUES (?, ?)');
    categories.forEach(category => {
      insertCategory.run(category.name, category.description);
    });
    insertCategory.finalize();

    // Insertar usuario administrador por defecto
    const bcrypt = require('bcryptjs');
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    
    db.run(`
      INSERT OR IGNORE INTO users (username, email, password, full_name, role)
      VALUES ('admin', 'admin@lacteos.com', ?, 'Administrador', 'admin')
    `, [hashedPassword], (err) => {
      if (err) {
        console.error('Error insertando usuario admin:', err.message);
        reject(err);
      } else {
        console.log('✅ Usuario administrador creado');
      }
    });

    // Insertar plantilla por defecto
    const defaultTemplate = {
      name: 'Plantilla Básica',
      description: 'Plantilla estándar para presentaciones de productos lácteos',
      template_data: JSON.stringify({
        sections: [
          { type: 'header', title: 'Catálogo de Productos Lácteos' },
          { type: 'products', layout: 'grid' },
          { type: 'nutritional', layout: 'table' },
          { type: 'contact', layout: 'footer' }
        ],
        styling: {
          primaryColor: '#2E86AB',
          secondaryColor: '#A23B72',
          fontFamily: 'Arial, sans-serif'
        }
      }),
      is_default: 1
    };

    db.run(`
      INSERT OR IGNORE INTO presentation_templates (name, description, template_data, is_default)
      VALUES (?, ?, ?, ?)
    `, [defaultTemplate.name, defaultTemplate.description, defaultTemplate.template_data, defaultTemplate.is_default], (err) => {
      if (err) {
        console.error('Error insertando plantilla por defecto:', err.message);
        reject(err);
      } else {
        console.log('✅ Plantilla por defecto creada');
        resolve();
      }
    });
  });
};

// Función principal
const initDatabase = async () => {
  try {
    console.log('🚀 Inicializando base de datos...');
    await createTables();
    await insertInitialData();
    console.log('✅ Base de datos inicializada correctamente');
    console.log('📊 Credenciales por defecto:');
    console.log('   Usuario: admin');
    console.log('   Contraseña: admin123');
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
  } finally {
    db.close((err) => {
      if (err) {
        console.error('Error cerrando base de datos:', err.message);
      } else {
        console.log('🔒 Conexión a base de datos cerrada');
      }
    });
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase, db }; 