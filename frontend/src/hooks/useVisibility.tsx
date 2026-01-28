



import { useState } from "react";

export function useVisibility(){
    const [isOpen, setOpen] = useState(false);
    return{isOpen, setOpen}
}