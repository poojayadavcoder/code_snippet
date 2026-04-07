import Snippet from "../models/snippetModel.js";
import User from "../models/User.js";
import { io } from "../app.js";
const createSnippet = async (req, res) => {
  try {
    const savedSnippet = await Snippet.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(savedSnippet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Snippets = async (req, res) => {
  try {
    console.log("USER ID:", req.user.id);
    const data = await Snippet.find({ user: req.user.id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const snippets_public=async (req,res)=>{
  try{
     const { language, search, page = 1, limit = 9 } = req.query;

     let query = { visibility: "public" };
      
    if (language && language !== "All Snippets") {
      query.language = language;
    }
    
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
      const snippets = await Snippet.find(query)
      .populate("user", "name")
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(snippets);
  }
  catch (error){
    res.status(500).json({message:error.message})
  }
}

const snippetsById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id).populate("user", "name");

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    } 
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }
    await Snippet.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Snippet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }
    const updatedSnippet = await Snippet.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true },
    );

    res.status(200).json(updatedSnippet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const snippetsByTag = async (req, res) => {
  try {
    const snippets = await Snippet.find({
      tags: req.params.tag,
      user: req.user.id,
    });
    if (snippets.length === 0) {
      return res
        .status(404)
        .json({ message: "No snippets found for this tag" });
    }
    res.status(200).json(snippets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const snippetByLanguage = async (req, res) => {
  try {
    const snippets = await Snippet.find({
      language: req.params.language,
      user: req.user.id,
    });
    if (snippets.length === 0) {
      return res
        .status(404)
        .json({ message: "No snippets found for this language" });
    }
    res.status(200).json(snippets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const snippet_likes = async (req, res) => {
  try {
    const snippetId = req.params.id;
    const userId = req.user.id; // Use userId from protect middleware

    const snippet = await Snippet.findById(snippetId);
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    const index = snippet.likes.indexOf(userId);
    if (index === -1) {
      snippet.likes.push(userId);
    } else {
      snippet.likes.splice(index, 1);
    }

    await snippet.save();

  io.emit("likeUpdated", {
    snippetId: snippet._id,
    likeCount: snippet.likes.length
  });

    res.json({ likeCount: snippet.likes.length, liked: index === -1 });
  } catch (error) {
    console.error("Error in snippet_likes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  createSnippet,
  Snippets,
  deleteSnippet,
  updateSnippet,
  snippetsById,
  snippetsByTag,
  snippetByLanguage,
  snippets_public,
  snippet_likes
};
