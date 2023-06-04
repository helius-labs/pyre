import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import AppBar from './AppBar';

export default function Menu({ setSelectedComponent, question, questions, progress, setProgress, setQuestions }: any) {

    let wallets = [
        "EHyagVK6vWdhyp8Mn3NGLeC33LtQyPdDs1idNiBddTjF",
        "FpscJFipKBoAFXjhXfrruWyhsoNFisu8H8kLDdw1k8yH",
        "H7y6nvRCqe96ip1iYT5Hnjd7HMzRrN1nM8Z3d2Ad5LEk",
        "CAyxRpZ5dJzww7AjTf2pM8R6UNDfSLuHkouoHTyeu9rC",
        "D77Jk7KfBKWrtMfaZDLJTLhd1dFac2YAM6CoiwzSYnp7",
        "AmoRXq81SmTSn1M2ZMSo6zuzCjrYAkCVimZWqXAgaLDt",
        "GkEVXEapXkxc7pScePBP37BJaRBycyEPBYaS7uYJuq8m",
        "6qwiJTLDPS222HsdsN423f1VAPxyJGc8LHKZSBzQKK5U",
        "T1d3crwf5cYLcVU5ojNRgJbJUXJta2uBgbtev2xWLAW",
    ]

    let tokens = [
        "5B72RArx2mQvudmS9CBZzDFhNC7FTFtp2k2GEhQV6HqZ",
        "9ARngHhVaCtH5JFieRdSS5Y8cdZk2TMF4tfGSWFB9iSK",
        "F9Lw3ki3hJ7PF9HQXsBzoY8GyE6sPoEZZdXJBsTTD2rk",
        "BDR44BrnjaeuvNhYkznu5YW5DzLda7BSGsWJ6jvDRaYS",
        "6p1PPMYGkKjBCXmWsBAETqiAEAEekgTaEMjmPUKLzjUc",
        "7K6kTmwCSbm7nDhiURXZfedhFyYoxEEoguMrRjEQbcbh",
        "B1rzqj4cEM6pWsrm3rLPCu8QwcXMn6H6bd7xAnk941dU",
        "whSxaMUmZ66xTj7ZLkx28T9Nzwgc1chWZmoPSyovgJC",
        "HthgzJVNKYeH4PjcwdAnq8qM4HzxzWNK1iEYSrcjAyfe",
        "HeVXJCURxNSjkXESJvnofvmxZ3bAziepJWLk5EfqEt3y",
        "EK4FizYeActi1CAt4j48Qb5bNsY38RLydnugsvvaj57e",
        "6a76kXVZ5QA89yuoksAL7Ymha2DFAdXGa82sxtFYABH7",
        "G1VBATFRMBFccq57Xtn6ZVT1Nby4FDZXLU9piz3gzpAP"
    ]

    let transactions = [
        "4gWppNT3N7J4se2E6FAhG9BK7FUP5y5etDyBPPEJ7hz1M2UgAD2pfMieNAVbwr2NuZF8fNtUEEkNPki8Dea7NFoW",
        "5hdwrwgfbFDbxsigaqHEB8syYrWjaidRec96xdbP7V4BPSMuYBk8yFeq8jdWxDPgK7CYLwEV2bAgSuPbf55HGzvg",
        "5HLQwnpm2jLP4FJwin7Ae59ayXgJ9U41H5JushgkY1kQEe5q9Hnk5ksNPt6f7YpayhWp4xTqya2WKjYaUghbnhTV",
        "5xHyU7YfXQRvpn6LxEgVKmT8XuquLzp99T2ewxaiNjfLwz6iuWKVfUv3ZArNDKytY7dakKwThtpWygwJcvr5wveU",
        "5rx5m8MFM1rvWfjH2vNe7vix1d1Pyb4TKUApM5M9Fmr3XEeWqFizNZk4XVhB8Xa5VyfirfpfrEbMdXxvzVLS3amh",
        "2xnGMnYxi9dbZJ6pTcNeYM98o7TtoVvn6SXrewUHsNFVRbZ3e8iwGdjGdovJ7ATmiRMsZa6rHquZWPqxkEdva1Fe",
        "2TZPpjc9Kp8pDtCXFwTBkL8RzFivheMVKqzqv3TFjFaLhsbDsQuWFkAR4NG7sfRCVNx44N5rwiqrjA1aLbzwcQQc"
    ]

    const [context, setContext] = useState(question.type == "wallet" ? (wallets[Math.floor(Math.random() * wallets.length)]) :
        question.type == "nft" ? (tokens[Math.floor(Math.random() * tokens.length)]) :
            transactions[Math.floor(Math.random() * transactions.length)])
    const [displayedContext, setDisplayedContext] = useState(context.slice(0, 4) + '..' + context.slice(-4))


    const [answer, setAnswer] =
        useState('')
    const [solved, setSolved] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [load, setLoad] = useState(false)
    const [cachedAnswer, setCachedAnswer] = useState('')


    function handleCorrect() {
        console.log('e')
        setSolved(true);
        setProgress(progress += question.difficulty);

        let newArr: any = questions
        const index = questions.findIndex((e: any) => e.name === question.name);
        if (index !== -1) {
            newArr.splice(index, 1);
        }
        setQuestions(newArr)

        setTimeout(() => {
            setSelectedComponent('Menu')
        }, 500)
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        if (cachedAnswer) {
            if (cachedAnswer == answer) {
                handleCorrect()
            }
            else {
                setLoad(false)

            }
        }

        setLoad(true)
        const response = await axios.post(`/api/${question.api}`, { context: context });
        setCachedAnswer(response.data)
        setSubmit(true)
        try {
            if (response.data == answer) {
                if (!cachedAnswer) {
                    handleCorrect()
                }
            }
            else if (response.data != answer) {
                setLoad(false)
            }
        }
        catch (err: any) {
            console.log(err.response.data)
        }
    }

    let tags = [];
    for (let i = 0; i < question.tags.length; i++) {
        tags.push(
            <div key={i} className='flex bg-zinc-800 rounded-md items-center justify-center p-2 w-max font-medium'>{question.tags[i]}</div>
        )
    }

    return (
        <div className='flex items-center justify-center h-full w-full flex-col bg-zinc-950 animate-fade'>

            <AppBar setSelectedComponent={setSelectedComponent} progress={progress} component="Question" ></AppBar>

            <div className='flex xl:w-1/2 h-full p-4 py-8 flex-col justify-center items-center justify-between xl:justify-evenly overflow-hidden'>

                <div className='flex justify-center h-full flex-col items-center justify-between'>

                    <div className='flex flex-row w-full justify-between'>

                        <div className='flex w-2/3 flex-col space-y-4 h-10'>
                            <div className='flex text-xl xl:text-4xl text-white font-bold'>{question.name}</div>

                            <div className='flex flex-row justify-between h-full'>
                                <div className='flex flex-row w-1/2 xl:w-1/3 h-8 space-x-4'>
                                    <div className='flex w-full bg-orange-500 rounded-md'></div>
                                    <div className={`flex w-full rounded-md ${(question.difficulty > 1) ? (`bg-orange-500`) : (`bg-zinc-800`)}`}></div>
                                    <div className={`flex w-full rounded-md ${(question.difficulty > 2) ? (`bg-orange-500`) : (`bg-zinc-800`)}`}></div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col items-center justify-center space-y-4 text-lg tracking-wider leading-5'>
                            <div className='flex bg-zinc-800 h-10 rounded-md items-center justify-center p-2 w-full font-semibold'>{(question.type.toUpperCase())}</div>
                            <div className="flex space-x-4 flex-row h-8 justify-end items-end w-full">
                                {tags}</div>
                        </div>

                    </div>

                    <div className='flex flex-col space-y-8 justify-center items-center w-3/5'>
                        
                        <div className='flex items-center text-zinc-300 bg-zinc-900 p-3 rounded-md '>{question.description}</div>

                        <div onClick={() => {
                            navigator.clipboard.writeText(context)
                            setDisplayedContext("Copied!")
                            setTimeout(() => {
                                setDisplayedContext(context.slice(0, 4) + '..' + context.slice(-4));
                            }, 1000);
                        }}

                            className={`flex w-max font-medium duration-200 opacity-70 hover:opacity-100 space-x-2 cursor-pointer rounded-full bg-zinc-800 px-4 py-2 justify-center`}>
                            <div>{displayedContext}</div>

                            <>{
                                (displayedContext == "Copied!") ?
                                    (
                                        <Image className='duration-200' alt="check" src="/check.svg" width={16} height={16}></Image>
                                    ) : (
                                        <Image className='duration-200' alt="copy" src="/copy.svg" width={16} height={16}></Image>
                                    )
                            }
                            </>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className={`flex py-8 duration-200 ${(solved) ? (`border-2 border-green-500`) : (submit == false ? ('') : ('border-2 border-red-500 animate-shake'))} rounded-lg w-full items-center justify-center`}>
                        <input
                            type="text"
                            value={answer}
                            className="flex px-4 py-2 rounded-l-lg w-full outline-0 bg-zinc-800 text-white"
                            onChange={(e: any) => setAnswer(e.target.value)}
                            placeholder={question.example_answer}
                        />
                        <button className='flex items-center justify-center h-10 p-2 rounded-r-lg bg-zinc-800 font-bold text-white duration-200 cursor-pointer' type="submit">

                            <div className='flex justify-center items-center'>{(
                                load ? (
                                    <svg className="flex animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) :
                                    (
                                        <Image className='opacity-70 hover:opacity-100 duration-200' alt="back" src="/check.svg" width={24} height={24}></Image>
                                    ))}
                            </div>
                        </button>
                    </form>

                </div>

            </div>



        </div>
    )
}