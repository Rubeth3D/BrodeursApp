import crypto from 'crypto';

const secretKey = 'BrodeurAppsBrodeurAppsBrodeurApps!!'; // 32 caractères (256 bits)
const ivLength = 16;
const algorithm = 'aes-256-cbc';

// Assurez-vous que la clé est de 32 octets
let keyBuffer = Buffer.from(secretKey, 'utf-8');

// Si la clé est trop longue, la tronquer
if (keyBuffer.length > 32) {
  keyBuffer = keyBuffer.slice(0, 32);
}

// Si la clé est trop courte, la compléter
if (keyBuffer.length < 32) {
  keyBuffer = Buffer.concat([keyBuffer, Buffer.alloc(32 - keyBuffer.length, ' ')]);
}

const finalKey = keyBuffer;

// Fonction de chiffrement
export function encrypt(text) {
  if (typeof text !== 'string') {
    throw new Error('Le texte à chiffrer doit être une chaîne');
  }

  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, finalKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

// Fonction de déchiffrement
export function decrypt(encrypted) {
  if (typeof encrypted !== 'string' || !encrypted.includes(':')) {
    throw new Error('Le texte chiffré doit être une chaîne valide et contenir ":" pour séparer l\'IV du texte chiffré');
  }

  const [ivHex, encryptedText] = encrypted.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, finalKey, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}