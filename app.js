const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome To RestPost ! RestPost is a blogging API built with Node , Postgres & Prisma .",
  });
});
app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});
app.post("/posts", async (req, res) => {
  const { title, content } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
    },
  });
  res.json(post);
});
app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findFirst({
    where: { id: parseInt(id) },
  });
  res.json(post);
});
app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await prisma.post.update({
    where: { id: parseInt(id) },
    data: { title: title, content: content },
  });
  res.json(post);
});
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const posts = await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json(posts);
});
app.listen(PORT, () => {
  console.log("Server Initialized On Port 3000 !");
});
