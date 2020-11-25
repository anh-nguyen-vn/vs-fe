import config from 'config';
const NodeRSA = require('node-rsa');

export function encrypt(text) {
    const key = new NodeRSA({ b: 1024 });
    key.importKey(config.pubKey, 'pkcs8-public');
    key.setOptions({ encryptionScheme: 'pkcs1' });

    return key.encrypt(text, 'base64');
}