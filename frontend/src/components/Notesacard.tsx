
interface NotescardProps {
    title?: string
    category?: string
    content?: string
    createdAt?: string
}

export default function Notescard({ title = "Notes Title", category = "Category", content = "Notes content/description", createdAt }: NotescardProps) {
    // Format the date if provided, otherwise use a placeholder
    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')
        : "20.10.2026"

    return (
        <div>
            <div className="border-2 border-black">
                <button></button>
                <div className="p-6">
                    <div className="mb-4 pb-4 border-b-4 border-black">
                        <div >
                            <div className="flex items-start gap-2 mb-2">
                                <div className="w-3 h-3 bg-black mt-1 flex-shrink-0"></div>
                                <span className="text-[10px] tracking-widest font-bold text-gray-500">{category}</span>
                            </div>
                            <h3 className="font-bold text-lg tracking-tight leading-tight">{title}</h3>
                        </div>

                    </div>
                    <div className="mb-4 text-sm leading-relaxed line-clamp-6 whitespace-pre-line">
                        <p>{content}</p>
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