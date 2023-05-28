import Image from 'next/image';

interface Questions {
    name: string,
    description: string,
    difficulty: number,
    tags: string[]
}

export default function Menu({ setSelectedComponent, questions }: any) {

    let questionDIVs: JSX.Element[] = []

    for (let i = 0; i < questions.length; i++) {

        let tags = [];
        for (let x = 0; x < questions[i].tags.length; x++) {
            tags.push(
                <div className='flex bg-neutral-800 rounded-lg items-center justify-center p-1 w-max font-medium'>{questions[i].tags[x]}</div>
            )
        }

        questionDIVs.push(
            <div className='flex w-full h-24 bg-neutral-900 rounded-lg hover:bg-neutral-950 duration-200 cursor-pointer'>

                <div className='flex flex-col w-[15%] xl:w-[4%] space-y-2 p-2'>
                    <div className={`flex w-full bg-neutral-800 h-1/3 rounded-md ${(questions[i].difficulty > 2) ? ('bg-orange-400') : ('')}`}></div>
                    <div className={`flex w-full bg-neutral-800 h-1/3 rounded-md ${(questions[i].difficulty > 1) ? ('bg-orange-400') : ('')}`}></div>
                    <div className='flex w-full bg-orange-400 h-1/3 rounded-md'></div>
                </div>

                <div className='flex w-[85%] flex-col p-2 gap-1'>
                    <div className='font-medium'>{questions[i].name}</div>
                    <div className="flex space-x-4 flex-row">
                        {tags}
                    </div>
                    {/* <div className='h-full text-wrap truncate'>{questions[i].description}</div> */}
                </div>

            </div>
        )
    }

    return (
        <div className='flex items-center justify-center h-max w-full flex-col'>


            <div className='absolute w-full top-0 sticky px-2 xl:px-8 py-4 bg-black'>
                <div className='flex flex-row items-center space-x-2 xl:space-x-8'>
                    <button
                        className="flex opacity-70 hover:opacity-100 duration-200 font-bold justify-center bg-black rounded-full overflow-show"
                        onClick={() => setSelectedComponent('Landing')}
                    >
                        <div className='flex items-center justify-center w-6 h-4'>
                            <Image className='' alt="back" src="/back.svg" width={16} height={16}></Image>
                        </div>
                    </button>

                    <div className="flex relative w-full h-4 bg-neutral-800 rounded-lg z-0">
                        <div style={{ width: `${40}%` }}
                            className={`flex relative h-4 items-center rounded-lg bg-orange-400 max-w-full justify-center`}>
                        </div></div>
                </div>
            </div>


            <div className='flex w-full xl:w-2/3 h-max flex-col justify-center gap-8 p-2'>
                {questionDIVs}
            </div>

        </div>
    )
}