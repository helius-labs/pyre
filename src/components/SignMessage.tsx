import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { FC, useCallback, useEffect } from 'react';
import dynamic from "next/dynamic";

import { verify } from '@noble/ed25519';

import * as ed from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha512';
ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

export const SignMessage: FC = () => {

    const { publicKey, signMessage } = useWallet();

    useEffect(()=>{
        onClick()
    }, [publicKey])

    const onClick = useCallback(async () => {
        try {
            if (!publicKey) throw new Error('Wallet not connected!');
            if (!signMessage) throw new Error('Wallet does not support message signing!');
            const message = new TextEncoder().encode('Sign in to Pyre.');
            const signature = await signMessage(message);
            if (!verify(signature, message, publicKey.toBytes())) throw new Error('Invalid signature!');
            console.log("success", signature)

        } catch (error: any) {
            console.log('error', `Sign Message failed! ${error?.message}`);
        }
    }, [publicKey, signMessage]);

    return (
        <div className="flex flex-row justify-center">
            <div className="relative group items-center">
                <WalletMultiButtonDynamic
                // disabled={!publicKey}
                 className='relative z-10 bg-zinc-900 hover:bg-zinc-900 hover:opacity-100 duration-200 animate-fade' />                
            </div>
        </div>
    );
};