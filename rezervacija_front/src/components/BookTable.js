import React from 'react'
import { useState, useEffect } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import CategoryService from '../services/CategoryService'
import BookService from '../services/BookService';
import { Link, useParams } from 'react-router-dom'
import swal from 'sweetalert';

function BookTable() {


  const [books, setBooks] = useState([]);
  const { name } = useParams();
  const { categoryName } = useParams();

  useEffect(() => getAllBooksByCategoryName(name), [name]);
  // useEffect(()=>handleDelete(),[]);

  const getAllBooksByCategoryName = (categoryName) => {
   BookService.getAllBooksByCategoryName(categoryName).then((response) => {
      setBooks(response.data);
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })

  }

  const handleDelete = (categoryName, bookId) => {
    BookService.deleteBook(categoryName, bookId).then((response) => {
      getAllBooksByCategoryName(categoryName, bookId);
    }).catch(error => {
      console.log(error)
    })
  }


  return (
    <div className='container'>
      <br /> <br />
      <Link to={`/category/${name}/add-book`} className='btn btn-primary mb-2'>Pridėti knygą</Link>
      <br />
      <table className='table table-bordered'>
        <thead>
          <tr key={books.id} >
            <th>ID</th>
            <th>Pavadinimas</th>
            <th>Santrauka</th>
            <th>ISBN</th>
            <th>Nuotrauka</th>
            <th>Puslapių skaičius</th>
            <th>Veiksmas</th>
          </tr>
        </thead>
        <tbody>
          {
            books.map(book =>
              <tr key={book.id}>
                {/* <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input> */}
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.description}</td>
                <td>{book.price}</td>
                <td>{book.image}</td>
                <td>{book.amount}</td>
                <td><Link to={`/category/${name}/book/${book.id}`}> <RiEdit2Fill size={'1.4em'} /> </Link>
                  <MdDelete style={{ color: "red" }} size={'1.4em'} onClick={() => handleDelete(name, book.id)} />
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default BookTable