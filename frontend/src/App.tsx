

import Button from './components/Button'

import Group from './components/Group'
import { useState } from 'react'
import './App.css'


function App() {
  const [refresh, setrefresh] = useState(0)
  console.log("App is being rendered")
  return (

    <>

      <header className="border-black p-6">
        <Button refresh={refresh} setrefresh={setrefresh}/>
      </header>
    
      <main className='p-6 font-sans'>
        <div>
          <Group refresh={refresh} setrefresh={setrefresh}/>
        </div>
        
      </main>
      <footer>
        This is the footer
      </footer>
      
    </>
    
  )
}

export default App
