const fs = require('fs');
const crypto = require('crypto');

function updateEnvFile(privateKey, publicKey) {
  const envFilePath = __dirname + '/envs/.env.development';

  if (!fs.existsSync(envFilePath)) {
    console.error('.env.development file not found.');
    return;
  }

  let envFileContent = fs.readFileSync(envFilePath, 'utf-8');

  if (envFileContent.includes('JWT_PRIVATE_KEY=') || envFileContent.includes('JWT_PUBLIC_KEY=')) {
    console.error('Keys already exist in the .env.development file.');
    return;
  }

  envFileContent += `\nPRIVATE_KEY="${privateKey.replace(/\n/g, '\\n')}"`;
  envFileContent += `\nPUBLIC_KEY="${publicKey.replace(/\n/g, '\\n')}"`;

  fs.writeFileSync(envFilePath, envFileContent);

  console.log('Updated keys in the .env.development file successfully.');
}


const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

updateEnvFile(privateKey, publicKey);
