

import Button from './components/Button'
import Group from './components/Group'
import { useState } from 'react'
import './App.css'
import Notesfield from './components/Notesfield'
import { useVisibility } from './hooks/useVisibility'
import Addnotebutton from './components/Addnotebutton'
import Notesgroup from './components/Notesgroup'

interface NoteCardData {
  id?: number
  title: string
  category: string
  content: string
  createdAt?: string
}

function App() {
  const [refresh, setrefresh] = useState(0);
  const {isOpen, setOpen} = useVisibility();
  const [isNotesOpen, setisNotesOpen] = useState(false)
  const [notes, setNotes] = useState<NoteCardData[]>([
    {
      title: "Notes Title",
      category: "Category",
      content: "Notes content/description",
      createdAt: "2026-10-20T00:00:00.000Z"
    }
  ])
  const bookmarkactiveButtonStyle = isNotesOpen?null:"bg-black text-white"
   const notesactiveButtonStyle = isNotesOpen?"bg-black text-white":null
  return (
    <>
          
    <div className='p-6'>
      <div className="flex gap-2 mb-6 border-4 border-black p-0 inline-flex ">
          <button className={`px-3 py-5 text-sm font-bold text-black  ${bookmarkactiveButtonStyle}`} onClick={()=>setisNotesOpen(false)}>BOOKMARK</button>
          <button className={`px-3 py-5 text-sm font-bold text-black ${notesactiveButtonStyle}`} onClick={()=>setisNotesOpen(true)}>NOTES</button>
      </div>
    </div>
      {
        isOpen? <Notesfield setOpen={setOpen} onNoteCreated={(note) => setNotes(prev => [{ ...note, createdAt: note.createdAt ?? new Date().toISOString() }, ...prev])} /> : null
      }
      <header className="border-black p-6 ">
          <div className="w-100%  flex items-center justify-center">
            {
              isNotesOpen?<Addnotebutton setOpen={setOpen}/>:<Button refresh={refresh} setrefresh={setrefresh} />
              
            } 
          </div>
      </header>
    
      <main className='p-6 font-sans '>
        <div>
          {
            isNotesOpen?<Notesgroup notes={notes}/>: <Group refresh={refresh} setrefresh={setrefresh} />
            
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
