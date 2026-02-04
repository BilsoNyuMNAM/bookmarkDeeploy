

interface NotescardProps {
    title?: string
    category?: string
    content?: string | null
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    createdAt?: string
    id: number
    setpassNote: React.Dispatch<React.SetStateAction<boolean>>
    setid: React.Dispatch<React.SetStateAction<number>>
    deleteNoteById:(id:number)=>void
}


export default function Notescard({ deleteNoteById, setid, setOpen,setpassNote, id, title = "Note title", category = "Category", content = "Notes content/description", createdAt }: NotescardProps, ) {
    const previewText = toPlainText(content)
    const preview = previewText.length > 140 ? `${previewText.slice(0, 140)}...` : previewText

    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')
        : "20.10.2026"
        //@ts-ignore
    function getId(e){
        const id = Number(e.currentTarget.getAttribute("data-note-id"))
        setid(id);
    }


    return (
        <div>
            <div onClick={(e) => { setOpen(true); setpassNote(true); getId(e)}} data-note-id={id} className="border-2 border-black group block  bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 relative cursor-pointer">
                <button onClick={(e)=>{e.stopPropagation(); Number(e.currentTarget.dataset.deleteId); deleteNoteById({id: id})}} data-delete-id = {id} className="w-8 h-8 m-2 absolute top-3 right-3 z-10 flex items-center cursor-pointer justify-center border-2">
                    <img className="h-5 w-5"src="./delete.svg"></img>
                </button>
                <div className="p-6">
                    <div className="mb-4 pb-4 border-b-4 border-black">
                        <div >
                            <div className="flex items-start gap-2 mb-2">
                                <div className="w-3 h-3 bg-black mt-1 flex-shrink-0"></div>
                                <span className="text-[10px] tracking-widest font-bold text-gray-500">{category}</span>
                            </div>
                            <h3 className="font-bold text-lg tracking-tight leading-tight">{title.toUpperCase()}</h3>
                        </div>
                        
                    </div>
                    <div className="mb-4 text-sm leading-relaxed line-clamp-6 whitespace-pre-line">
                        <p>{preview}</p>
                    </div>
                    <div className="pt-3 border-t-2 border-gray-200">
                        <p className="text-[10px] tracking-widest text-gray-500 font-bold">{formattedDate}</p>

                    </div>
                    <div></div>
                </div>
            </div>
        </div>

    )
}

function toPlainText(value?: string | null) {
    if (!value) return ""

    // Basic HTML -> text for previews (notes.content is rich-text HTML).
    return value
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim()
}
