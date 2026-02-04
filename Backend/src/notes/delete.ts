import { PrismaClient } from "../../generated/prisma/client.js"
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

type Bindings = {
    DATABASE_URL: string
}

const deleteRouter = new Hono<{ Bindings: Bindings }>();

const getPrismaClient = (databaseUrl: string) => {
    return new PrismaClient({
        accelerateUrl: databaseUrl,
    }).$extends(withAccelerate())
}

// DELETE /api/v1/notes/delete/:id
deleteRouter.delete("/:id", async (c) => {
    const prisma = getPrismaClient(c.env.DATABASE_URL)
    const id = Number(c.req.param("id"))

    if (isNaN(id)) {
        return c.json({
            message: "Invalid note ID provided"
        }, 400)
    }

    try {

        const existingNote = await prisma.note.findUnique({
            where: { id: id }
        })

        if (!existingNote) {
            return c.json({
                message: "Note not found"
            }, 404)
        }


        const deletedNote = await prisma.note.delete({
            where: { id: id }
        })

        return c.json({
            message: "Note deleted successfully",
            result: deletedNote
        }, 200)

    } catch (error) {
        console.error("Error deleting note:", error)
        return c.json({
            message: "Failed to delete note"
        }, 500)
    }
})

export default deleteRouter;
