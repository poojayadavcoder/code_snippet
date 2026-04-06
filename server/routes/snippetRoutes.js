import express from "express";
import {createSnippet,Snippets,deleteSnippet,updateSnippet,snippetsById,snippetsByTag,snippetByLanguage, snippets_public, snippet_likes} from "../controllers/snippetController.js";
import protect from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/snippets", protect, createSnippet);
router.get("/snippets", protect, Snippets);
router.get("/snippets/:id", snippetsById);
router.delete("/snippets/:id", protect, deleteSnippet);
router.put('/snippets/:id', protect, updateSnippet);
router.get("/tags/:tag", protect, snippetsByTag);
router.get("/language/:language", protect, snippetByLanguage);
router.get('/snippets_public',snippets_public)
router.post('/snippet_likes/:id', protect, snippet_likes)

export default router;