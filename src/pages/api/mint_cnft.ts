// @ts-nocheck

import {
  PROGRAM_ID as BUBBLEGUM_PROGRAM_ID,
  TokenProgramVersion,
  createMintToCollectionV1Instruction,
} from "@metaplex-foundation/mpl-bubblegum";
import {
  Keypair,
  Signer,
  TransactionInstruction,
  Connection,
  TransactionMessage,
  VersionedTransaction,
  PublicKey,
  Transaction
} from "@solana/web3.js";
import {
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
} from "@solana/spl-account-compression";
import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";


import { ConcurrentMerkleTreeAccount } from "@solana/spl-account-compression";
import web3 from "@solana/web3.js"

const getAssetProof = async () => {


    const connection = new web3.Connection(`https://rpc.helius.xyz/?api-key=c06d2673-cd88-43d0-8c04-a2a35d1f03a1`);
    const publicKey = new web3.PublicKey("3RYFyDBd81h3hQ8P1PtZRgSJYgKeNKXamKJPXhWmy5e7");    

    const cmt = await ConcurrentMerkleTreeAccount.fromAccountAddress(connection, publicKey)

    return cmt.tree.rightMostPath.index
};

async function sendVersionedTx(
  connection: Connection,
  instructions: TransactionInstruction[],
  payer: PublicKey,
  signers: Signer[]
) {
  let latestBlockhash = await connection.getLatestBlockhash();
  const message = new TransactionMessage({
      payerKey: payer,
      recentBlockhash: latestBlockhash.blockhash,
      instructions,
  }).compileToLegacyMessage();
  const transaction = new VersionedTransaction(message);
  transaction.sign(signers);
  const signature = await connection.sendTransaction(transaction);
  return signature;
}

async function mintCNFT(publicKey: any) {
  const payerPubKey = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(process.env.PAYER_SRC.toString()))
  );

  const connection = new Connection(process.env.HELIUS_RPC)

  const merkleTree = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(process.env.MERKLE_TREE_SRC.toString()))
  );

  const [treeAuthority, _bump] = PublicKey.findProgramAddressSync(
      [merkleTree.publicKey.toBuffer()],
      BUBBLEGUM_PROGRAM_ID
  );

  const collectionMint = new PublicKey(process.env.COLLECTION_MINT);
  const [collectionMetadataAccount, _b1] = PublicKey.findProgramAddressSync(
      [
          Buffer.from("metadata", "utf8"),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          collectionMint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
  );

  const [collectionEditionAccount, _b2] = PublicKey.findProgramAddressSync(
      [
          Buffer.from("metadata", "utf8"),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          collectionMint.toBuffer(),
          Buffer.from("edition", "utf8"),
      ],
      TOKEN_METADATA_PROGRAM_ID
  );

  const [bgumSigner, __] = PublicKey.findProgramAddressSync(
      [Buffer.from("collection_cpi", "utf8")],
      BUBBLEGUM_PROGRAM_ID
  );

  let cnftIndex = await getAssetProof()

  const ix = await createMintToCollectionV1Instruction(
      {
          merkleTree: merkleTree.publicKey,
          treeAuthority: treeAuthority,
          leafOwner: new PublicKey(publicKey),
          leafDelegate: payerPubKey.publicKey,
          payer: payerPubKey.publicKey,
          treeDelegate: payerPubKey.publicKey,
          logWrapper: SPL_NOOP_PROGRAM_ID,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
          collectionAuthority: payerPubKey.publicKey,
          collectionAuthorityRecordPda: BUBBLEGUM_PROGRAM_ID,
          collectionMint: collectionMint,
          collectionMetadata: collectionMetadataAccount,
          editionAccount: collectionEditionAccount,
          bubblegumSigner: bgumSigner,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      },
      {
          metadataArgs: {
              collection: { key: collectionMint, verified: false },
              creators: [{ address: payerPubKey.publicKey, verified: true, share: 100 }],
              isMutable: true,
              name: `Pyre #${cnftIndex}`,
              primarySaleHappened: true,
              sellerFeeBasisPoints: 0,
              symbol: "PYR",
              uri: process.env.NFT_METADATA,
              uses: null,
              editionNonce: null,
              tokenStandard: null,
              tokenProgramVersion: TokenProgramVersion.Original,
          },
      }
  );

  const stx = await sendVersionedTx(connection, [ix], payerPubKey.publicKey, [
      payerPubKey,
  ]);

  return [stx, cnftIndex]
  // console.log(`Transaction sent: ${stx}`);
}

export default async function handler(req: any, res: any) {

  try {
    if (req.method === "POST") {
      if (!req.body.publicKey) {
        throw ("Wallet not connected!")
      }
      let publicKey = req.body.publicKey;
      let serializedTX = await mintCNFT(publicKey)
      res.status(200).json(serializedTX)
    };
  }

  catch (err) { console.log(err) }
}

