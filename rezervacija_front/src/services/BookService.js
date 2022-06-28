import axios from 'axios';
import authHeader from "./Auth-header";

const BOOK_REST_API_URL = 'http://localhost:8080/api';

class BookService {
    getAllBooks() {
        return axios.get(BOOK_REST_API_URL + '/book', { headers: authHeader() })
    }

    getAllBooksByCategoryName(categoryName){
        return axios.get(BOOK_REST_API_URL + '/category/' + categoryName +'/book', { headers: authHeader() });
    }

    createBook( categoryName, book){
        return axios.post(BOOK_REST_API_URL + '/category/' + categoryName + '/book', book, { headers: authHeader() })
    }

    // getMealByIdbookId){
    //     return axios.get(BOOK_REST_API_URL + '/category' + '/' + bookId);
    // }

    updateBook(bookId, categoryName, book){
        return axios.put(BOOK_REST_API_URL + '/category/'  + categoryName + '/book/' + bookId, book, { headers: authHeader() });
    }


        deleteBook(categoryName, bookId){
            return axios.delete(BOOK_REST_API_URL + '/category/' + categoryName + '/book/' + bookId, { headers: authHeader() });
        }
 }



export default new BookService();