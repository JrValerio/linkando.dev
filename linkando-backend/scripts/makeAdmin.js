const mongoose = require('mongoose');
const User = require('../src/model/userModel');

async function makeAdmin(email) {
  try {
    // Conectar ao MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/linkando';
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado ao MongoDB');

    // Encontrar o usuário pelo email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('Usuário não encontrado. Verifique se o email está correto.');
      process.exit(1);
    }

    // Tornar admin
    user.isAdmin = true;
    await user.save();

    console.log(`✅ Usuário ${user.name} (${user.email}) foi promovido a administrador!`);
    console.log('Dados do usuário:', {
      id: user._id,
      name: user.name,
      email: user.email,
      provider: user.provider,
      isAdmin: user.isAdmin
    });

    await mongoose.disconnect();
    console.log('Desconectado do MongoDB');
  } catch (error) {
    console.error('Erro:', error);
    process.exit(1);
  }
}

// Verificar se o email foi fornecido
const email = process.argv[2];
if (!email) {
  console.log('Uso: node scripts/makeAdmin.js <email>');
  console.log('Exemplo: node scripts/makeAdmin.js usuario@exemplo.com');
  process.exit(1);
}

makeAdmin(email); 