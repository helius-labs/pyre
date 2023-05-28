import Image from 'next/image';

export default function Menu({ setSelectedComponent }: any) {

    return (
        <div className='flex items-center justify-center h-full w-full flex-col'>
            <div className='absolute top-4 left-4'>
            <button
                className="flex opacity-70 hover:opacity-100 duration-200 font-bold justify-center bg-black p-1 rounded-full overflow-show"
                onClick={() => setSelectedComponent('Landing')}
            >
                <div className='flex items-center justify-center w-12 h-8'>
                    <Image className='' alt="back" src="/back.svg" width={24} height={24}></Image>
                </div>
            </button>
            </div>

            <div className=''>
                <div>

                </div>
            </div>

        </div>
    )
}