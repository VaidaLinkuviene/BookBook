import axios from 'axios';
import authHeader from "./Auth-header";

const CATEGORY_REST_API_URL = 'http://localhost:8080/api/category';

class CategoryService {
    getAllCategories() {
        return axios.get(CATEGORY_REST_API_URL, { headers: authHeader() })
    }

    getCategoryByCategoryName(categoryName) {
        return axios.get(CATEGORY_REST_API_URL + '/' + categoryName, { headers: authHeader() })
    }

    createCategory(category){
        return axios.post(CATEGORY_REST_API_URL, category, { headers: authHeader() } )
    }

//     getCategoryById(categoryId){
//         return axios.get(CATEGORY_REST_API_URL + '/' + categoryId);
//     }

    updateCategory(categoryName, category){
        return axios.put(CATEGORY_REST_API_URL + '/' + categoryName, category, { headers: authHeader() });
    }


        deleteCategory(categoryName){
            return axios.delete(CATEGORY_REST_API_URL + '/' + categoryName, { headers: authHeader() });
        }
 }



export default new CategoryService();