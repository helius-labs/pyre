import AppBar from './AppBar';

interface Questions {
    name: string,
    description: string,
    difficulty: number,
    tags: string[]
}

export default function Menu({ setSelectedComponent, progress, setProgress, questions, setQuestion }: any) {

    let questionDIVs: JSX.Element[] = []

    for (let i = 0; i < questions.length; i++) {
        let tags = [];
        for (let x = 0; x < questions[i].tags.length; x++) {
            tags.push(
                <div key={questions[i].tags[x]+i+x} className='flex bg-zinc-900 rounded-md items-center justify-center px-2 py-1 w-max font-medium'>{questions[i].tags[x]}</div>
            )
        }

        questionDIVs.push(

            <div key={questions[i].api} onClick={() => {setSelectedComponent('Question'); setQuestion(questions[i])}} className={`flex ${questions[i].solved?('bg-neutral-950'):('')} animate-fade w-full h-max bg-zinc-800 rounded-lg hover:bg-zinc-700 duration-200 cursor-pointer`}>

                <div className='flex flex-col w-[12%] xl:w-[4%] space-y-2 p-2'>
                    <div className={`flex w-full h-1/3 rounded-md ${(questions[i].difficulty > 2) ? (`bg-orange-500`) : (`bg-zinc-900`)}`}></div>
                    <div className={`flex w-full h-1/3 rounded-md ${(questions[i].difficulty > 1) ? (`bg-orange-500`) : (`bg-zinc-900`)}`}></div>
                    <div className='flex w-full bg-orange-500 h-1/3 rounded-md'></div>
                </div>

                <div className='flex w-[85%] flex-col p-2 gap-1'>
                    <div className='text-lg font-semibold truncate'>{questions[i].name}</div>
                    <div className="flex space-x-2 flex-row text-[10px] tracking-wider leading-5">
                        {tags}
                    </div>
                    {/* <div className='h-full text-wrap truncate'>{questions[i].description}</div> */}
                </div>

            </div>
        )
    }

    return (
        <div className='flex items-center justify-center h-max w-full flex-col bg-zinc-950 xl:space-y-16'>


            <AppBar setSelectedComponent={setSelectedComponent} progress={progress} ></AppBar>


            <div className='flex w-full xl:w-2/3 h-max flex-col justify-center gap-4 p-4 no-scrollbar'>
                {questionDIVs}
            </div>

        </div>
    )
}