import { Context } from "hono";
import {
  listBookService,
  limitBookService,
  getSingleBookService,
  createBookService,
  updateBookService,
  deleteBookService,
} from "./book.service";

export const listBook = async (c: Context) => {
  try {
    const limit = Number(c.req.query("limit"));
    const books = await listBookService();

    if (books == null || books.length == 0) {
      return c.text("No books found", 404);
    }
    return c.json(books, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 500);
  }
};

export const getSingleBook =  async (c: Context) => {
    try{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid book ID", 400)
        }
        const book = await getSingleBookService(id);
        if (book == null) {
            return c.text("Book not found", 404);
        }
        return c.json(book, 200);
    }
    catch(error: any){
        return c.json({error: error?.message}, 500);
    }

};

export const createBook = async (c: Context) => {
    try{
       const book = await c.req.json();
         const result = await createBookService(book);
         if(!result){
             return c.text("Book not created", 500);
         }
         return c.json({message: result}, 201);
    }
    catch(error: any){
        return c.json({error: error?.message}, 500);
    }
};

export const updateBook = async (c: Context) => {
    try{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid book ID", 400);
        }
        const book = await c.req.json();

        const bookExists = await getSingleBookService(id);
        if(bookExists == null){
            return c.text("Book not found", 404);
        }


        const result = await updateBookService(id, book);
        if(!result){
            return c.text("Book not updated", 500);
        }
        return c.json({message: result}, 200);
    }
    catch(error: any){
        return c.json({error: error?.message}, 500);
    }
};

export const deleteBook = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)){
        return c.text("Invalid book ID", 400);
    }

    try{
        const bookExists = await getSingleBookService(id);
        if(bookExists == null){
            return c.text("Book not found", 404);
        }

        const result = await deleteBookService(id);
        if(!result){
            return c.text("Book not deleted", 500);
        }
        return c.json({message: result}, 200);
    }
    catch(error: any){
        return c.json({error: error?.message}, 500);
    }
};

export const limitBook = async (c: Context) => {
    try{
        const limit = Number(c.req.query("limit"));
        if(isNaN(limit)){
            return c.text("Invalid limit", 400);
        }
        const books = await limitBookService(limit);
        if(books == null || books.length == 0){
            return c.text("No books found", 404);
        }
        return c.json(books, 200);
    }
    catch(error: any){
        return c.json({error: error?.message}, 500);
    }
}