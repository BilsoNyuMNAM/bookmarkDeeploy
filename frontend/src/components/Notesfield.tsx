
import { useState, type ChangeEvent } from "react"

interface NoteCardData {
    id?: number
    title: string
    category: string
    content: string
    createdAt?: string
}

interface NotesfieldProps {
    setOpen: (open: boolean) => void
    onNoteCreated?: (note: NoteCardData) => void
}

export default function Notesfield({ setOpen, onNoteCreated }: NotesfieldProps) {

    const [isMaximized, setIsMaximized] = useState(false)
    const [isDisabled, setDisabled] = useState(false)
    const buttonColor = isDisabled ? "bg-white text-gray-500 cursor-not-allowed" : "font-bold text-sm cursor-pointer hover:bg-black hover:text-white p-4"
    const [notes, setNotes] = useState({
        title: "",
        category: "",
        content: ""
    })

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        console.log(e.target)
        setNotes(notes => ({
            ...notes,
            [name]: value
        }))
    }
    async function Submit() {
    setDisabled(true)
    console.log("Submit button is triggered")
    try {
        const response = await fetch("http://localhost:8787/api/v1/notes/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: notes.title,
                category: notes.category,
                content: notes.content
            })
        })
        const data = await response.json() as { result?: { id: number; title: string; content: string | null } }
        console.log("Response from backend:", data)
        console.log(data)
        if (response.ok) {
            onNoteCreated?.({
                id: data.result?.id,
                title: data.result?.title ?? notes.title,
                category: notes.category,
                content: data.result?.content ?? notes.content,
                createdAt: new Date().toISOString()
            })
        }
        } catch (error) {
            console.error("Error creating note:", error)
        } finally {
            setDisabled(false)
        }
}
    return (
        <div className={`fixed bg-white z-2 ${isMaximized
            ? 'inset-0' 
            : 'inset-4 md:inset-8 lg:inset-16'
        }`}>
            <div className="border-2 border-black   flex flex-col h-full">
                <div className="border-b-4 border-black p-4 flex justify-between bg-white flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setOpen(false)} className="hover:bg-gray-200 border-2 border-black p-2 w-8 h-8">
                            <img src="./close.svg"></img>
                        </button>
                        <span className="font-bold text-sm">NEW NOTE</span>
                
            </div>
                    <div className="flex items-center gap-3">
                        {isMaximized ? (
                            <button onClick={() => setIsMaximized(false)} className="w-8 h-8 p-2">
                                <img src="./minimize.svg"></img>
                            </button>
                        ) : (
                            <button onClick={() => setIsMaximized(true)} className="w-8 h-8 p-2">
                                <img src="./maximize.svg"></img>
                            </button>
                        )}
                        <button className={buttonColor} onClick={Submit}>CREATE</button>
                    </div>
                </div>
                
                {/* Scrollable Content Area */}
                <div className="overflow-y-auto flex-1 p-8">
                    <div>
                        <input 
                            type="text" 
                            name="title"
                            placeholder="Untitled" 
                            value={notes.title}
                            className="text-4xl md:text-5xl font-bold mb-8 border-none outline-none placeholder:text-gray-300 w-full" 
                            onChange={handleChange}
                        />
                        <div className="flex gap-3 items-center mb-8 border-b-2 pb-8 border-gray-200">
                            <div>
                                <span className="text-sm font-bold text-gray-500">CATEGORY</span>
                            </div>
                            <div>
                                <label></label>
                                <input 
                                    className="border-black px-3 py-2 text-sm font-mono border-2" 
                                    type="text" 
                                    name="category"
                                    placeholder="Add category..." 
                                    value={notes.category}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <textarea 
                                placeholder="write your notes here..." 
                                name="content"
                                className="w-full h-full outline-none min-h-[400px]" 
                                value={notes.content}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    )
}
