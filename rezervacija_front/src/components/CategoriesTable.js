import React from 'react'
import {useState, useEffect} from "react";
import {RiEdit2Fill} from "react-icons/ri";
import {MdDelete} from "react-icons/md";
import CategoryService from '../services/CategoryService'
import BookService from '../services/BookService';
import { Link} from 'react-router-dom'
import swal from 'sweetalert';
import UserService from '../services/User.service';

function CategoriesTable() {

  const [category, setCategory] = useState([]);
  const[users, setUsers] = useState([]);

  useEffect(()=>getAllCategories(),[]);
  // useEffect(()=>handleDelete(),[]);
  
  let getAdmin =  users.find(obj => {
    return obj.username === "admin";
  })

const getAllCategories=()=>{
    CategoryService.getAllCategories().then((response) => {
        setCategory(response.data)
        console.log(response.data);
    }).catch(error => {
        console.log(error);
    })
  }

const handleDelete=(categoryName=>{
  CategoryService.deleteCategory(categoryName).then((response) => {
  getAllCategories();
  
}).catch(error => {
  console.log(error)
})
})





  return (
    <div className='container'>
      <br/> <br/>
      <Link to="/add-category" className='btn btn-primary mb-2'>Pridėti kategoriją</Link>
      <br/>
        <table className="table table-striped">
  <thead>
    <tr key={category.id} >

      <th scope="col">#</th>
      <th scope="col">Kategorija</th>
      <th scope="col">Veiksmas</th>
    </tr>
  </thead>
  <tbody>
  {
              category.map(cat =>

    <tr key={cat.id} >   
      <th scope="row">{cat.id}</th>
      <td > <Link to={`/category/${cat.categoryName}/book`} className="link-primary">{cat.categoryName} </Link>  </td>
      <td>
      <Link to={`/edit-category/${cat.categoryName}`}> <RiEdit2Fill size={'1.4em'} /> </Link>
       <MdDelete style={{color: "red"}} size={'1.4em'} onClick={() =>handleDelete(cat.categoryName)}/>
      </td>
    </tr>
              )}
            </tbody>
          </table>
       </div>
  )
}

export default CategoriesTable