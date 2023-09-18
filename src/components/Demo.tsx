import { useState, useEffect } from 'react';
import 'highlight.js/styles/default.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/nebula.css';
import javascript from 'highlight.js/lib/languages/javascript';

export default function Demo({ copyContext, handleCorrect }: any) {

    const [context, setContext] = useState('G9cBr5yC67Z39mGNDY6PWcAn2a5XJLH9b2PFAVRQ7sFr')

    useEffect(() => {
        hljs.initHighlighting();
    }, []);

    return (
        <div className='flex max-w-full flex-col space-y-12'>

            <div onClick={() => { handleCorrect() }} className="absolute cursor-pointer top-8 right-8 z-20 text-lg text-zinc-800 font-medium tracking-widest duration-200 items-center justify-center px-8 py-2 rounded-md overflow-show bg-orange-400 hover:bg-orange-300">
                skip demo
            </div>

            <div className='flex text-md font-medium text-zinc-300 rounded-md xl:text-xl'>
                You are provided a wallet address. Make use of Helius' services in order to retrieve the wallet's exact native balance and convert into SOL.
            </div>


            <div className='flex w-full justify-center'>
                <div className='flex space-y-2 flex-col items-center'>
                    {copyContext}
                    <div className='text-xs text-zinc-500 font-bold tracking-widest'>{"COPY WALLET"}</div>
                </div>
            </div>

            <div className='flex flex-col space-y-4'>
                <div className='flex text-lg text-zinc-300 xl:text-3xl font-semibold'>
                    Prerequisites
                </div>
                <ul className='list-inside list-disc space-y-1'>
                    <li>A way to make POST requests. You can fork a repl.it template <a className='text-orange-400 hover:text-orange-500 duration-200' href='https://replit.com/@TideLaw/pyre-demo' target='_blank'>here</a>.</li>

                    <li>An API key from <a className='text-orange-400 hover:text-orange-500 duration-200' href='https://dev.helius.xyz/dashboard/app' target='_blank'>Helius</a>.</li>
                </ul>
            </div>

            <div className='flex w-full flex-col space-y-6'>
                <div className='flex text-lg text-zinc-300 xl:text-3xl font-semibold'>
                    Walkthrough
                </div>
                <div className='flex w-full flex-col space-y-16'>

                    <div className='flex flex-col space-y-6 items-center'>

                        <div className='w-full'>Copy the boilerplate code provided on the right or fork your repl.it accordingly.</div>

                        <div>Different contexts is what makes Pyre special, whether it be transactions, wallets, or token addresses. They are randomized in each question for a unique experience.</div>

                        <div>{`We will have to edit the URL variable to include the context of the question, in this case it is the wallet address. We will replace <address> with this wallet address:`}</div>
                        {copyContext}
                    </div>

                    <div className='flex w-full flex-col space-y-6 items-start'>
                        <div>Once you have replaced the URL variable with the address provided, you can now input your API key, your complete URL should now look something like this:</div>
                        <div className='flex w-full rounded-lg border border-zinc-900 bg-zinc-950'>

                            <pre className='flex w-full rounded-2xl overflow-x-scroll no-scrollbar'><code style={{ background: '#09090b' }} className="js rounded-2xl w-full overflow-x-scroll no-scrollbar">
                                {`const url = "https://api.helius.xyz/v0/addresses/${context}/balances?api-key=<your-key>";`}
                            </code></pre>
                        </div>
                    </div>

                    <div className='flex w-full flex-col space-y-6 items-start'>
                        <div>You can now run the code and it should return something like this:</div>
                        <div className='flex w-full rounded-lg border border-zinc-900'>

                            <pre className='flex w-full rounded-lg overflow-x-scroll no-scrollbar'><code style={{ background: '#09090b' }} className="js rounded-2xl w-full overflow-x-scroll no-scrollbar">
                                {`balances:  {
    tokens: [
        {
        tokenAccount: '6XPjWrGJh9QJsknPWDP1ja5zLjyUKehzqfcaTou1X9BJ',
        mint: '5q1sBRfc9kaRoY6k9B61f9g6YR1CkYjNWkm8nYffj8nt',
        amount: 1,
        decimals: 0
        }
    ],
    nativeBalance: 7879160
    }`}
                            </code></pre>
                        </div>
                    </div>

                    <div className='flex w-full flex-col space-y-6 items-start'>
                        <div>The question asks for the native balance, or the amount of SOL a wallet has. From the data returned, we can determine it to be 7879160. However, this value is in Lamports, we'll have to convert it to a term we're familiar with, Solana. As 1 SOL is equivalent to 1 billion lamports, we'll need to divide our nativeBalance by 1 billion.</div>
                        <pre className='flex w-full border border-zinc-900 rounded-2xl overflow-x-scroll no-scrollbar'><code style={{ background: '#09090b' }} className="js rounded-2xl w-full overflow-x-scroll no-scrollbar">
                            {`console.log((data.nativeBalance/1000000000));`}
                        </code></pre>

                    </div>

                    <div className='flex flex-col space-y-6'>
                        <div>Below is the complete code and demo:</div>
                        <img className='flex' src="/pyre-demo-answer.png"></img>
                    </div>


                    <div className='flex flex-col space-y-6'>
                        <div>Simply input the answer for your specific context and complete the tutorial!</div>
                    </div>

                </div>
            </div>
        </div>
    )
}

