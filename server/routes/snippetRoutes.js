import express from "express";
const router = express.Router();
import {createSnippet,Snippets,deleteSnippet,updateSnippet,snippetsById,snippetsByTag,snippetByLanguage} from "../controllers/snippetController.js";

router.post("/snippets", createSnippet);
router.get("/snippets", Snippets);
router.get("/snippets/:id", snippetsById);
router.delete("/snippets/:id",deleteSnippet)
router.put('/snippets/:id',updateSnippet)
router.get("/tags/:tag", snippetsByTag);
router.get("/language/:language", snippetByLanguage);
export default router;