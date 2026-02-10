import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react"
import { EditorContent, useEditor, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import CodeBlock from "@tiptap/extension-code-block"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"

type NoteToDisplay = {
    id: number
    title: string
    category: string
    content: string | null
    notecategoryId: number
}

export default function Notesfield({
    setOpen,
    onNoteCreated,
    noteTodisplay
}: {
    setOpen: (open: boolean) => void
    onNoteCreated?: () => void
    noteTodisplay?: NoteToDisplay
}) {
    const [isMaximized, setIsMaximized] = useState(false)
    const [isDisabled, setDisabled] = useState(false)

    const buttonColor = isDisabled
        ? "bg-white text-gray-500 cursor-not-allowed"
        : "font-bold text-sm cursor-pointer hover:bg-black hover:text-white p-4"

    const editMode = Boolean(noteTodisplay?.title)

    const [notes, setNotes] = useState({
        title: noteTodisplay?.title || "",
        category: noteTodisplay?.category || ""
    })

    useEffect(() => {
        setNotes({
            title: noteTodisplay?.title || "",
            category: noteTodisplay?.category || ""
        })
    }, [noteTodisplay?.id])

    const initialContent = useMemo(() => {
        const raw = noteTodisplay?.content
        if (!raw) return ""

        const trimmed = raw.trim()
        const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(trimmed)

        if (looksLikeHtml) return trimmed

        // Support existing plaintext notes by converting to a basic <p>…</p> doc.
        return `<p>${escapeHtml(trimmed).replace(/\n/g, "<br />")}</p>`
    }, [noteTodisplay?.id])

    // @ts-ignore
    const editor = useEditor(
        {
            extensions: [
                StarterKit.configure({
                    heading: { levels: [1, 2, 3] },
                    codeBlock: false // Use separate CodeBlock extension
                }),
                Image.configure({
                    // Store images inline so they persist when reopening notes (no extra backend required).
                    allowBase64: true
                }),
                Placeholder.configure({
                    placeholder: "Write your notes here..."
                }),
                CodeBlock.configure({
                    HTMLAttributes: {
                        class: 'code-block'
                    }
                }),
                Link.configure({
                    openOnClick: false,
                    HTMLAttributes: {
                        class: 'editor-link'
                    }
                }),
                Underline
            ],
            content: initialContent,
            editorProps: {
                attributes: {
                    class: "ProseMirror"
                }
            }
        },
        [initialContent]
    )

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setNotes((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function onPickImage(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        e.target.value = "" // allow selecting the same file again

        if (!file || !editor) return

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.")
            return
        }

        // Keep payloads reasonable (edge platforms often have request limits).
        const maxBytes = 2 * 1024 * 1024
        if (file.size > maxBytes) {
            alert("Image too large. Please use an image under 2MB.")
            return
        }

        const reader = new FileReader()
        reader.onload = () => {
            const src = reader.result
            if (typeof src !== "string") return
            editor.chain().focus().setImage({ src, alt: file.name }).run()
        }
        reader.onerror = () => alert("Failed to read the image file.")
        reader.readAsDataURL(file)
    }

    // Commented out - not currently used in UI but kept for future link functionality
    // function addLink() {
    //     if (!editor) return
    //     const previousUrl = editor.getAttributes('link').href
    //     const url = window.prompt('Enter URL:', previousUrl || 'https://')

    //     if (url === null) return // Cancelled

    //     if (url === '') {
    //         editor.chain().focus().extendMarkRange('link').unsetLink().run()
    //         return
    //     }

    //     editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    // }

    async function submit() {
        setDisabled(true)
        try {
            await fetch("https://square-forest-972c.yumnambilson.workers.dev/api/v1/notes/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: notes.title,
                    category: notes.category,
                    content: editor?.getHTML() ?? ""
                })
            })
        } catch (error) {
            console.error("Error creating note:", error)
        } finally {
            setDisabled(false)
            onNoteCreated?.()
        }
    }

    async function update(id: number) {
        if (!noteTodisplay) return
        setDisabled(true)

        try {
            await fetch(`https://square-forest-972c.yumnambilson.workers.dev/api/v1/notes/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: notes.title,
                    content: editor?.getHTML() ?? "",
                    category: notes.category,
                    notecategoryId: noteTodisplay.notecategoryId
                })
            })
        } catch (error) {
            console.error("Error updating note:", error)
        } finally {
            setDisabled(false)
            onNoteCreated?.()
        }
    }

    return (
        <div
            //@learned: How to display the note at the center of the screen using fixed and inset csss properties 
            className={`fixed bg-white z-20 ${isMaximized ? "inset-0" : "inset-4 md:inset-8 lg:inset-16 "
                }`}
        >
            <div className="border-2 border-black flex flex-col h-full">
                <div className="border-b-4 border-black p-4 flex justify-between bg-white flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setOpen(false)}
                            className="hover:bg-gray-200 border-2 border-black p-2 w-8 h-8">
                            <img src="./close.svg" />
                        </button>
                        <span className="font-bold text-sm">{editMode ? "EDIT NOTE" : "NEW NOTE"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {isMaximized ? (
                            <button onClick={() => setIsMaximized(false)} className="w-8 h-8 p-2">
                                <img src="./minimize.svg" />
                            </button>
                        ) : (
                            <button onClick={() => setIsMaximized(true)} className="w-8 h-8 p-2">
                                <img src="./maximize.svg" />
                            </button>
                        )}

                        {editMode ? (
                            <button
                                className={buttonColor}
                                disabled={isDisabled}
                                onClick={() => update(noteTodisplay!.id)}
                            >
                                UPDATE
                            </button>
                        ) : (
                            <button className={buttonColor} disabled={isDisabled} onClick={submit}>
                                CREATE
                            </button>
                        )}
                    </div>
                </div>

                <div className="overflow-y-auto flex-1 p-8">
                    <div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Untitled"
                            value={notes.title}
                            className="text-4xl md:text-5xl font-bold mb-8 border-none outline-none placeholder:text-gray-300 w-full"
                            onChange={handleChange}
                        />

                        <div className="flex gap-3 items-center mb-8 border-b-2 pb-8 border-gray-200">
                            <div>
                                <span className="text-sm font-bold text-gray-500">CATEGORY</span>
                            </div>
                            <div>
                                <input
                                    className="border-black px-3 py-2 text-sm font-mono border-2"
                                    name="category"
                                    type="text"
                                    placeholder="Add category..."
                                    value={notes.category}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <BubbleMenu
                            editor={editor}
                            tippyOptions={{ duration: 100 }}
                            className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-wrap gap-1 p-2 max-w-[90vw] overflow-x-auto z-50"
                        >
                            {/* Paragraph */}
                            <button
                                type="button"
                                disabled={!editor || isDisabled}
                                onClick={() => editor?.chain().focus().setParagraph().run()}
                                className={`border-2 border-black px-2 py-1 text-xs font-bold ${editor?.isActive("paragraph")
                                    ? "bg-black text-white"
                                    : "bg-white hover:bg-black hover:text-white"
                                    }`}
                            >
                                P
                            </button>

                            {/* Headings */}
                            <button
                                type="button"
                                disabled={!editor || isDisabled}
                                onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                                className={`border-2 border-black px-2 py-1 text-xs font-bold ${editor?.isActive("heading", { level: 1 })
                                    ? "bg-black text-white"
                                    : "bg-white hover:bg-black hover:text-white"
                                    }`}
                            >
                                H1
                            </button>
                            <button
                                type="button"
                                disabled={!editor || isDisabled}
                                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                                className={`border-2 border-black px-2 py-1 text-xs font-bold ${editor?.isActive("heading", { level: 2 })
                                    ? "bg-black text-white"
                                    : "bg-white hover:bg-black hover:text-white"
                                    }`}
                            >
                                H2
                            </button>
                            <button
                                type="button"
                                disabled={!editor || isDisabled}
                                onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                                className={`border-2 border-black px-2 py-1 text-xs font-bold ${editor?.isActive("heading", { level: 3 })
                                    ? "bg-black text-white"
                                    : "bg-white hover:bg-black hover:text-white"
                                    }`}
                            >
                                H3
                            </button>

                            {/* Separator */}
                            <span className="text-gray-300 self-center">|</span>

                            {/* Text Formatting */}
                            <button
                                type="button"
                                disabled={!editor || isDisabled}
                                onClick={() => editor?.chain().focus().toggleBold().run()}
                                className={`border-2 border-black px-2 py-1 text-xs font-bold ${editor?.isActive("bold")
                                    ? "bg-black text-white"
                                    : "bg-white hover:bg-black hover:text-white"
                                    }`}
                            >
                                B
                            </button>
                            <button
                                type="button"
                                disabled={!editor || isDisabled}
                                onClick={() => editor?.chain().focus().toggleItalic().run()}
                                className={`border-2 border-black px-2 py-1 text-xs font-bold italic ${editor?.isActive("italic")
                                    ? "bg-black text-white"
                                    : "bg-white hover:bg-black hover:text-white"
                                    }`}
                            >
                                I
                            </button>
                            <button
                                type="button"
                                disabled={!editor || isDisabled}
                                onClick={() => (editor?.chain().focus() as any).toggleUnderline().run()}
                                className={`border-2 border-black px-2 py-1 text-xs font-bold underline ${editor?.isActive("underline")
                                    ? "bg-black text-white"
                                    : "bg-white hover:bg-black hover:text-white"
                                    }`}
                            >
                                U
                            </button>

                            {/* Separator */}
                            <span className="text-gray-300 self-center">|</span>

                            {/* Code Block */}
                            <button
                                type="button"
                                disabled={!editor || isDisabled}
                                onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                                className={`border-2 border-black px-2 py-1 text-xs font-mono ${editor?.isActive("codeBlock")
                                    ? "bg-black text-white"
                                    : "bg-white hover:bg-black hover:text-white"
                                    }`}
                            >
                                {'</>'})
                            </button>


                            {/* Image */}
                            <button
                                type="button"
                                disabled={!editor || isDisabled}
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-black px-2 py-1 text-xs font-bold bg-white hover:bg-black hover:text-white"
                            >
                                📷 IMG
                            </button>
                        </BubbleMenu>

                        <div
                            className="note-editor  p-4 bg-white min-h-[400px]
                            [&_.ProseMirror]:min-h-[400px]
                            [&_.ProseMirror]:outline-none
                            [&_.ProseMirror]:whitespace-pre-wrap
                            [&_.ProseMirror_p]:text-base
                            [&_.ProseMirror_p]:leading-relaxed
                            [&_.ProseMirror_h1]:text-4xl
                            [&_.ProseMirror_h1]:font-bold
                            [&_.ProseMirror_h1]:tracking-tight
                            [&_.ProseMirror_h2]:text-2xl
                            [&_.ProseMirror_h2]:font-bold
                            [&_.ProseMirror_h2]:tracking-tight
                            [&_.ProseMirror_h3]:text-xl
                            [&_.ProseMirror_h3]:font-semibold
                            [&_.ProseMirror_h3]:tracking-tight
                            [&_.ProseMirror_img]:max-w-full
                            [&_.ProseMirror_img]:border-2
                            [&_.ProseMirror_img]:border-black
                            [&_.ProseMirror_img]:my-4
                            [&_.ProseMirror_.code-block]:bg-gray-900
                            [&_.ProseMirror_.code-block]:text-gray-100
                            [&_.ProseMirror_.code-block]:p-4
                            [&_.ProseMirror_.code-block]:rounded
                            [&_.ProseMirror_.code-block]:font-mono
                            [&_.ProseMirror_.code-block]:text-sm
                            [&_.ProseMirror_.code-block]:my-4
                            [&_.ProseMirror_.code-block]:overflow-x-auto
                            [&_.ProseMirror_.code-block]:border-2
                            [&_.ProseMirror_.code-block]:border-black
                            [&_.ProseMirror_.editor-link]:text-blue-600
                            [&_.ProseMirror_.editor-link]:underline
                            [&_.ProseMirror_.editor-link]:cursor-pointer"
                        >
                            <EditorContent editor={editor} />
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={onPickImage}
                            className="hidden"
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#39;")
}
