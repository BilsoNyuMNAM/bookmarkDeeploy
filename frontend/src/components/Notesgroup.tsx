
import CategoryFilter from "./Filter";
import Notescard from "./Notesacard";
import { startTransition, useState } from 'react'
import { useOptimistic } from "react";
interface Note {
    id: number
    title: string
    category: string
    content: string | null
    createdAt: string
    notecategoryId: number
}

interface NotesGroupProps {
    notes: Note[],
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setpassNote: React.Dispatch<React.SetStateAction<boolean>>
    setid: React.Dispatch<React.SetStateAction<number | null>>
    fetchNotes: () => void

}

export default function Notesgroup({ setid, notes, setOpen, setpassNote, fetchNotes }: NotesGroupProps) {
    console.log("id of notes being passed to Notesgroup:", notes.map((note: Note) => note.id));

    const [optimisticNotes, setOptimisticNotes] = useOptimistic(notes, notesReducer);  //[{}, {}, {}]

    function notesReducer(optimisticNotes: Note[], action: { type: string; id: number }) {
        if (action.type === "DELETE") {
            return optimisticNotes.filter((note: Note) => { return note.id != action.id })
        }
        return optimisticNotes;
    }


    async function deleteNoteById(id: number) { //convert the id from string to number and pass it here 
        //this function will receive a note id and who will pass it ?? the button with the onClick handler 
        startTransition(() => {
            setOptimisticNotes({ type: "DELETE", id });
        });

        try {
            const response = await fetch((`https://square-forest-972c.yumnambilson.workers.dev/api/v1/notes/delete/${id}`), {
                method: "DELETE",
            });
            if (response.status === 404) {
                alert("Note not found")
            }
        }
        catch (error) {
            alert("Failed to delete the note.Please try again ")

        }
        finally {
            fetchNotes()
        }

    }

    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);


    const filteredNotes = selectedCategoryId === 0
        ? optimisticNotes
        : optimisticNotes.filter(note => note.notecategoryId === selectedCategoryId);

    function Notesfilter(id: number) {
        console.log("inside the filter function")
        setSelectedCategoryId(id);

    }



    return (
        <div>
            <CategoryFilter filteredNotes={optimisticNotes} Notesfilter={Notesfilter} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                {filteredNotes.length > 0 ? (
                    filteredNotes.map((note) => (
                        <Notescard
                            deleteNoteById={deleteNoteById}
                            setid={setid}
                            id={note.id}
                            title={note.title}
                            category={note.category}
                            content={note.content}
                            createdAt={note.createdAt}
                            setOpen={setOpen}
                            setpassNote={setpassNote}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No notes yet. Create your first note!</p>
                )}
            </div>

        </div>
    )
}