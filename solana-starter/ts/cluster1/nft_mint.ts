import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../turbin3-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    let tx = createNft(umi, {
        mint,
        // uri: "https://gateway.irys.xyz/3xL6m2kF28taQiaQkTprDFVxXM4jDRN9bRU41d3ZqpL1",
        // uri: "https://gateway.irys.xyz/6UyvRB7915pCUQeWT4LWFmQnXBJMeeUXru6GK6zbaJVW",
        uri: "https://gateway.irys.xyz/EqTdPT2VC3Es4Hk1WSiRs6LuSDfaBB4kvGhFYJGuhnY8",
        symbol: "RRUG",
        name: "RARERUG",
        sellerFeeBasisPoints: percentAmount(69),
    });
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    console.log("Mint Address: ", mint.publicKey);
})();