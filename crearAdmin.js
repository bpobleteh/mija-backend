const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Funcionario = require('./models/Funcionario');

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Conectado a MongoDB');

    // 🧹 Elimina si ya existe por correo o rut
    await Funcionario.deleteOne({ email: 'admin@mija.cl' });

    const admin = new Funcionario({
      nombre: 'Bárbara Admin',
      email: 'admin@mija.cl',
      password: await bcrypt.hash('1234', 10),
      rut: '12345678-9',
      centroSalud: 'Centro Prueba',
      rol: 'admin'
    });

    await admin.save();
    console.log('✅ Administrador recreado con contraseña 1234');

    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Error al conectar:', err);
  });
