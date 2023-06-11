import AppBar from './AppBar';
import End from './End';
import { useEffect, useState } from "react";

interface Questions {
    name: string,
    description: string,
    difficulty: number,
    tags: string[]
}

export default function QuestionMenu({ setSelectedComponent, progress, userData, questions, setQuestion }: any) {
    let [selectedTags, setSelectedTags] = useState<string[]>(["DAS", "RPC", "ENHANCED API", "NFT API"]);
    let [questionDIVs, setQuestionDIVs] = useState([]);

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
        console.log(selectedTags)

    }

    useEffect(() => {
        let organizedQuestions: any = [];

        for (let i = 0; i < questions.length; i++) {
            let tags = [];
            for (let x = 0; x < questions[i].tags.length; x++) {
                tags.push(
                    <div key={questions[i].tags[x] + i + x} className='flex bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>{questions[i].tags[x]}</div>
                )
            }

            if ((selectedTags && selectedTags.includes(questions[i].tags[0])) || selectedTags.length == 0) {
                organizedQuestions.push(

                    <div key={questions[i].api} onClick={() => { setSelectedComponent('Question'); setQuestion(questions[i]) }}
                        className={`flex bg-zinc-800 justify-between items-center animate-fade w-full h-max rounded-lg hover:bg-zinc-700 duration-200 cursor-pointer`}>

                        <div className='flex rounded-lg xl:w-2/3 pr-2'>
                            <div className='flex flex-col w-10 space-y-2 p-2'>
                                <div className={`flex w-full h-1/3 rounded-md ${(questions[i].difficulty > 2) ? (`bg-orange-500`) : (`bg-zinc-900`)}`}></div>
                                <div className={`flex w-full h-1/3 rounded-md ${(questions[i].difficulty > 1) ? (`bg-orange-500`) : (`bg-zinc-900`)}`}></div>
                                <div className='flex w-full bg-orange-500 h-1/3 rounded-md'></div>
                            </div>

                            <div className='flex w-max flex-col p-2 gap-2'>
                                <div className='text-lg xl:text-lg font-medium truncate tracking-wider'>{questions[i].name}</div>
                                <div className="flex space-x-2 flex-row text-[10px] tracking-widest leading-5">
                                    {tags}
                                </div>
                            </div>
                        </div>
                        {/* <div className='flex h-full w-2/3 py-2 px-3 w-2/3 rounded-r-lg bg-neutral-900 text-zinc-300 font-medium'>
                            <div className=''>{questions[i].description}</div>
                        </div> */}

                    </div>
                )
            }
        }
        setQuestionDIVs(organizedQuestions)
    }, [selectedTags])
    console.log(questionDIVs)

    return (


        (questions.length != 0) ? (

            <div className='flex items-center h-full w-full flex-col bg-zinc-950 no-scrollbar'>


                <AppBar setSelectedComponent={setSelectedComponent} progress={progress} component="QuestionMenu" ></AppBar>




                <div className='flex xl:space-y-4 flex-col h-full w-full xl:w-2/3 items-center no-scrollbar'>
                    <div className='flex w-full flex-col space-y-2 items-start justify-start text-zinc-300 font-semibold p-4 py-6 xl:py-0 xl:mt-16 '>

                        <div className='flex text-md tracking-widest font-medium'>FEATURED TAGS</div>

                        <div className='flex flex-row space-x-4 text-[12px] tracking-wider leading-5'>

                            <div onClick={(() => setTags("DAS"))} className={`flex ${(selectedTags && selectedTags.some((e: any) => e == "DAS")) ? 'border-zinc-700' : 'border-transparent'} border bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium hover:bg-zinc-900 cursor-pointer duration-200`}>DAS</div>
                            <div onClick={(() => setTags("RPC"))} className={`flex ${(selectedTags && selectedTags.some((e: any) => e == "RPC")) ? 'border-zinc-700' : 'border-transparent'} border bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium hover:bg-zinc-900 cursor-pointer duration-200`}>RPC</div>
                            <div onClick={(() => setTags("ENHANCED API"))} className={`flex ${(selectedTags && selectedTags.some((e: any) => e == "ENHANCED API")) ? 'border-zinc-700' : 'border-transparent'} border bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium hover:bg-zinc-900 cursor-pointer duration-200`}>ENHANCED API</div>
                            <div onClick={(() => setTags("NFT API"))} className={`flex ${(selectedTags && selectedTags.some((e: any) => e == "NFT API")) ? 'border-zinc-700' : 'border-transparent'} border bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium hover:bg-zinc-900 cursor-pointer duration-200`}>NFT API</div>

                        </div>
                    </div>

                    <div className='flex w-full h-full px-4 xl:p-4 space-x-4'>

                        <div className='flex w-full'>
                            <div className='flex w-full h-max flex-col justify-center items-center gap-4 no-scrollbar'>
                                {questionDIVs}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        ) : (
            <div className='flex items-center justify-center h-full w-full flex-col bg-zinc-950 xl:space-y-16'>
                <End setSelectedComponent={setSelectedComponent} progress={progress} userData={userData}></End>
            </div>
        )


    )
}