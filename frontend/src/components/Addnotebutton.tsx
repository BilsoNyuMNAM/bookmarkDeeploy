

export default function Addnotebutton({setOpen}: {setOpen: React.Dispatch<React.SetStateAction<boolean>>}){
    return(
        <div>
            <button onClick={()=>setOpen(true)}className="px-8 py-4 border-3 border-black hover:bg-black hover:text-white">ADD NOTE</button>
        </div>
    )
}