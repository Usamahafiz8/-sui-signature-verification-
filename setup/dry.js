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
    const sender = keypair.toSuiAddress(); // Set the sender

    const txb = new Transaction();
    txb.setSender(sender); // ✅ Fix: Add transaction sender

    txb.moveCall({
      target: `${packageId}::gatekeeper_helper::test_function`,
      arguments: [
        txb.pure.vector(
          "u8",
          [
            178, 232, 169, 174, 43, 228, 123, 45, 106, 166, 199, 99, 183, 61,
            249, 182, 168, 45, 126, 77, 179, 154, 218, 250, 147, 73, 234, 187,
            153, 125, 167, 137, 50, 230, 58, 160, 234, 91, 101, 175, 27, 170,
            226, 218, 223, 179, 59, 114, 158, 103, 236, 222,
          ]
        ),
        txb.pure.vector(
          "u8",
          [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]
        ),
      ],
    });

    console.log(
      "offffffffff",
      txb.pure.vector(
        "u8",
        [
          178, 232, 169, 174, 43, 228, 123, 45, 106, 166, 199, 99, 183, 61,
          249, 182, 168, 45, 126, 77, 179, 154, 218, 250, 147, 73, 234, 187,
          153, 125, 167, 137, 50, 230, 58, 160, 234, 91, 101, 175, 27, 170,
          226, 218, 223, 179, 59, 114, 158, 103, 236, 222,
        ]
      ),
      txb.pure.vector(
        "u8",
        [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]
      )
    );

    txb.setGasBudget(500000000);

    const txBytes = await txb.build({ client });
    const dryRun = await client.dryRunTransactionBlock({
      transactionBlock: txBytes,
    });
    // console.log("Dry Run Result:", JSON.stringify(dryRun, null, 2));
    // console.log("Dry Run Result:", JSON.stringify(dryRun, null, 2));

    // const dryRun = await client.dryRunTransactionBlock({ transactionBlock: txBytes });
    // console.log("Dry Run Result:", dryRun);
    return dryRun;
  } catch (err) {
    console.error("Error in dryTest:", err.status);
    throw err;
  }
}

getWalletBalance();
const packageId =
  "0xc3d84e6b311ac808defc40578abcd537aae1eb844b6762c3787e76704bd68dbd";
main(packageId);
