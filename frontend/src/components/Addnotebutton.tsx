

export default function Addnotebutton({ setOpen, setpassNote }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, setpassNote: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div>
            <button onClick={() => { setOpen(true); setpassNote(false) }} className="px-8 py-4 border-3 border-black hover:bg-black hover:text-white">ADD NOTE</button>
        </div>
    )
}