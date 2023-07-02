// @ts-nocheck
import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';

import {
    Keypair,
    Signer,
    TransactionInstruction,
    Connection,
    TransactionMessage,
    VersionedTransaction,
    PublicKey,
} from "@solana/web3.js";

import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import {
    SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
    SPL_NOOP_PROGRAM_ID,
} from "@solana/spl-account-compression";
import {
    PROGRAM_ID as BUBBLEGUM_PROGRAM_ID,
    TokenProgramVersion,
    createMintToCollectionV1Instruction,
} from "@metaplex-foundation/mpl-bubblegum";

export default function End() {
    const { publicKey, signTransaction, sendTransaction } = useWallet();
    // const { connection } = useConnection()

    async function sendVersionedTx(
        connection: Connection,
        instructions: TransactionInstruction[],
        payer: PublicKey,
        signers: Signer[]
    ) {
        let latestBlockhash = await connection.getLatestBlockhash();
        console.log(payer, 'payer')
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
            new Uint8Array(JSON.parse(process.env.NEXT_PUBLIC_PAYER_SRC.toString()))
        );
        console.log(payerPubKey.publicKey.toBase58(), 'bs58')
        const connection = new Connection("https://rpc-devnet.helius.xyz/?api-key=bab18f15-583b-41a2-b45d-e05fee975208")

        const merkleTree = Keypair.fromSecretKey(
            new Uint8Array(JSON.parse(process.env.NEXT_PUBLIC_MERKLE_TREE_SRC.toString()))
        );

        const [treeAuthority, _bump] = PublicKey.findProgramAddressSync(
            [merkleTree.publicKey.toBuffer()],
            BUBBLEGUM_PROGRAM_ID
        );

        const collectionMint = new PublicKey(process.env.NEXT_PUBLIC_COLLECTION_MINT);
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

        const ix = await createMintToCollectionV1Instruction(
            {
                merkleTree: merkleTree.publicKey,
                treeAuthority: treeAuthority,
                leafOwner: publicKey,
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
                    name: "Pyre",
                    primarySaleHappened: true,
                    sellerFeeBasisPoints: 0,
                    symbol: "PYR",
                    uri: process.env.NEXT_PUBLIC_NFT_METADATA,
                    uses: null,
                    editionNonce: null,
                    tokenStandard: null,
                    tokenProgramVersion: TokenProgramVersion.Original,
                },
            }
        );
        // let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
        // const transaction = new Transaction();
        // transaction.add(ix);

        // const {
        //     context: { slot: minContextSlot },
        //     value: { blockhash, lastValidBlockHeight },
        // } = await connection.getLatestBlockhashAndContext();

        // transaction.recentBlockhash = blockhash;
        // transaction.feePayer = publicKey;

        // console.log(transaction)
        // // const serializedTransaction = transaction.serialize();
        // // console.log(serializedTransaction, 'a')

        // const signature = await signTransaction(transaction)
        // console.log(signature)
        // const sendTX = await sendAndConfirmTransaction(transaction, connection, [process.env.NEXT_PUBLIC_MERKLE_TREE_SRC],
        //     {
        //       commitment: "confirmed",
        //       skipPreflight: true,
        //     });
        // console.log(sendTX, 'sendtx')

        console.log(ix)
        const stx = await sendVersionedTx(connection, [ix], payerPubKey.publicKey, [
            payerPubKey,
        ]);

        console.log(`Transaction sent: ${stx}`);
        // return transaction
    }

    // async function mintCNFT() {
    //     // const RPC_URL:any = process.env.HELIUS_RPC
    //     // console.log(RPC_URL, 'a', process.env.HELIUS_RPC)
    //     try {

    //         const connection = new Connection("https://rpc-devnet.helius.xyz/?api-key=bab18f15-583b-41a2-b45d-e05fee975208");
    //         const { data } = await mintCNFT()
    //         console.log(data)

    //         data.programId = new PublicKey(data.programId)
    //         console.log(data)
    //         let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
    //         let transaction = new Transaction();
    //         transaction.add(data);
    //         transaction.recentBlockhash = blockhash;
    //         transaction.feePayer = publicKey;
    //         console.log(transaction)
    //         // data.instructions[0].programId = new PublicKey(data.instructions[0].programId)
    //         transaction = await signTransaction(data)
    //         console.log(transaction, 'a')
    // const sig = await sendAndConfirmTransaction(
    //     connection,
    //     transaction,
    //     [COLLECTION_KEY],
    //     {
    //       commitment: "confirmed",
    //       skipPreflight: true,
    //     }
    //   );
    // console.log(sig)
    // const sig = await signTransaction(transaction);
    // const tx = await sendVersionedTx(connection, [data], publicKey, [
    // keypair,
    // ]);            
    // const signature = await sendTransaction(
    //     transaction,
    //     connection,
    // );
    // console.log("%%%%%%%%%")
    // console.log(signature)

    // await connection.confirmTransaction(signature);
    // const sig = await sendAndConfirmTransaction(
    //     connection,
    //     transaction,
    //     [new PublicKey(publicKey)],
    //     // [COLLECTION_KEY],
    //     {
    //       commitment: "confirmed",
    //       skipPreflight: true,
    //     }
    //   );
    // console.log("%%%%%%")
    // console.log(sig)
    // console.log("%%%%%%")

    // }
    // catch (err) {
    //     console.log(err)
    // }
    // }

    return (
        <div className='flex items-center w-full h-full flex-col bg-zinc-950 animate-fade py-12'>


            {/* <div className='flex items-start md:items-center flex-col font-extrabold text-7xl leading-normal'>
                <span className='flex leading-none'>you have reached</span>
                <span className='flex text-orange-400 leading-none'>the end!</span>
            </div> */}


            <div className="flex h-full w-full items-center justify-center flex-col space-y-8">
                <div className="flex h-96 items-center rounded-md border border-zinc-800">
                    <img className="flex w-full h-full rounded-md" src="/pyre-trophy.png"></img>
                </div>

                <button
                    className="flex text-2xl text-zinc-800 font-medium tracking-widest duration-200 items-center justify-center px-12 xl:px-12 py-4 rounded-full overflow-show bg-orange-400 hover:bg-orange-300"
                    onClick={() => mintCNFT(publicKey)}
                >
                    mint nft
                </button>
            </div>


        </div>
    )
}