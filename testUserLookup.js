const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const email = "sistemaoraculoia@gmail.com";

admin.auth().getUserByEmail(email)
  .then(user => {
    console.log("Usuário encontrado!");
    console.log("UID:", user.uid);
    console.log("Email:", user.email);
    console.log("Provider:", user.providerData.map(p => p.providerId));
    process.exit(0);
  })
  .catch(err => {
    console.error("Erro ao buscar usuário:", err.message);
    process.exit(1);
  });