// @ts-nocheck
import AppBar from "./AppBar"
import { useState } from 'react';
import Image from 'next/image';

export default function End({ userData, setSelectedComponent, progress }: any) {
    const [displayedUser, setDisplayedUser] = useState(userData.user.slice(0, 4) + '..' + userData.user.slice(-4))
    console.log(userData)

    const relativeTimePeriods = [
        [31536000, 'year'],
        [2419200, 'month'],
        [604800, 'week'],
        [86400, 'day'],
        [3600, 'hour'],
        [60, 'minute'],
        [1, 'second']
    ];

    function relativeTime(date) {
        if (!(date instanceof Date)) date = new Date(date * 1000);
        const seconds = (new Date() - date) / 1000;
        for (let [secondsPer, name] of relativeTimePeriods) {
            if (seconds >= secondsPer) {
                const amount = Math.floor(seconds / secondsPer);
                return `${amount} ${name}${amount != 1 ? 's' : ''}`;
            }
        }
        return 'Just now';
    }

    return (
        <div className='flex items-center justify-center h-full w-full flex-col bg-zinc-950 animate-fade space-y-8 animate-fade'>

            <AppBar setSelectedComponent={setSelectedComponent} progress={progress} component="Menu" ></AppBar>

            <div className="flex text-2xl font-medium flex-col items-center">
                You have reached
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-yellow-500 to-orange-500"> {" " + "the end!"} </span>
            </div>

            <div onClick={() => {
                navigator.clipboard.writeText(userData.user)
                setDisplayedUser.user("Copied!")
                setTimeout(() => {
                    setDisplayedUser(userData.user.slice(0, 4) + '..' + userData.user.slice(-4));
                }, 1000);
            }}

                className={`flex font-medium duration-200 opacity-70 hover:opacity-100 space-x-2 cursor-pointer rounded-full bg-zinc-800 px-4 py-2 justify-center`}>
                <div>{displayedUser}</div>

                <>{
                    (displayedUser == "Copied!") ?
                        (
                            <Image className='duration-200' alt="check" src="/check.svg" width={16} height={16}></Image>
                        ) : (
                            <Image className='duration-200' alt="copy" src="/copy.svg" width={16} height={16}></Image>
                        )
                }
                </>
            </div>

            <div className="flex h-full flex-col items-center justify-evenly p-8">

                <div className="flex flex-row px-4 py-2 w-max items-center rounded-md border-2 border-zinc-700 space-x-4">

                <div className="flex">
                        <Image className='duration-200' alt="clock" src="/clock.svg" width={24} height={24}></Image>
                    </div>

                    <div className="flex text-xl font-medium">
                        {relativeTime(new Date(userData.created_at))}
                    </div>

                </div>

                <div className="flex w-full text-center text-zinc-400 bg-zinc-900 p-3 rounded-md font-medium">

                    Head to the Helius Discord and ping @Tidelaw#0707 with a screenshot!

                </div>
            </div>
        </div>
    )
}