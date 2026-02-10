import Bookmark from "./Bookmark";

import React from "react";

type WrapperProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    refresh: number
    setrefresh: React.Dispatch<React.SetStateAction<number>>
}
//@learned: how to  apply a defined width with using w-full attribute (w-full max-w-md)
//@learned: how to fit the content of a child div within the defined width and height without any overflow property {In CSS, height causes overflow, so remove the height }

export default function Wrapper({ setOpen, setrefresh }: WrapperProps) {
    return (
        <div id="wrapper" className="inset-0 z-5 fixed h-screen w-screen  bg-50/2  backdrop-blur-sm flex justify-center items-center" >

            <div className="w-full max-w-2xl max-h-[90vh]  m-10">

                <Bookmark setrefresh={setrefresh} setOpen={setOpen} />


            </div>



        </div>



    )
}