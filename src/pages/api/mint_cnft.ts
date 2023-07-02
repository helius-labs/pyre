

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

async function mintCNFT(walletAddress: any) {
  let publicKey = new PublicKey(walletAddress);
  const MERKLE_TREE_KP: any = process.env.MERKLE_TREE_SRC
  const COLLECTION_MINT: any = process.env.COLLECTION_MINT
  const NFT_METADATA: any = process.env.NFT_METADATA
  const RPC_URL:any = process.env.HELIUS_RPC

  const connection = new Connection(RPC_URL);

  const merkleTree = Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(MERKLE_TREE_KP.toString()))
  );

  const [treeAuthority, _bump] = PublicKey.findProgramAddressSync(
    [merkleTree.publicKey.toBuffer()],
    BUBBLEGUM_PROGRAM_ID
  );

  const collectionMint = new PublicKey(COLLECTION_MINT);
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
  console.log(bgumSigner)
  const ix = await createMintToCollectionV1Instruction(
    {
      merkleTree: merkleTree.publicKey,
      treeAuthority: treeAuthority,
      leafOwner: publicKey,
      leafDelegate: publicKey,
      payer: publicKey,
      treeDelegate: publicKey,
      logWrapper: SPL_NOOP_PROGRAM_ID,
      compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
      collectionAuthority: publicKey,
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
        creators: [{ address: publicKey, verified: true, share: 100 }],
        isMutable: true,
        name: "Pyre",
        primarySaleHappened: true,
        sellerFeeBasisPoints: 0,
        symbol: "PYR",
        uri: NFT_METADATA,
        uses: null,
        editionNonce: null,
        tokenStandard: null,
        tokenProgramVersion: TokenProgramVersion.Original,
      },
    }
  );
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
  const transaction = new Transaction();
  transaction.add(ix);
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = publicKey;
  console.log(transaction)
  // const serializedTransaction = transaction.serialize();
  // console.log(serializedTransaction, 'a')
  return transaction
}

export default async function handler(req: any, res: any) {

  try {
    if (req.method === "POST") {

      let publicKey = req.body.publicKey;

      let serializedTX = await mintCNFT(publicKey)
      // console.log(serializedTX, 's')
      res.status(200).json(serializedTX)
    };

  }

  catch (err) { console.log(err) }
}

