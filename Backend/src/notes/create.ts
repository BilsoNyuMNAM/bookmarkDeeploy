import { PrismaClient } from "../../generated/prisma/client.js"
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

type Bindings = {
    DATABASE_URL: string
}

const noterouter = new Hono<{ Bindings: Bindings }>();

const getPrismaClient = (databaseUrl: string) => {
    return new PrismaClient({
        accelerateUrl: databaseUrl,
    }).$extends(withAccelerate())
}

type saveData = {
    id: number,
    title: string,
    notecategoryId: number,
    content: string | null
}

noterouter.post("/create", async (c) => { //api/v1/notes
    const prisma = getPrismaClient(c.env.DATABASE_URL)
    const body = await c.req.json();
    const { title, category, content } = body; //title = body.title, category = body.category, content = body.content
    const categoryId = await prisma.notecategory.findFirst({
        where: {
            category: category
        }
    })
    if (!categoryId) {
        const createCategory = await prisma.notecategory.create({
            data: {
                category: category
            }
        })
        const createNote: saveData = await prisma.note.create({
            data: {
                title: title,
                notecategoryId: createCategory.id,
                content: content
            }

        })
        return c.json({
            message: "Note created successfully",
            result: createNote
        }, 201)
    }
    //else
    const createNote = await prisma.note.create({
        data: {
            title: title,
            notecategoryId: categoryId.id,
            content: content
        }
    })

    return c.json({
        message: "Note created successfully",
        result: createNote
    }, 201)
})

noterouter.get("/getall", async (c) => {
    const prisma = getPrismaClient(c.env.DATABASE_URL)
    const getNotes = await prisma.notecategory.findMany({
        select: {
            category: true,
            notes: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    notecategoryId: true,
                }
            }
        }
    })
    return c.json({
        message: "Notes fetched successfully",
        result: getNotes
    }, 200)
})


export default noterouter;