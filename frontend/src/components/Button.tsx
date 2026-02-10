import { useVisibility } from "../hooks/useVisibility"
import Wrapper from "./Wrapper"

function Button({ refresh, setrefresh }: { refresh: number, setrefresh: React.Dispatch<React.SetStateAction<number>> }) {
    const { isOpen, setOpen } = useVisibility();
    return (
        <>

            <div>
                <button id="button" className="px-6 py-4 border-4 border-black bg-white font-black text-sm tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 transition-all active:translate-y-[2px] active:shadow-none uppercase cursor-pointer" onClick={() => {
                    setOpen(true)
                }}>+ Add Bookmark</button>
            </div>



            {
                isOpen ?
                    <>

                        <Wrapper setOpen={setOpen} refresh={refresh} setrefresh={setrefresh} />
                    </>
                    : null
            }
        </>
    )
}


export default Button


