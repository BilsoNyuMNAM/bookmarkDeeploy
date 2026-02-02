interface note{
    id: number
    title: string
    category: string
    content: string
    createdAt: string 
    notecategoryId: number
}

export default function CategoryFilter({filteredNotes, Notesfilter}:{filteredNotes?:note[], Notesfilter: (id: number) => void}){ // an array of object [{}, {}, {}]

    return(
        <div>
            <label>
                Select a category:
                <select onChange={(e) => { 
                    const selectedId = parseInt(e.target.value);
                    console.log("Selected ID:", selectedId);
                    Notesfilter(selectedId);
                }}>
                      <option value="0">ALL CATEGORIES</option>
                    {filteredNotes?.filter((note, i, arr) => arr.findIndex(n => n.notecategoryId === note.notecategoryId) === i)
                        .map((note) => (
                            <option value={note.notecategoryId} key={note.notecategoryId}>
                            {note.category.toUpperCase()}
                            </option>
                        ))
                        }
                </select>

            </label>
        </div>
    )
}