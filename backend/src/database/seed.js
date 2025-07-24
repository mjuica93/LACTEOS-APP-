const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Conectar a la base de datos
const dbPath = path.join(__dirname, '../../database/lacteos.db');
const db = new sqlite3.Database(dbPath);

// Datos de ejemplo para productos
const sampleProducts = [
  {
    name: 'Yogur Natural Griego',
    description: 'Yogur griego natural, rico en proteínas y probióticos',
    category_id: 1,
    price: 2.50,
    nutritional_info: JSON.stringify({
      calories: 120,
      protein: 15,
      carbs: 8,
      fat: 4,
      calcium: 200
    }),
    benefits: 'Alto en proteínas, probióticos naturales, sin azúcares añadidos',
    stock_quantity: 50
  },
  {
    name: 'Leche Entera Fresca',
    description: 'Leche entera fresca de vaca, pasteurizada',
    category_id: 2,
    price: 1.80,
    nutritional_info: JSON.stringify({
      calories: 150,
      protein: 8,
      carbs: 12,
      fat: 8,
      calcium: 300
    }),
    benefits: 'Rica en calcio, vitamina D, proteínas de alta calidad',
    stock_quantity: 100
  },
  {
    name: 'Queso Manchego Curado',
    description: 'Queso manchego curado 12 meses, sabor intenso',
    category_id: 3,
    price: 8.90,
    nutritional_info: JSON.stringify({
      calories: 380,
      protein: 25,
      carbs: 2,
      fat: 30,
      calcium: 800
    }),
    benefits: 'Alto contenido en calcio, proteínas, sabor auténtico',
    stock_quantity: 25
  },
  {
    name: 'Mantequilla Sin Sal',
    description: 'Mantequilla natural sin sal añadida',
    category_id: 4,
    price: 3.20,
    nutritional_info: JSON.stringify({
      calories: 717,
      protein: 0.9,
      carbs: 0.1,
      fat: 81,
      vitamin_a: 684
    }),
    benefits: 'Natural, sin conservantes, rica en vitamina A',
    stock_quantity: 30
  },
  {
    name: 'Flan Casero',
    description: 'Flan casero tradicional con caramelo',
    category_id: 5,
    price: 2.80,
    nutritional_info: JSON.stringify({
      calories: 180,
      protein: 6,
      carbs: 25,
      fat: 6,
      calcium: 150
    }),
    benefits: 'Postre tradicional, rico en calcio, sin conservantes',
    stock_quantity: 40
  }
];

// Datos de ejemplo para clientes
const sampleClients = [
  {
    name: 'Supermercado Central',
    email: 'pedidos@supercentral.com',
    phone: '+34 91 123 4567',
    business_type: 'Supermercado',
    address: 'Calle Mayor 123, Madrid',
    preferences: 'Productos frescos, entrega diaria',
    notes: 'Cliente preferente, paga a 30 días'
  },
  {
    name: 'Restaurante El Buen Sabor',
    email: 'chef@elbuensabor.com',
    phone: '+34 91 987 6543',
    business_type: 'Restaurante',
    address: 'Plaza España 45, Madrid',
    preferences: 'Productos premium, entrega martes y viernes',
    notes: 'Chef exigente con la calidad'
  },
  {
    name: 'Cafetería La Lechera',
    email: 'info@lalechera.com',
    phone: '+34 91 555 1234',
    business_type: 'Cafetería',
    address: 'Gran Vía 78, Madrid',
    preferences: 'Leche fresca diaria, yogures naturales',
    notes: 'Nuevo cliente, muy interesado en productos orgánicos'
  },
  {
    name: 'Hotel Plaza Mayor',
    email: 'compras@hotelplaza.com',
    phone: '+34 91 444 5678',
    business_type: 'Hotel',
    address: 'Plaza Mayor 1, Madrid',
    preferences: 'Productos de alta calidad, entrega programada',
    notes: 'Cliente corporativo, facturación mensual'
  }
];

// Función para insertar productos
const insertProducts = () => {
  return new Promise((resolve, reject) => {
    const insertProduct = db.prepare(`
      INSERT OR IGNORE INTO products 
      (name, description, category_id, price, nutritional_info, benefits, stock_quantity) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    sampleProducts.forEach(product => {
      insertProduct.run(
        product.name,
        product.description,
        product.category_id,
        product.price,
        product.nutritional_info,
        product.benefits,
        product.stock_quantity
      );
    });

    insertProduct.finalize((err) => {
      if (err) {
        console.error('Error insertando productos:', err.message);
        reject(err);
      } else {
        console.log('✅ Productos de ejemplo insertados');
        resolve();
      }
    });
  });
};

// Función para insertar clientes
const insertClients = () => {
  return new Promise((resolve, reject) => {
    const insertClient = db.prepare(`
      INSERT OR IGNORE INTO clients 
      (name, email, phone, business_type, address, preferences, notes) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    sampleClients.forEach(client => {
      insertClient.run(
        client.name,
        client.email,
        client.phone,
        client.business_type,
        client.address,
        client.preferences,
        client.notes
      );
    });

    insertClient.finalize((err) => {
      if (err) {
        console.error('Error insertando clientes:', err.message);
        reject(err);
      } else {
        console.log('✅ Clientes de ejemplo insertados');
        resolve();
      }
    });
  });
};

// Función para insertar ventas de ejemplo
const insertSampleSales = () => {
  return new Promise((resolve, reject) => {
    const sampleSales = [
      { client_id: 1, product_id: 1, quantity: 20, unit_price: 2.50, total_price: 50.00 },
      { client_id: 1, product_id: 2, quantity: 30, unit_price: 1.80, total_price: 54.00 },
      { client_id: 2, product_id: 3, quantity: 5, unit_price: 8.90, total_price: 44.50 },
      { client_id: 2, product_id: 4, quantity: 8, unit_price: 3.20, total_price: 25.60 },
      { client_id: 3, product_id: 1, quantity: 15, unit_price: 2.50, total_price: 37.50 },
      { client_id: 3, product_id: 2, quantity: 25, unit_price: 1.80, total_price: 45.00 },
      { client_id: 4, product_id: 5, quantity: 12, unit_price: 2.80, total_price: 33.60 }
    ];

    const insertSale = db.prepare(`
      INSERT OR IGNORE INTO sales 
      (client_id, product_id, quantity, unit_price, total_price) 
      VALUES (?, ?, ?, ?, ?)
    `);

    sampleSales.forEach(sale => {
      insertSale.run(
        sale.client_id,
        sale.product_id,
        sale.quantity,
        sale.unit_price,
        sale.total_price
      );
    });

    insertSale.finalize((err) => {
      if (err) {
        console.error('Error insertando ventas:', err.message);
        reject(err);
      } else {
        console.log('✅ Ventas de ejemplo insertadas');
        resolve();
      }
    });
  });
};

// Función principal
const seedDatabase = async () => {
  try {
    console.log('🌱 Poblando base de datos con datos de ejemplo...');
    
    await insertProducts();
    await insertClients();
    await insertSampleSales();
    
    console.log('✅ Base de datos poblada exitosamente');
    console.log('📊 Datos insertados:');
    console.log('   - 5 productos de ejemplo');
    console.log('   - 4 clientes de ejemplo');
    console.log('   - 7 ventas de ejemplo');
    
  } catch (error) {
    console.error('❌ Error poblando base de datos:', error);
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
  seedDatabase();
}

module.exports = { seedDatabase }; 