

import { Hono } from "hono";
import { PrismaClient } from "../../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
const updateRouter = new Hono;
const getPrismaClient = (databaseUrl: string) => {
    return new PrismaClient({
        accelerateUrl: databaseUrl,
    }).$extends(withAccelerate())
}


updateRouter.put("/:id", async (c)=>{
    const body = await c.req.json();
     const prisma = getPrismaClient(c.env.DATABASE_URL)
     const updateId = c.req.param('id')//get the id of the notes to be updated 

     ///=---------------------------------------------------------------------------
     const categoryChange = await prisma.notecategory.findFirst({
        where:{
            id: body.notecategoryId
        }
     })
     console.log("body.notecategoryId:", body.notecategoryId, typeof body.notecategoryId);
     console.log("categoryChange:", categoryChange);
     console.log("body.category:", body.category);
     console.log("categoryChange?.category:", categoryChange?.category);
console.log("Are they equal?", body.category === categoryChange?.category);

     if(body.category != categoryChange?.category){
        const noteUpdate = await prisma.notecategory.create({
            data:{
                category:body.category
            }
        })
        const updateResult = await prisma.note.update({
            where: {
                id: Number(updateId)
            },
            data:{
                title: body.title,
                content:body.content,
                notecategoryId:noteUpdate.id
            }

        })
        return c.json({
            message:"Note updated successfully also the category name was also updated",
            updatedNotes:updateResult
        },201)
     }

     const updateResult = await prisma.note.update({
        where: {
            id: Number(updateId)
        },
        data:{
            title: body.title,
            content:body.content
        }

     })
     return c.json({
        message:"Note updated successfully",
        updatedNotes:updateResult
     },201)

    //---------------------------------------------------------------------------
     //what if the user is updating the category also ??
     //i need to query the category table and then compare the values being sent 
     //lets just disabled the cateogry edit for now 

})





export default updateRouter