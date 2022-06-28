import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import BookService from '../services/BookService';

export default function AddBook() {
  const { catName } = useParams();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [amount, setAmount] = useState(0);
  const [categoryName, setCategoryName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = { name, description, price, image, amount };

    if (id && catName) {
      BookService.updateBook(id, catName, book).then((response) => {
        navigate(`/category/${catName}/book`)
      }).catch(error => {
        console.log(error);
      });
    } else {
     BookService.createBook(categoryName, book).then((response) => {
        console.log(response.data)
        setCategoryName(response.data.categoryName);
        navigate(`/category/${categoryName}/book`)
      }).catch(error => {
        console.log(error);
      });
    }
  }

  useEffect(() => {
    catName && BookService.getAllBooksByCategoryName(catName).then((response) => {
      let books = response.data;

     books.forEach(book => {
        if (book.id === Number(id)) {
          setName(book.name);
          setDescription(book.description);
          setPrice(book.price);
          setImage(book.image);
          setAmount(book.amount);
          setCategoryName(catName);
        }
      });
    }).catch(error => {
      console.log(error)
    })
  }, [])

  const title = () => {
    if (id && catName) {
      return <h3 className='text-center'>Keisti knygos inforaciją</h3>
    } else {
      return <h3 className='text-center'>Pridėti knygą</h3>
    }
  }

  return (
    <div>
      <br /> <br />
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            {title()}
            <div className='card-body'>
              <form onSubmit={(e) => handleSubmit(e)}>
                
                <div className='form-group mb-2'>
                  <label className='form-label'>Knyga: </label>
                  <input type="text" required placeholder='Įveskite knygos pavadinimą' name='bookName' className='form-control' value={name}
                    onChange={(e) => setName(e.target.value)} />
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Aprašymas: </label>
                  <input type="text" required placeholder='Įveskite knygos aprašymą' name='description' className='form-control' value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Kaina: </label>
                  <input type="text" required placeholder='Įveskite kainą' name='price' className='form-control' value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Nuotrauka: </label>
                  <input type="text" required placeholder='Nuoroda' name='image' className='form-control' value={image}
                    onChange={(e) => setImage(e.target.value)} />
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Kiekis: </label>
                  <input type="text" required placeholder='Įveskite kiekį' name='amount' className='form-control' value={amount}
                    onChange={(e) => setAmount(e.target.value)} />
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Kategorija: </label>
                  <input type="text" required placeholder='Įveskite kategoriją' name='category' className='form-control' value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)} />
                </div>

                <button className='btn btn-success' type='submit'>Pateikti</button>
                <Link to={`/category/${catName}/book`}><button className='btn btn-danger'>Atšaukti</button></Link>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

