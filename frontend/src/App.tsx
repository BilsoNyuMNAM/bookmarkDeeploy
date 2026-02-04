
import Button from './components/Button'
import Group from './components/Group'
import { useState, useEffect } from 'react'
import './App.css'
import Notesfield from './components/Notesfield'
import { useVisibility } from './hooks/useVisibility'
import Addnotebutton from './components/Addnotebutton'
import Notesgroup from './components/Notesgroup'

function App() {
  const [refresh, setrefresh] = useState(0);
  const { isOpen, setOpen } = useVisibility();
  const [isNotesOpen, setisNotesOpen] = useState(false)

  const bookmarkactiveButtonStyle = isNotesOpen ? null : "bg-black text-white"
  const notesactiveButtonStyle = isNotesOpen ? "bg-black text-white" : null

  const [notes, setNotes] = useState([])

  const [passNote, setpassNote] = useState(false)

  const [id, setid] = useState(null)

  async function fetchNotes() {
    try {
      const response = await fetch("https://square-forest-972c.yumnambilson.workers.dev/api/v1/notes/getall")
      const data = await response.json()
      console.log("Fetched notes:", data)

      // Backend returns: { result: [{ category: "...", notes: [...] }] }
      // We need to flatten it into: [{ id, title, content, category, createdAt }]
      const flattenedNotes = data.result?.flatMap((categoryGroup: any) =>
        categoryGroup.notes.map((note: any) => ({
          ...note,
          category: categoryGroup.category
        }))
      ) || []

      setNotes(flattenedNotes)

    } catch (error) {
      console.error("Error fetching notes:", error)
    }
  }


  useEffect(() => {
    if (isNotesOpen) {
      fetchNotes()
    }
  }, [isNotesOpen])

  return (
    <>

      <div className='p-6'>
        <div className="flex gap-2 mb-6 border-4 border-black p-0 inline-flex ">
          <button className={`px-3 py-5 text-sm font-bold text-black  ${bookmarkactiveButtonStyle}`} onClick={() => setisNotesOpen(false)}>BOOKMARK</button>
          <button className={`px-3 py-5 text-sm font-bold text-black ${notesactiveButtonStyle}`} onClick={() => setisNotesOpen(true)}>NOTES</button>
        </div>
      </div>
      {
        //conditional rendering the notes when the user select one of the notes card
        isOpen ? <Notesfield setOpen={setOpen} onNoteCreated={fetchNotes} {...(passNote ? { noteTodisplay: notes.find(note => note.id === id) } : {})} /> : null
      }
      <header className="border-black p-6 ">
        <div className="w-100%  flex items-center justify-center">
          {
            isNotesOpen ? <Addnotebutton setOpen={setOpen} setpassNote={setpassNote} /> : <Button refresh={refresh} setrefresh={setrefresh} />

          }
        </div>
      </header>

      <main className='p-6 font-sans '>
        <div>
          {
            isNotesOpen ? <Notesgroup fetchNotes={fetchNotes} notes={notes} setOpen={setOpen} setpassNote={setpassNote} setid={setid} /> : <Group refresh={refresh} setrefresh={setrefresh} />
          }
        </div>

      </main>

      <footer >
        This is the footer
      </footer>

    </>

  )
}

export default App
