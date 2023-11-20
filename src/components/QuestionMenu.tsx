import AppBar from './AppBar';
import { useEffect, useState } from "react";
import ProgressBar from './ProgressBar';

export default function QuestionMenu({ APIKey, setAPIKey, completed, originalQuestions, setSelectedComponent, progress, track, setTrack, questions, setQuestion, sessionData }: any) {
    const [selectedTags, setSelectedTags] = useState<string[]>(trackSpecificQuestions());
    const [questionDIVs, setQuestionDIVs] = useState([]);
    const [trackProgress, setTrackProgress] = useState(0);

    useEffect(()=>{
        if (APIKey && APIKey.length>36) {
            console.log(APIKey.length)
            const regex = /[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/i;
            
            const strippedAPIKey = APIKey.match(regex)?.[0];
            
            setAPIKey(strippedAPIKey)

            localStorage.setItem('api-key', strippedAPIKey)
        }
    }, [APIKey])

    if (typeof window !== 'undefined') {
        // Initialize from localStorage
        let apiKey = localStorage.getItem('api-key') || "";
        setAPIKey(apiKey)
    }

    let tags = trackSpecificQuestions()
    let trackQuestions: any = [], remainingTrackQuestions:any = [];
    originalQuestions.map((i: any) => { if (i.tags.some((e: string) => { if (tags.includes(e)) { return e } })) { trackQuestions = [...trackQuestions, i] } })
    questions.map((e:any)=>{if (e.tags.some((e:string)=>{if (tags.includes(e)){return e}})){remainingTrackQuestions = [...remainingTrackQuestions, e]; }})

    function trackSpecificQuestions() {

        if (track == "COMPRESSION") {
            return ["DAS", "CNFT"]
        }
        if (track=="INTEGRATIONS") {
            return ["INTEGRATIONS"]
        }
        else {
            return ["DAS", "RPC", "ENHANCED API", "NFT API"]
        }
    }

    function setTags(tag: any) {
        if (!selectedTags) { setSelectedTags([tag]) }
        else {
            let newArray = [...selectedTags];
            if (!newArray.includes(tag)) {
                newArray.push(tag)
                setSelectedTags(newArray)
            }
            else {
                const index = selectedTags.findIndex((e: any) => e === tag);
                newArray.splice(index, 1)
                setSelectedTags(newArray)
            }
        }
    }
    // total and remaining parameter for progressbar
    if (progress == 0) {
        setSelectedComponent('Question');
        setQuestion(questions[0])
    }

    useEffect(() => {
        let organizedQuestions: any = [];
        for (let i = 0; i < remainingTrackQuestions.length; i++) {
            let tags = [];
            for (let x = 0; x < remainingTrackQuestions[i].tags.length; x++) {
                tags.push(
                    <div key={remainingTrackQuestions[i].tags[x] + i + x} className='flex border border-zinc-700 bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>{remainingTrackQuestions[i].tags[x]}</div>
                )
            }

            organizedQuestions.push(

                <div key={remainingTrackQuestions[i].api} onClick={() => { setSelectedComponent('Question'); setQuestion(remainingTrackQuestions[i]) }}
                    className={`flex bg-zinc-800 justify-between items-center animate-fade animate-fade-out w-full h-max rounded-lg hover:bg-zinc-700 duration-200 cursor-pointer`}>

                    <div className='flex rounded-lg w-full xl:w-2/3'>
                        <div className='flex flex-col w-10 space-y-2 p-2'>
                            <div className={`flex w-full h-1/3 rounded-md ${(remainingTrackQuestions[i].difficulty > 2) ? (`bg-orange-400`) : (`bg-zinc-900`)}`}></div>
                            <div className={`flex w-full h-1/3 rounded-md ${(remainingTrackQuestions[i].difficulty > 1) ? (`bg-orange-400`) : (`bg-zinc-900`)}`}></div>
                            <div className='flex w-full bg-orange-400 h-1/3 rounded-md'></div>
                        </div>

                        <div className='flex w-full flex-col p-2 gap-2 truncate'>
                            <div className='text-lg xl:text-lg font-medium truncate tracking-wider'>{remainingTrackQuestions[i].name}</div>
                            <div className="flex space-x-2 flex-row text-[10px] tracking-widest leading-5">
                                {tags}
                            </div>
                        </div>
                    </div>
                </div>
            )

        }
        setQuestionDIVs(organizedQuestions)
    }, [selectedTags])

    return (
        <div className="flex w-full flex-col bg-zinc-950">

            <AppBar setSelectedComponent={setSelectedComponent} progress={progress} questions={originalQuestions} component="QuestionMenu" ></AppBar>

            <div className='flex items-center h-full w-full flex-col bg-zinc-950 no-scrollbar'>


                <>{
                    sessionData.status == "authenticated" ? <div></div> :
                        <div onClick={() => { setSelectedComponent("Landing") }} className="toast toast-start bottom-16 lg:bottom-0 toast-bottom z-10 hover:opacity-90 cursor-pointer duration-200">
                            <div className="flex bg-yellow-400 px-6 py-4 rounded-xl">
                                <div className='flex bg-yellow-400 text-zinc-950'>Connect your wallet to save progress.</div>
                            </div>
                        </div>
                }</>

                        <div className="toast toast-bottom z-10 hover:opacity-90 cursor-pointer duration-200">
                            <div className="flex w-72 bg-zinc-900 p-2 rounded-xl ">
                                <input
                                        type="text"
                                        value={APIKey}
                                        className={`flex ${
                                            APIKey?.match(/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/i)?.[0]
                                            ?'border border-green-400':''} w-full text-zinc-400 duration-200 rounded-lg w-full items-start justify-center px-4 py-2 rounded-full w-full outline-0 bg-zinc-950 text-zinc-300 placeholder-zinc-500`}
                                        onChange={(e: any) => setAPIKey(e.target.value)}
                                        placeholder={"Input your Helius API key."}
                                    />
                            </div>
                        </div>

                <div className='flex xl:space-y-4 flex-col h-full w-full xl:w-2/3 items-center no-scrollbar p-4 xl:p-0 divide-ys divide-zinc-900'>

                    <div className='flex border-zinc-900 w-full flex-col md:flex-row xl:mt-12 space-y-4 md:space-y-0 justify-between py-4'>

                        <div className='flex w-full md:w-1/2 flex-col space-y-4 items-start justify-start text-zinc-300 font-semibold'>


                            <div className='flex flex-col space-y-1'>
                                <div className='flex text-md tracking-widest font-semibold'>FEATURED TAGS</div>

                                <div className='flex text-xs text-zinc-400 font-semibold tracking-widest uppercase'>Select a Tag</div>
                            </div>

                            <div className='flex flex-wrap flex-row gap-4 text-[12px] tracking-wider leading-5'>

                                <div className={`flex ${(selectedTags && selectedTags.some((e: any) => e == "DAS")) ? 'border-zinc-700' : 'border-transparent'} border bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium `}>DAS</div>
                                <div className={`flex ${(selectedTags && selectedTags.some((e: any) => e == "RPC")) ? 'border-zinc-700' : 'border-transparent'} border bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium `}>RPC</div>
                                <div className={`flex ${(selectedTags && selectedTags.some((e: any) => e == "ENHANCED API")) ? 'border-zinc-700' : 'border-transparent'} border bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium `}>ENHANCED API</div>
                                <div className={`flex ${(selectedTags && selectedTags.some((e: any) => e == "NFT API")) ? 'border-zinc-700' : 'border-transparent'} border bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium`}>NFT API</div>

                            </div>
                        </div>

                        <div onClick={() => { setTrack(false) }} className='flex w-full md:w-1/3 h-full flex-col md:items-end justify-between px-2 py-6 xl:py-2 hover:bg-zinc-900 cursor-pointer rounded-lg duration-200'>
                            <div className='flex w-full h-full flex-col space-y-1 justify-between'>

                                <div className='flex flex-col md:items-end'>
                                    <div className='flex text-md tracking-widest font-semibold'>{track}</div>
                                    <div className='flex text-xs text-zinc-400 font-medium tracking-widest uppercase'>RESELECT TRACK</div>
                                </div>
                                <div className='flex w-full text-zinc-400 tracking-widest text-xs items-center gap-2 flex-row'>
                                    <div className='flex'>{trackQuestions.length-remainingTrackQuestions.length}</div>
                                    <ProgressBar current={trackQuestions.length-remainingTrackQuestions.length} total={trackQuestions.length} />
                                    <div className='flex'>{trackQuestions.length}</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='flex w-full h-max p-4 px-0'>

                        <div className='flex w-full h-max py-4'>
                            <div className='flex w-full h-max flex-col justify-center items-center gap-4 no-scrollbar'>
                                {questionDIVs}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}