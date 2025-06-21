const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express(); // 🔹 solo aquí defines app

// ✅ Middleware global
app.use(cors());
app.use(express.json());

// ✅ Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// ✅ Importar TODAS las rutas
app.use('/api/usuario', require('./routes/usuario.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/categorizacion', require('./routes/categorizacion.routes'));
app.use('/api/flujo', require('./routes/flujo.routes'));
app.use('/api/funcionarios', require('./routes/funcionarios.routes'));
app.use('/api/historial', require('./routes/historial.routes'));
app.use('/api/noticias', require('./routes/noticias.routes'));
app.use('/api/notificacion', require('./routes/notificacion.routes'));
app.use('/api/recuperar', require('./routes/recuperar.routes'));
app.use('/api/sintomas', require('./routes/sintomas.routes'));
app.use('/api/adjuntos', require('./routes/adjuntos.routes'));
app.use('/api/protegidas', require('./routes/rutas-protegidas.routes')); // alias corto

// ✅ Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de MiJa Salud 🎉');
});

// ✅ Puerto dinámico para Railway
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Servidor activo en el puerto ${PORT}`);
});
