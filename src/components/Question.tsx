import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from './AppBar';
import Hints from './Hints';
import 'highlight.js/styles/default.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import javascript from 'highlight.js/lib/languages/javascript';
import Demo from './Demo';

hljs.configure({
    ignoreUnescapedHTML: true
  });
hljs.registerLanguage('javascript', javascript);

export default function Question({ setSelectedComponent, question, questions, progress, setProgress, setQuestions }: any) {

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
    const [copy, setCopy] = useState(<Image className='flex duration-200 opacity-70' alt="copy" src="/copy.svg" width={20} height={20}></Image>)

    function copyConf() {
        console.log(copy, 'c')
        setCopy(<Image className='flex duration-200' alt="check" src="/check.svg" width={24} height={24}></Image>)
        setTimeout(() => {
            setCopy(<Image className='flex duration-200 opacity-70' alt="copy" src="/copy.svg" width={20} height={20}></Image>)
        }, 500);
    }
    let copyContext =
        <div onClick={() => {
            navigator.clipboard.writeText(context)
            setDisplayedContext("Copied!")
            setTimeout(() => {
                setDisplayedContext(context.slice(0, 4) + '..' + context.slice(-4));
            }, 1000);
        }}

            className={`flex w-max font-medium text-zinc-900 dark:text-zinc-300 p-2 duration-200 bg-zinc-200 dark:bg-zinc-950 border-2 border-zinc-900 dark:hover:border-orange-400 space-x-2 cursor-pointer rounded-full px-4 py-2 justify-center`}>
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

    useEffect(() => {
        hljs.initHighlighting();
    }, []);

    function handleCorrect() {
        setSolved(true);
        setProgress(progress += question.difficulty);

        let newArr: any = questions
        const index = questions.findIndex((e: any) => e.name === question.name);
        if (index !== -1) {
            newArr.splice(index, 1);
        }
        setQuestions(newArr)

        setTimeout(() => {
            setSelectedComponent('QuestionMenu')
        }, 1000)
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
            <div key={i} className={`flex bg-zinc-800 rounded-md items-center justify-center p-3 xl:p-4 w-max font-semibold`}>{question.tags[i]}</div>
        )
    }

    if ((progress!=0)&&question.api=="sol_held"){
        setSelectedComponent("QuestionMenu")
    }

    return (
        <div className='flex items-center justify-center h-full w-full flex-col bg-zinc-300 dark:bg-zinc-950 animate-fade'>

            <AppBar setSelectedComponent={setSelectedComponent} progress={progress} component="Question" ></AppBar>

            <div className='flex w-full h-full p-4 md:p-0 justify-center xl:items-center overflow-y-scroll xl:overflow-y-hidden'>

                <div className='flex justify-center w-full h-max xl:h-full flex-col xl:items-center space-y-12'>

                    <div className='flex flex-col space-y-16 xl:space-y-0 xl:space-x-16 xl:items-center w-full h-full xl:flex-row'>

                        <div className='flex rounded-lg xl:rounded-none flex-col items-center space-y-8 xl:space-y-8 justify-between h-full bg-zinc-100 dark:bg-zinc-950 xl:w-1/2 overflow-y-scroll scrollbar'>

                            <div className='text-2xl xl:text-5xl font-semibold tracking-wider text-zinc-900 dark:text-zinc-200 w-full px-6 py-6 xl:py-8'>{(question.name)}</div>

                            <div className='flex w-full flex-col px-6'>
                                <div className='flex text-md text-zinc-800 dark:text-zinc-400 rounded-md xl:text-lg tracking-wider'>{question.api == 'sol_held' ? (<Demo copyContext={copyContext}></Demo>) : (question.description)}</div>
                            </div>

                            <>
                                {question.api == 'sol_held' ? (<div></div>) : (copyContext)}
                            </>

                            <div className='flex w-full flex-col space-y-4 px-6 pb-6'>
                                <a href={question.docs} target='_blank' className='flex w-full dark:bg-zinc-950 border-2 border-zinc-900 hover:border-orange-400 text-lg tracking-widest text-zinc-900 dark:text-zinc-300 font-medium duration-200 rounded-lg px-4 py-3 justify-between'>
                                    <div className='flex'>
                                        DOCS
                                    </div>
                                    <Image className='flex duration-200' alt="link" src="/link.svg" width={16} height={16}></Image>
                                </a>

                                <Hints content={question.hints}></Hints>
                            </div>
                        </div>

                        <div className='flex flex-col h-full space-y-8 px-0 xl:px-8 justify-between rounded-lg xl:w-1/2'>

                            {/* <div className='flex flex-col w-full h-full rounded-lg bg-zinc-800 overflow-x-scroll xl:overflow-hidden resize-y'>

                                <div className='flex flex-row justify-between bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-medium px-3 py-2'>
                                    <div className='flex text-md font-medium tracking-widest text-zinc-200'>CODE SNIPPET</div>
                                    <div onClick={() => {
                                        navigator.clipboard.writeText(question.code)
                                        setCopyCode("Copied!")
                                        setTimeout(() => {
                                            setCopyCode("Copy");
                                        }, 1000);
                                    }}

                                        className={`flex duration-200 cursor-pointer rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 justify-center`}>

                                        <div className='flex space-x-2 w-max'>
                                            <div className=''>{copyCode}</div>
                                            <>{
                                                (copyCode == "Copied!") ?
                                                    (
                                                        <Image className='duration-200 text-zinc-300 fill-orange-400' alt="check" src="/check.svg" width={16} height={16}></Image>
                                                    ) : (
                                                        <Image className='duration-200 text-zinc-300 fill-orange-400' alt="copy" src="/copy.svg" width={16} height={16}></Image>
                                                    )
                                            }
                                            </>
                                        </div>

                                    </div>
                                </div>
                                <pre className='flex w-full h-full bg-zinc-900 rounded-lg rounded-t-none '><code style={{ background: '#18181b' }} className="js no-scrollbar rounded-lg">
                                    {question.code}
                                </code></pre>
                            </div> */}

                            <div className="mockup-code pb-0 mt-8 bg-zinc-950 bg-transparent border-2 border-zinc-900 overflow-scroll no-scrollbar">
                                <pre className='flex'><code style={{ background: '#09090b' }} className="js overflow-x-scroll scrollbar rounded-lg">{question.code}</code></pre>
                            </div>

                            
                            <a target='_blank' href={question.replit} className='flex cursor-pointer flex-grow w-full border-2 border-zinc-900 rounded-2xl hover:border-orange-400 duration-200'>
                                <iframe src={question.replit} className='flex w-full h-full rounded-2xl cursor-pointer'/>
                            </a>

                            <div className='flex py-16 '>
                                <form onSubmit={handleSubmit} className={`flex duration-200 ${(solved) ? (`border-green-500`) : (submit == false ? ('border-2 border-zinc-200 dark:border-zinc-900') : ('border-red-500 animate-shake'))} border-2 rounded-full w-full items-center justify-center`}>
                                    <input
                                        type="text"
                                        value={answer}
                                        className="flex px-4 py-2 rounded-l-full w-full outline-0 bg-zinc-200 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-300 placeholder-zinc-500"
                                        onChange={(e: any) => setAnswer(e.target.value)}
                                        placeholder={question.example_answer}
                                    />
                                    <button className='flex items-center justify-center h-10 p-2 px-4 rounded-r-full bg-zinc-200 dark:bg-zinc-950 font-bold text-white duration-200 cursor-pointer' type="submit">

                                        <div className='flex justify-center items-center'>{(
                                            load ? (
                                                <svg className="flex animate-spin h-5 w-5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) :
                                                (
                                                    <Image className='opacity-70 hover:opacity-100 duration-200' alt="check" src="/check.svg" width={24} height={24}></Image>
                                                ))}
                                        </div>
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>

            </div>



        </div>
    )
}