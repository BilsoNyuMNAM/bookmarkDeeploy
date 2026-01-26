import Bookmark from "./Bookmark";

import React from "react";

type WrapperProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    refresh: number
    setrefresh: React.Dispatch<React.SetStateAction<number>>
}

export default function Wrapper({ setOpen, setrefresh }: WrapperProps) {
    return (
        <div id="wrapper" className="inset-0 z-0 fixed h-screen w-screen bg-black" >
            <div className="h-screen w-screen bg-black fixed z-1" onClick={() => setOpen(false)}>
            </div>
            <div className="w-full max-w-md fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-2">
                <Bookmark setrefresh={setrefresh} setOpen={setOpen} />
            </div>

        </div>
    )
}