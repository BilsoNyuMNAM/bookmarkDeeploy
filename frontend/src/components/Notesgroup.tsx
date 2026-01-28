import Datefilter from "./Datefilter";
import Notescard from "./Notesacard";

interface NoteCardData {
    id?: number
    title: string
    category: string
    content: string
    createdAt?: string
}

interface NotesgroupProps {
    notes: NoteCardData[]
}

export default function Notesgroup({ notes }: NotesgroupProps){
    return(
        <div>
            <Datefilter/>
            <div className="flex mt-10">
                {notes.length === 0 ? (
                    <Notescard />
                ) : (
                    notes.map((note) => (
                        <Notescard
                            key={note.id ?? `${note.title}-${note.createdAt ?? "note"}`}
                            title={note.title}
                            category={note.category}
                            content={note.content}
                            createdAt={note.createdAt}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
