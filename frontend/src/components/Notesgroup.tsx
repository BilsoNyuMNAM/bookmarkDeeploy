import Datefilter from "./Datefilter";
import Notescard from "./Notesacard";
import type { NoteCardData } from "../types/notes";

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
                    notes.map((note, index) => (
                        <Notescard
                            key={note.id ?? `${note.title}-${note.createdAt ?? "note"}-${index}`}
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
