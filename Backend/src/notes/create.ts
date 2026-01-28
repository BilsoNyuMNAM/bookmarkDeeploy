

import {Hono} from "hono";

const noterouter = new Hono();
//api/v1/notes
noterouter.post("/create", async (c)=>{
    const body = await c.req.json();
    return c.json({
       title: body.title,
       category: body.category,
       content: body.content
    })
})



export default noterouter;