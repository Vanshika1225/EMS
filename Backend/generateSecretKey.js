const crypto=require('crypto');

const generateSecretKey=()=>{
    return crypto.randomBytes(32).toString('hex');
}

const secretKey=generateSecretKey();
console.log('Generated secret key :',secretKey)

// Export the secret key if needed
module.exports = secretKey;