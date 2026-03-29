import express from "express";
import {createSnippet,Snippets,deleteSnippet,updateSnippet,snippetsById,snippetsByTag,snippetByLanguage} from "../controllers/snippetController.js";

const router = express.Router();

router.post("/snippets", createSnippet);
router.get("/snippets", Snippets);
router.get("/snippets/:id", snippetsById);
router.delete("/snippets/:id",deleteSnippet)
router.put('/snippets/:id',updateSnippet)
router.get("/tags/:tag", snippetsByTag);
router.get("/language/:language", snippetByLanguage);

export default router;