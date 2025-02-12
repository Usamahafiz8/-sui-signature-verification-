// import { config } from "dotenv";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";

// Load environment variables from a .env file
// config();

// Function to retrieve the mnemonic from the environment variable
const getSecretMnemonic = async () => {
  try {

const MNEMONIC="actual cigar sunny trumpet elevator horror actual sing violin verb come way"
    const mnemonic = MNEMONIC || "";
    
    if (!mnemonic) {
      throw new Error("Mnemonic not found in environment variables.");
    }

    console.log("Mnemonic retrieved:", mnemonic);
    return mnemonic;
  } catch (err) {
    // @ts-ignore
    throw new Error(`Error retrieving mnemonic: ${err.message}`);
  }
};

// Function to get the connected wallet address
const getConnectedWalletAddress = async () => {
  try {
    // Get the mnemonic and derive the keypair
    const secretPhrase = await getSecretMnemonic();
    const keypair = Ed25519Keypair.deriveKeypair(secretPhrase);
    
    // Get the wallet address from the keypair
    const walletAddress = keypair.getPublicKey().toSuiAddress();
    console.log("Connected Wallet Address:", walletAddress);
    return walletAddress;
  } catch (err) {
    // @ts-ignore
    throw new Error(`Error getting wallet address: ${err.message}`);
  }
};

export const connectedWalletAddress = async () => {
  return await getConnectedWalletAddress();
};
