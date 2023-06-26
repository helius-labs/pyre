import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { FC, useCallback, useEffect } from 'react';
import dynamic from "next/dynamic";
import { SigninMessage } from "../../utils/SigninMessage"

import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";

const WalletMultiButtonDynamic = dynamic(
    async () =>
        (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
);

export const SignMessage = () => {
    const { data: session, status } = useSession();
    const wallet = useWallet();

    const handleSignIn = async () => {
        try {
            const csrf = await getCsrfToken();
            if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

            const message = new SigninMessage({
                domain: window.location.host,
                publicKey: wallet.publicKey?.toBase58(),
                statement: `Sign this message to sign in to the app.`,
                nonce: csrf,
            });

            const data = new TextEncoder().encode(message.prepare());
            const signature = await wallet.signMessage(data);
            const serializedSignature = bs58.encode(signature);

            signIn("credentials", {
                message: JSON.stringify(message),
                redirect: false,
                signature: serializedSignature,
            });



        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (wallet.connected && status === "unauthenticated") {
            handleSignIn();
        }
    }, [wallet.connected])

    return (
        <div className="flex flex-row justify-center">
            <div className="relative group items-center h-12">
                <> {
                    status == 'authenticated' ?
                        (
                            <a
                                href={`/api/auth/signout`}
                                className="flex items-center justify-center rounded z-10 bg-zinc-900 hover:bg-zinc-800 duration-200 animate-fade px-6 font-semibold text-lg h-12"
                                onClick={(e) => {
                                    e.preventDefault();
                                    signOut({redirect: false});
                                }}
                            >
                                Sign Out
                            </a>
                        ) : (
                            <WalletMultiButtonDynamic
                            // disabled={!publicKey}
                            className='relative z-10 bg-zinc-900 hover:bg-zinc-900 hover:opacity-100 duration-200 animate-fade' />
                        )
                }
                </>
            </div>
        </div>
    );
};