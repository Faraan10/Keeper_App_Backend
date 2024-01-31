const express = require("express");
const router = express.Router();
const Data = require("../models/DataModel");

// get
router.get("/", async (req, res) => {
  const data = await Data.find({});
  res.status(200).json(data);
});

//post
router.post("/post", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res
      .status(400)
      .json({ message: "You have not filled the required fields" });
    return;
  }

  checkTitle = await Data.findOne({
    title: title.toUpperCase(),
  });

  if (checkTitle) {
    res.status(400).json({ message: "Title cannot be same" });
    return;
  }

  const data = await Data.create({
    title: title.toUpperCase(),
    content: content,
  });

  res.status(200).json(data);
});

// update

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  const findData = await Data.findById(id);

  if (!findData) {
    res.status(400).json({ message: "The data does not exist" });
    return;
  }

  if (!title || !content) {
    res
      .status(400)
      .json({ message: "You have not filled the required fields" });
    return;
  }

  const updateData = await Data.findByIdAndUpdate(
    id,
    {
      title: title.toUpperCase(),
      content: content,
    },
    { new: true }
  );

  res.status(200).json(updateData);
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  findData = await Data.findById(id);

  if (!findData) {
    res.status(400).json({ message: "Data does not exist" });
    return;
  }

  const deleteData = await Data.findByIdAndDelete(id);

  res.status(200).json(deleteData);
});

module.exports = router;
