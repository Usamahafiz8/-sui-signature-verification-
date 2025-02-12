import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'
import { fromB64, toB64 } from '@mysten/bcs';


(async () => {
    // Generate a new Ed25519 keypair
    const signerKeypair = new Ed25519Keypair();

    // Get secret key
    const secretKey = signerKeypair.getSecretKey() 

    // use default instead, it is easier to match your type
    const keypair = Ed25519Keypair.fromSecretKey(secretKey)
    const publicKey = keypair.getPublicKey()

    const message = new TextEncoder().encode('hello world');
    const { signature } = await keypair.signPersonalMessage(message);
    const isValid = await publicKey.verifyPersonalMessage(message, signature);    
    
    console.log('Signature (Base64):', isValid);
    console.log('Message (Base64):', message);

    const privKeyArray = Uint8Array.from(Array.from(fromB64(secretKey)));

    // Retrieve keypair from secret key
    const recoveredKeypair = await Ed25519Keypair.fromSecretKey(secretKey);

    // Log public key, private key, and a sample message
    console.log('Private Key (Base64):', secretKey, 'test', privKeyArray);
    console.log('Sample Message:', 'Hello, Sui Blockchain!');
    console.log('Public Key:', signerKeypair.getPublicKey());
    console.log('Recovered Public Key:', recoveredKeypair.getPublicKey());
})();