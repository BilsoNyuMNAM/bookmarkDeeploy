import { useState } from "react"
import Wrapper from "./Wrapper"
type WrapperProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function Button({refresh, setrefresh}:{refresh:number, setrefresh: React.Dispatch<React.SetStateAction<number>>}){
    const [isOpen, setOpen] = useState(false)
    return(
        <> 
            <div className="w-100%  flex items-center justify-center">
                <div>
                    <button id="button" className="border-4 border-black px-6 py-3 font-bold text-sm tracking-wide hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2" onClick={()=>{
                    setOpen(true)
                }}>+ ADD BOOKMARK</button>
                </div>   
            </div>
            
                
                {
                    isOpen?
                    <>
                
                    <Wrapper setOpen={setOpen} refresh={refresh} setrefresh={setrefresh} />
                    </>
                    :null
                }
        </>
    )
}


export default Button


