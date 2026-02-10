import React, { useState } from "react";

type BookmarkProps = {
    setrefresh: React.Dispatch<React.SetStateAction<number>>
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function Bookmark({ setrefresh, setOpen }: BookmarkProps) {

    const [disable, setenable] = useState(false)
    const [linkInfo, setLinkInfo] = useState({
        url: "",
        Name: "",
        Description: "",
        categoryName: ""

    })
    function submit() {
        setenable(true)
        console.log("Submit button is being called")
        fetch("https://square-forest-972c.yumnambilson.workers.dev/link/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                categoryName: linkInfo.categoryName,
                url: linkInfo.url,
                Name: linkInfo.Name,
                Description: linkInfo.Description
            })
        })
            .then(result => {
                if (result.status == 201) {
                    console.log("Setting disable to false NOW")
                    setenable(false)
                    setrefresh(prev => prev + 1)
                }
                result.json()
                    .then(apiresponse => {
                        console.log(apiresponse)
                    })
            })
    }
    //@ts-ignore
    function set(e) {

        const { name, value } = e.target //{"name" , "value"}

        // console.log(e.target)
        setLinkInfo(linkInfo => ({
            ...linkInfo,
            [name]: value
        }))
    }
    return (

        <div className="w-full flex justify-center">
            <div className="bg-[#FFD600] text-black w-full max-w-md border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-6 flex flex-row justify-between items-start">
                    <div>
                        <h2 className="font-black text-5xl uppercase tracking-tighter leading-none">ADD BOOKMARK</h2>
                    </div>
                    <button className="w-10 h-10 border-2 border-black bg-[#FFD600] hover:bg-white flex items-center justify-center transition-colors" onClick={() => setOpen(false)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="px-6 pb-6 flex flex-col gap-4">
                    <div>
                        <label className="text-sm font-black mb-1 block uppercase">URL:</label>
                        <input
                            name="url"
                            onChange={set}
                            value={linkInfo.url}
                            placeholder="https://example.com"
                            className="w-full border-2 border-black p-2 text-sm font-bold focus:outline-none focus:ring-0 placeholder:text-gray-500 bg-white"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-black mb-1 block uppercase">NAME:</label>
                        <input
                            name="Name"
                            onChange={set}
                            value={linkInfo.Name}
                            placeholder="BOOKMARK TITLE"
                            className="w-full border-2 border-black p-2 text-sm font-bold focus:outline-none focus:ring-0 placeholder:text-gray-500 bg-white"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-black mb-1 block uppercase">CATEGORY:</label>
                        <input
                            name="categoryName"
                            onChange={set}
                            value={linkInfo.categoryName}
                            placeholder="DESIGN"
                            className="w-full border-2 border-black p-2 text-sm font-bold focus:outline-none focus:ring-0 placeholder:text-gray-500 bg-white"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-black mb-1 block uppercase">DESCRIPTION:</label>
                        <input
                            name="Description"
                            onChange={set}
                            value={linkInfo.Description}
                            placeholder="Enter a brief description..."
                            className="w-full border-2 border-black p-2 text-sm font-bold focus:outline-none focus:ring-0 placeholder:text-gray-500 bg-white"
                        />
                    </div>

                    <div className="pt-2">
                        {disable ? (
                            <button
                                type="button"
                                disabled
                                className="w-full cursor-not-allowed text-black bg-gray-400 border-2 border-black font-black uppercase text-lg py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-50"
                            >
                                SAVING...
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={submit}
                                className="w-full text-black bg-[#FF5CAD] hover:bg-[#ff40a0] border-2 border-black font-black uppercase text-xl py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                            >
                                SAVED BOOKMARK
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Bookmark;