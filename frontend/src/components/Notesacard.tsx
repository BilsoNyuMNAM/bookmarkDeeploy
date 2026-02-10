
interface NotescardProps {
    title?: string
    category?: string
    content?: string | null
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    createdAt?: string
    id: number
    setpassNote: React.Dispatch<React.SetStateAction<boolean>>
    setid: React.Dispatch<React.SetStateAction<number | null>>
    deleteNoteById: (id: number) => void
}



interface NotescardProps {
    title?: string
    category?: string
    content?: string | null
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    createdAt?: string
    id: number
    setpassNote: React.Dispatch<React.SetStateAction<boolean>>
    setid: React.Dispatch<React.SetStateAction<number | null>>
    deleteNoteById: (id: number) => void
}

const categoryColors: Record<string, string> = {
    "TODO": "bg-[#FFD700]",      // Yellow
    "PROJECT IDEA": "bg-[#87CEEB]", // Light Blue
    "BUG": "bg-[#FFB6C1]",       // Light Pink
    "KNOWLEDGE DIFF": "bg-[#90EE90]", // Light Green
    "AI PROMPT": "bg-[#E6E6FA]", // Lavender
    "DEFAULT": "bg-white"
}

export default function Notescard({ deleteNoteById, setid, setOpen, setpassNote, id, title = "Note title", category = "Category", content = "Notes content/description", createdAt }: NotescardProps,) {
    const previewText = toPlainText(content)
    const preview = previewText.length > 140 ? `${previewText.slice(0, 140)}...` : previewText

    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')
        : "20.10.2026"
    //@ts-ignore
    function getId(e) {
        const id = Number(e.currentTarget.getAttribute("data-note-id"))
        setid(id);
    }

    // Determine background color based on category
    // Normalize category string for matching 
    const normalizedCategory = category?.toUpperCase() || "DEFAULT";
    // Check for exact match or partial match keys
    let bgColor = categoryColors["DEFAULT"];

    // Simple mapping logic: try exact match first
    if (categoryColors[normalizedCategory]) {
        bgColor = categoryColors[normalizedCategory];
    } else {
        // Fallback or specific logic if needed. 
        // For now, let's try to match based on the keys if the category contains the key words
        for (const key of Object.keys(categoryColors)) {
            if (normalizedCategory.includes(key)) {
                bgColor = categoryColors[key];
                break;
            }
        }
    }


    return (
        <div
            onClick={(e) => { setOpen(true); setpassNote(true); getId(e) }}
            data-note-id={id}
            className={`border-4 border-black ${bgColor} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200 relative cursor-pointer h-full flex flex-col justify-between font-mono`}
        >
            <button
                onClick={(e) => { e.stopPropagation(); Number(e.currentTarget.dataset.deleteId); deleteNoteById(id) }}
                data-delete-id={id}
                className="w-10 h-10 absolute top-4 right-4 z-1 flex items-center justify-center border-2 border-transparent hover:bg-black hover:text-white rounded-full transition-colors group"
                title="Delete Note"
            >
                <img className="h-5 w-5 group-hover:invert" src="./delete.svg" alt="Delete"></img>
            </button>

            <div className="p-6 flex flex-col h-full">
                {/* Header Section */}
                <div className="mb-4">

                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-4 w-4 bg-black"></div>
                        <span className="text-xs font-bold uppercase tracking-widest text-black/70">{category}</span>
                    </div>

                    <h3 className="font-bold text-3xl leading-tight mb-4 uppercase tracking-tight break-words">{title}</h3>

                    {/* Thick Separator Line */}
                    <div className="h-1.5 w-full bg-black/90 mb-4"></div>
                </div>

                {/* Content Section */}
                <div className="flex-grow mb-6">
                    <p className="text-sm font-medium leading-relaxed whitespace-pre-line text-black tracking-wide uppercase">
                        {preview}
                    </p>
                </div>

                {/* Footer Section */}
                <div className="mt-auto border-t-2 border-black/10 pt-3">
                    <p className="text-xs font-bold tracking-widest text-black/60">{formattedDate}</p>
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
