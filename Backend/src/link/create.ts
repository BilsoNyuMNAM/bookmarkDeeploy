import { Hono } from "hono";
import { PrismaClient } from '../../generated/prisma/client.js'
import { withAccelerate } from '@prisma/extension-accelerate'

type Bindings = {
    DATABASE_URL: string
}

const router = new Hono<{ Bindings: Bindings }>()

// Create a helper function to get the Prisma client
const getPrismaClient = (databaseUrl: string) => {
    return new PrismaClient({
        accelerateUrl: databaseUrl,
    }).$extends(withAccelerate())
}

router.post("/save", async (c) => {
    const prisma = getPrismaClient(c.env.DATABASE_URL)

    const body = await c.req.json()

    // If the category name is empty, set it to "no category"
    if (!body.categoryName || body.categoryName === "") {
        body.categoryName = "no category"
    }

    const categoryName = body.categoryName

    // Check if the category already exists
    const existCategory = await prisma.category.findFirst({
        where: {
            CategoryName: categoryName
        }
    })    
    if (existCategory) {
        // Category exists, save the link with this category
        const saveLink = await prisma.link.create({
            data: {
                url: body.url,
                Name: body.Name,
                Description: body.Description,
                CategoryId: existCategory.id
            }
        })
        return c.json({
            message: "link saved successfully",
            save: saveLink
        }, 201)
    } else {
        // Category doesn't exist, create it and then save the link
        try {
            const saveCategory = await prisma.category.create({
                data: {
                    CategoryName: categoryName
                }
            })

            const saveLink = await prisma.link.create({
                data: {
                    url: body.url,
                    Name: body.Name,
                    Description: body.Description,
                    CategoryId: saveCategory.id
                }
            })
            return c.json({
                message: "link and category saved successfully",
                save: saveLink
            }, 201)
        } catch (error) {
            
            return c.json({
                error: "error saving the link or category",
                errorLogic: error
            }, 500)
        }
    }
})




router.get("/showall", async (c) => {
    const prisma = getPrismaClient(c.env.DATABASE_URL)

    const getallLinks = await prisma.link.findMany({
        select: {
            id: true,
            url: true,
            Name: true,
            createdAt: true,
            CategoryId: true,
            category: {
                select: {
                    CategoryName: true
                }
            }
        }
    })

    if (!getallLinks || getallLinks.length === 0) {
        return c.json({
            message: "no links found"
        }, 404)
    }

    return c.json({
        result: getallLinks
    })
})

router.delete("/delete/:id", async (c) => {
    const id = parseInt(c.req.param('id'))
    const prisma = getPrismaClient(c.env.DATABASE_URL)

    try {
        const deletedResponse = await prisma.link.delete({
            where: {
                id: id
            }
        })

        return c.json({
            message: "link deleted successfully",
            deleted: deletedResponse
        })
    } catch (error) {
        console.error(error)
        return c.json({
            message: "error deleting the link",
            error: error
        }, 500)
    }
})

router.post("/save/appleNote", async (c) => {
    const prisma = getPrismaClient(c.env.DATABASE_URL)
    try {
        const body = await c.req.json()
        const { title, link, category } = body
        if (!link) {
            return c.json({
                error: "link is required"
            }, 400)
        }
        const linkTitle = title && title.trim() !== "" ? title : link
        const categoryName = category && category.trim() !== "" ? category : "no category"
        // Check if category exists, otherwise create it
        let targetCategory = await prisma.category.findFirst({
            where: {
                CategoryName: categoryName
            }
        })
        if (!targetCategory) {
            targetCategory = await prisma.category.create({
                data: {
                    CategoryName: categoryName
                }
            })
        }
        // Save the link associated with the category
        const savedLink = await prisma.link.create({
            data: {
                url: link,
                Name: linkTitle,
                CategoryId: targetCategory.id
            }
        })
        return c.json({
            message: "link saved successfully from apple note shortcut",
            save: savedLink
        }, 201)
    } catch (error) {
        return c.json({
            error: "error saving the link from apple note shortcut",
        })
    }
})
export default router;