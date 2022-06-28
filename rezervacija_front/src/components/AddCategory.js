import React, {useState, useEffect} from 'react'
import {useNavigate, Link, useParams} from 'react-router-dom'
import CategoryService from '../services/CategoryService';

export default function AddCategory() {

    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate();
    const {name} = useParams();


    const handleSubmit = (e) =>{
      e.preventDefault();
      const category = {categoryName};

      if(name){
CategoryService.updateCategory(name, category).then((response)=>{
  navigate('/')
 }).catch(error => {
        console.log(error);
      });
      }else{

      CategoryService.createCategory(category).then(response=>{
console.log(response.data)
navigate("/");
      }).catch(error => {
        console.log(error);
      });
    }
  };

  useEffect(()=>{
name&&CategoryService.getCategoryByCategoryName(name).then((response) =>{
  setCategoryName(response.data.categoryName)
}).catch(error =>{
  console.log(error)
})
  },[])


const title=()=>{
  if(name){
    return <h3 className='text-center'>Keisti kategoriją</h3>
  }else{
    return <h3 className='text-center'>Pridėti kategoriją</h3>
  }
  }

  return (
    <div>
      <br/> <br/>
      <div className='container'>
      <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
          {title()}
                            <div className='card-body'>
                  <form onSubmit={(e) =>handleSubmit(e)}>
                    
<div className='form-group mb-2'>
    <label className='form-label'>Kategorija: </label>
    <input type="text" required placeholder='Įveskite kategoriją' name='categoryName' className='form-control' value={categoryName} 
    onChange={(e)=> setCategoryName(e.target.value)} />

</div>

<button className='btn btn-success' >Pateikti</button>
<Link to="/" className='btn btn-danger'>Cancel</Link>

                  </form>
              </div>
          </div>
      </div>
    </div>
    </div>
  )
}
