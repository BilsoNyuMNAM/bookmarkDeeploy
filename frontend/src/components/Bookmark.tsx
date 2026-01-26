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

        <div >
            <div className="bg-white text-black">
                <div className=" border-b-4 border-black p-6 flex flex-row justify-between ">
                    <div>
                        <h2 className="font-bold text-2xl md:text-3xl tracking-tight leading-tight">ADD NEW BOOKMARK</h2>
                        <p className="text-xs tracking-widest mt-2 text-gray-500">FILL IN THE DETAILS BELOW</p>

                    </div>
                    <button className="w-8 h-8 m-2 cursor-pointer" onClick={() => setOpen(false)}>
                        <img src="./close.svg"></img>
                    </button>
                </div>
                <div>
                    <div className="p-6 flex flex-col gap-2 ">
                        <div className="border-2 border-black p-4 ">
                            <label className="text-xs font-bold mb-2">URL:</label>
                            <input name="url" onChange={set} value={linkInfo.url} placeholder="https://example.com" className="text-black w-full border-2 border-black text-sm font-bold px-4 py-3 "></input>
                        </div>
                        <div className="border-2 border-black p-4 ">
                            <label className="text-xs font-bold mb-2">NAME:</label>
                            <input name="Name" onChange={set} value={linkInfo.Name} placeholder="BOOKMARK TITLE" className="w-full  border-2 border-black text-sm font-bold px-4 py-3 "></input>
                        </div>
                        <div className="border-2 border-black p-4 ">
                            <label className="text-xs font-bold mb-2">CATEGORY:</label>
                            <input name="categoryName" onChange={set} value={linkInfo.categoryName} placeholder="DESIGN" className="w-full  border-2 border-black text-sm font-bold px-4 py-3 "></input>
                        </div>
                        <div className="border-2 border-black p-4">
                            <label className="text-xs font-bold mb-2">DESCRIPTION:</label>
                            <input name="Description" onChange={set} value={linkInfo.Description} placeholder="Enter a brief description..." className="w-full  border-2 border-black text-sm font-bold px-4 py-3 "></input>
                        </div>

                    </div>
                    <div className="border-t-4 p-6 flex justify-center">
                        {
                            disable ? <button
                                type="button" key="saving"
                                className="cursor-not-allowed text-white bg-oklch(44.4% 0.011 73.639)  focus:ring-4 focus:ring-oklch(44.4% 0.011 73.639) font-medium rounded text-sm px-6 py-2.5 focus:outline-none mt-2">
                                Saving.....
                            </button> :

                                <button
                                    type="button" key="save" onClick={() => {
                                        submit()

                                    }}
                                    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500 font-medium rounded text-sm px-6 py-2.5 focus:outline-none mt-2">
                                    Saved Bookmark
                                </button>
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Bookmark;