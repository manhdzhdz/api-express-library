import { Router } from "express";
import {
  getAuthor,
  addAuthor,
  deleteAuthor,
  getAuthors,
  updateAuthor,
} from "../controllers/authors.controller.js";

const router = Router();

//crud
router.post("/authors", addAuthor);
router.get("/authors", getAuthors);
router.get("/authors/:id", getAuthor);

router.patch("/authors/:id", updateAuthor);
router.delete("/authors/:id", deleteAuthor);

export default router;
