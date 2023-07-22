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

export default function Question({ setSelectedComponent, question, questions, progress, setProgress, setQuestions, completed, setCompleted }: any) {

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

    let cnft = [
        "F9aEsvqM1wUtLtDFsaY5m52Bkon4SgD7BbBczTbazSGS",
        "FNt6A9Mfnqbwc1tY7uwAguKQ1JcpBrxmhczDgbdJy5AC",
        "JDUqG3RvZ8ZTYrzabxShoZA986itEe9dsL449FkayJM8"
    ]

    const [codeFormat, setCodeFormat] = useState("js");
    const [codeExample, setCodeExample] = useState(question.js_code);

    useEffect(()=>{
        if (codeFormat=="js") {
            setCodeExample(question.js_code)
        }
        else {
            setCodeExample(question.py_code)
        }
    }, [codeFormat])


    const [context, setContext] = useState<any>(randomContext(question.type))

    function randomContext(type: string) {
        switch (type) {

            case null:
                return null
            case "wallet":
                return wallets[Math.floor(Math.random() * wallets.length)]
            case "nft":
                return tokens[Math.floor(Math.random() * tokens.length)]
            case "tx":
                return transactions[Math.floor(Math.random() * transactions.length)]
            case "cnft":
                return cnft[Math.floor(Math.random() * cnft.length)]
            default:
                break
        }
    }

    const [displayedContext, setDisplayedContext] = useState(context ? (context.slice(0, 4) + '..' + context.slice(-4)) : null)


    const [answer, setAnswer] =
        useState('')
    const [solved, setSolved] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [load, setLoad] = useState(false)
    const [cachedAnswer, setCachedAnswer] = useState('')
    const [codeOutput, setCodeOutput] = useState("Run code for example output.")

    const [copy, setCopy] = useState(<svg className="text-current" width={20} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21,8H9A1,1,0,0,0,8,9V21a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V9A1,1,0,0,0,21,8ZM20,20H10V10H20ZM6,15a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H15a1,1,0,0,1,1,1V5a1,1,0,0,1-2,0V4H4V14H5A1,1,0,0,1,6,15Z"></path></g></svg>)

    function copyConf() {
        
        if (codeFormat=="js") {
            navigator.clipboard.writeText(question.js_code)
        }
        else {
            navigator.clipboard.writeText(question.py_code)
        }

        setCopy(<svg className="text-current duration-200" width={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Check"> <path id="Vector" d="M6 12L10.2426 16.2426L18.727 7.75732" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>)
        setTimeout(() => {
            setCopy(<svg className="text-current duration-200" width={20} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21,8H9A1,1,0,0,0,8,9V21a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V9A1,1,0,0,0,21,8ZM20,20H10V10H20ZM6,15a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H15a1,1,0,0,1,1,1V5a1,1,0,0,1-2,0V4H4V14H5A1,1,0,0,1,6,15Z"></path></g></svg>)
        }, 750);
    }
    let copyContext =

        context ?
            <div onClick={() => {
                navigator.clipboard.writeText(context)
                setDisplayedContext("Copied!")
                setTimeout(() => {
                    setDisplayedContext(context.slice(0, 4) + '..' + context.slice(-4));
                }, 1000);
            }}

                className={`flex w-max font-medium text-zinc-300 p-2 duration-200 bg-zinc-950 border-2 border-zinc-900 hover:border-orange-400 space-x-2 cursor-pointer rounded-full px-4 py-2 justify-center`}>
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
            </div> : null

    useEffect(() => {
        hljs.initHighlighting();
    }, [codeOutput, codeFormat]);

    function handleCorrect() {
        setSolved(true);
        setProgress(progress += question.difficulty);

        if (!completed.includes(question.api)) {
            setCompleted([...completed, question.api])
        }

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

    async function questionQuery(type: string) {
        let response = await axios.post(`/api/${question.api}`, { context: context, type: type });
        if (type == "example") {
            setCodeOutput(JSON.stringify(response.data, null, 4))
        }
        return response.data
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
        const response = await questionQuery("answer")
        setCachedAnswer(response)
        setSubmit(true)
        try {
            if (response == answer) {
                if (!cachedAnswer) {
                    handleCorrect()
                }
            }
            else if (response.data != answer) {
                setLoad(false)
                setTimeout(() => {
                    setSubmit(false)
                }, 3000)
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

    if ((progress != 0) && question.api == "sol_held") {
        setSelectedComponent("QuestionMenu")
    }

    return (
        <div className='flex items-center justify-center h-full w-full flex-col bg-zinc-950 animate-fade'>

            <AppBar setSelectedComponent={setSelectedComponent} progress={progress} questions={questions} component="Question" ></AppBar>

            <div className='flex w-full h-full p-4 md:p-0 justify-center xl:items-center overflow-y-scroll xl:overflow-y-hidden'>

                <div className='flex justify-center w-full h-max xl:h-full flex-col xl:items-center space-y-12 xl:space-y-0'>

                    <div className='flex flex-col space-y-16 xl:space-y-0 xl:items-center w-full h-full xl:flex-row'>

                        <div className='flex rounded-lg xl:rounded-none flex-col items-center space-y-8 xl:space-y-8 justify-between h-full bg-zinc-950 xl:w-1/2 overflow-y-scroll scrollbar'>

                            <div className='flex w-full flex-col'>
                                <div className='text-2xl xl:text-5xl font-semibold tracking-wider text-zinc-200 w-full px-6 py-6 xl:py-8'>{(question.name)}</div>

                                <div className='flex w-full flex-col px-6'>
                                    <div className='flex text-md text-zinc-400 rounded-md xl:text-lg tracking-wider'>
                                        {question.api == 'sol_held' ? (
                                            <Demo copyContext={copyContext} handleCorrect={handleCorrect}></Demo>
                                        ) : (question.description)}</div>
                                </div>
                            </div>
                            <>
                                {question.api == 'sol_held' ? (<div></div>) : (copyContext)}
                            </>

                            <>
                                {question.info ? (
                                    <div className='flex w-full flex-col space-y-4 px-6'>
                                        <div className="flex flex-col gap-4 border border-orange-400 rounded-xl py-4 px-4 text-orange-400 tracking-widest">
                                            <span className='flex flex-row space-x-4'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="text-orange-400 w-6 h-6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                <span className="text-lg font-medium">INFO</span>
                                            </span>
                                            <span>
                                                {question.info}</span>
                                        </div>
                                    </div>
                                ) : (<div></div>)}
                            </>

                            <div className='flex w-full flex-col space-y-4 px-6 pb-6'>
                                <a href={question.docs} target='_blank' className='flex w-full bg-zinc-900 hover:bg-zinc-800 text-lg tracking-widest text-zinc-300 font-medium duration-200 rounded-lg px-4 py-3 justify-between'>
                                    <div className='flex'>
                                        DOCS
                                    </div>
                                    <Image className='flex duration-200' alt="link" src="/link.svg" width={16} height={16}></Image>
                                </a>

                                <Hints content={question.hints}></Hints>
                            </div>
                        </div>

                        <div className='flex flex-col h-full space-y-8 pr-2 justify-between rounded-lg xl:w-1/2'>
                            <div className='flex flex-col mt-8 space-y-0 h-4/5 w-full overflow-x-hidden'>

                                <div className='flex flex-row space-x-8 w-full justify-between items-center border border-b-0 border-zinc-900  rounded-t-lg px-4 py-2'>

                                    <div className='flex tracking-widest text-zinc-400 font-bold text-sm bg-zinc-900 p-1 rounded-lg space-x-4'>
                                        <div onClick={()=>{setCodeFormat("js")}} className={`flex ${codeFormat=="js"?"bg-zinc-800":"bg-zinc-900"} p-2 rounded-lg hover:bg-zinc-800 cursor-pointer duration-200`}>JAVASCRIPT</div>
                                        <div onClick={()=>{setCodeFormat("py")}} className={`flex ${codeFormat=="py"?"bg-zinc-800":"bg-zinc-900"} p-2 rounded-lg hover:bg-zinc-800 cursor-pointer duration-200`} >PYTHON</div>
                                    </div>

                                    <div className='flex flex-row space-x-4 items-center justify-center'>
                                        <div onClick={() => {
                                            {
                                                if (codeOutput == "Run code for example output.") { questionQuery("example"); setCodeOutput("Loading...") }
                                            }
                                        }} className='flex w-max px-2 hover:bg-zinc-900 space-x-8 hover:opacity-100 tracking-widest text-xs w-8 h-8 rounded-md justify-center items-center hover:border-orange-400 duration-200 cursor-pointer text-zinc-400 hover:text-orange-400'>

                                            <>{
                                                (codeOutput == "Loading...") ? (

                                                    <div className='flex space-x-2 w-16 justify-between items-center w-max tracking-widest flex-row'>
                                                        <svg className="flex text-current animate-spin" width={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>                                                    <span className='flex font-bold'>RUN</span>
                                                    </div>
                                                ) : (

                                                    <div className='flex space-x-2 w-16 justify-between items-center w-max tracking-widest flex-row'>
                                                        <svg className='flex text-current' width={24} fill="currentColor" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)" stroke="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M694.018 926.244c-27.296 18.796-27.3 49.269 0 68.067l509.836 351.074c27.296 18.797 49.424 7.18 49.424-25.959V601.13c0-33.133-22.125-44.757-49.424-25.959L694.018 926.244Z" fill-rule="evenodd"></path> </g></svg>
                                                        <span className='flex font-bold'>RUN</span>
                                                    </div>
                                                )
                                            }</>

                                        </div>
                                        <div onClick={() => { copyConf() }} className='flex duration-200 hover:bg-zinc-900 hover:opacity-100 tracking-widest text-xs border-zinc-900 w-max px-2 h-8 rounded-md justify-center items-center hover:border-orange-400 duration-200 cursor-pointer text-zinc-400 hover:text-orange-400'>
                                            {copy}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full bg-zinc-950 border border-b-0 border-zinc-900 max-h-[40%]">
                                    <pre className='flex w-full h-full'><code style={{ background: '#09090b' }} className="js flex w-full border-b border-zinc-900 overflow-x-scroll scrollbar">
                                    
                                        {
                                            question.py_code ? 
                                            codeFormat=="js"? question.js_code : question.py_code : question.js_code
                                        }
                                    
                                    </code></pre>
                                </div>

                                <div className="w-full max-h-[50%] bg-zinc-950 border border-zinc-900 rounded-b-lg">
                                    <pre className="flex w-full h-full flex-row mb-0 overflow-hidden"><code style={{ background: '#09090b' }} className="flex w-full border-b border-zinc-900 js rounded-lg scrollbar max-h-1/3 flex-col-reverse">{codeOutput}</code></pre>
                                </div>
                            </div>

                            <div className='flex space-x-4 pb-16 '>
                                <form onSubmit={handleSubmit} className="flex w-full space-x-4">
                                    <input
                                        type="text"
                                        value={answer}
                                        className={`flex duration-200 ${(solved) ? (`border-green-500`) : (submit == false ? ('border border-zinc-900') : ('border-red-500 animate-shake'))} border rounded-full w-full items-center justify-center px-4 py-2 rounded-full w-full outline-0 bg-zinc-950 text-zinc-300 placeholder-zinc-500`}
                                        onChange={(e: any) => setAnswer(e.target.value)}
                                        placeholder={question.example_answer}
                                    />

                                    <button className='flex bg-transparent border-2 rounded-md border-orange-400 opacity-90 hover:opacity-100 duration-200 items-center justify-center h-10 p-2 px-4 font-bold text-white duration-200 cursor-pointer' type="submit">

                                        <span className='flex justify-center font-semibold text-orange-400 tracking-widest'>{(
                                            load ? (
                                                <svg className="flex w-20 animate-spin h-5 w-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) :
                                                (
                                                    <span className='w-20'>SUBMIT</span>
                                                ))}</span>

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