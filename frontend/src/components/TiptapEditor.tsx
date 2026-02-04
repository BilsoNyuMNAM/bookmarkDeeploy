import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import CodeBlock from '@tiptap/extension-code-block'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useRef } from 'react'
import './TiptapEditor.css'

interface TiptapEditorProps {
    content: string
    onUpdate: (html: string) => void
}

export default function TiptapEditor({ content, onUpdate }: TiptapEditorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                codeBlock: false, // Disable default, use extension
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'tiptap-link',
                },
            }),
            Underline,
            CodeBlock.configure({
                HTMLAttributes: {
                    class: 'tiptap-code-block',
                },
            }),
            Placeholder.configure({
                placeholder: 'Write your notes here...',
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onUpdate(editor.getHTML())
        },
    })

    // Update editor content when prop changes (for edit mode)
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content)
        }
    }, [content, editor])

    const handleImageUpload = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && editor) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const base64 = event.target?.result as string
                editor.chain().focus().setImage({ src: base64 }).run()
            }
            reader.readAsDataURL(file)
        }
        // Reset input so same file can be selected again
        e.target.value = ''
    }

    const setLink = () => {
        if (!editor) return
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('Enter URL:', previousUrl)

        if (url === null) return

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }

    if (!editor) {
        return null
    }

    return (
        <div className="tiptap-container">
            {/* Hidden file input for image uploads */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
            />

            {/* Floating Toolbar (BubbleMenu) */}
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="bubble-menu">
                {/* Headings */}
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    title="Heading 1"
                >
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    title="Heading 2"
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                    title="Heading 3"
                >
                    H3
                </button>

                <span className="separator">|</span>

                {/* Text Formatting */}
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                    title="Bold"
                >
                    <strong>B</strong>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                    title="Italic"
                >
                    <em>I</em>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'is-active' : ''}
                    title="Underline"
                >
                    <u>U</u>
                </button>

                <span className="separator">|</span>

                {/* Code Block */}
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                    title="Code Block"
                >
                    {'</>'}
                </button>

                {/* Link */}
                <button
                    onClick={setLink}
                    className={editor.isActive('link') ? 'is-active' : ''}
                    title="Add Link"
                >
                    🔗
                </button>

                {/* Image */}
                <button onClick={handleImageUpload} title="Insert Image">
                    📷
                </button>
            </BubbleMenu>

            {/* Editor Content Area */}
            <EditorContent editor={editor} className="tiptap-editor-content" />
        </div>
    )
}
