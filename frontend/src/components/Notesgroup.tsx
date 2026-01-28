import Datefilter from "./Datefilter";
import Notescard from "./Notesacard";



export default function Notesgroup(){
    
    return(
        <div>
            <Datefilter/>
            <div className="flex mt-10"> //this will be grid div to diaply the notescard 
                <Notescard setNotesList={setNotesList}/>
                
            </div>
           
        </div>
    )
}