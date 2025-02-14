import { bcs } from "@mysten/sui/bcs";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { SuiClient } from "@mysten/sui/client";

const MNEMONIC =
  "actual cigar sunny trumpet elevator horror actual sing violin verb come way";

async function getWalletKeypair() {
  try {
    const keypair = Ed25519Keypair.deriveKeypair(MNEMONIC);
    return keypair;
  } catch (error) {
    console.error("Error deriving keypair:", error);
    throw error;
  }
}

async function getWalletAddress() {
  const keypair = await getWalletKeypair();
  const address = keypair.toSuiAddress();
  console.log("Wallet Address:", address);
  return address;
}

async function getWalletBalance() {
  try {
    const client = new SuiClient({ url: "https://fullnode.testnet.sui.io" });
    const address = await getWalletAddress();
    const balance = await client.getBalance({ owner: address });

    console.log("Wallet Balance:", balance.totalBalance, "SUI");
    return balance;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
}

async function main(packageId) {
  try {
    const client = new SuiClient({ url: "https://fullnode.testnet.sui.io" });

    const keypair = await getWalletKeypair();
    const sender = keypair.toSuiAddress(); 

    const txb = new Transaction();
    txb.setSender(sender); 
    txb.moveCall({
      target: `${packageId}::shareobject::gatekeeper_helper`,
      arguments: [
        txb.pure.vector(
          "u8",
          [
 
            178, 232, 169, 174,  43, 228, 123,  45, 106,
            167, 127,  54, 197, 206,  43, 226, 108, 240,
            243, 184,  94, 166, 156,  43, 107,  74, 173,
            166, 218, 125, 179,   6, 179, 227, 215, 107,
            231,  57, 160, 142, 106, 118, 234, 103,  28,
            207, 124, 178, 146, 153,  52, 165
          ]
        ),
        txb.pure.vector(
          "u8",
          [ 104, 101, 108, 108,
            111,  32, 119, 111,
            114, 108, 100]
        ),
      ],
    });

    txb.setGasBudget(500000000);

    const txBytes = await txb.build({ client });
    const dryRun = await client.dryRunTransactionBlock({
      transactionBlock: txBytes,
    });
    // console.log("Dry Run Result:", JSON.stringify(dryRun, null, 2));
    // console.log("Dry Run Result:", JSON.stringify(dryRun, null, 2));

    // const dryRun = await client.dryRunTransactionBlock({ transactionBlock: txBytes });
    console.log("Dry Run Result:", dryRun);
    return dryRun;
  } catch (err) {
    console.error("Error in dryTest:", err.status);
    throw err;
  }
}

getWalletBalance();
const packageId =
  "0x25f9a990658b1d020e55bd9f6dbfa95654ded4d904b38573043b1b6a267001ae";
main(packageId);
