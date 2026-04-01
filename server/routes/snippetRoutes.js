import express from "express";
import {createSnippet,Snippets,deleteSnippet,updateSnippet,snippetsById,snippetsByTag,snippetByLanguage} from "../controllers/snippetController.js";
import protect from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/snippets", protect, createSnippet);
router.get("/snippets", protect, Snippets);
router.get("/snippets/:id", protect, snippetsById);
router.delete("/snippets/:id", protect, deleteSnippet);
router.put('/snippets/:id', protect, updateSnippet);
router.get("/tags/:tag", protect, snippetsByTag);
router.get("/language/:language", protect, snippetByLanguage);

export default router;