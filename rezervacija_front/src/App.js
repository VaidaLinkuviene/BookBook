import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddCategory from "./components/AddCategory";
import BookTable from "./components/BookTable";
import AddBook from "./components/AddBook";
import CategoriesTable from "./components/CategoriesTable";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";

const AuthRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.accessToken) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};

function App() {
  return (
    <div>
       <Router>
         <Header />
         <div className="container">
           <Routes>
           {/* <Route path='/home' element={ <Home />}/> */}
           <Route path='/login' element={ <Login />}/>
           <Route path='/register' element={ <Register />}/>
           <Route path='/profile' element={ <Profile />}/>
           <Route path='/user' element={<BoardUser />}/>
           <Route path="/" element={ <CategoriesTable />}/>
             <Route path="/add-category" element={<AddCategory />} />
             <Route path="/edit-category/:name" element={<AddCategory/>} />
             <Route path='/category/:name/book' element={<BookTable />} />  
             <Route path="/category/:catName/add-book" element={<AddBook />} />
             <Route path="/category/:catName/book/:id" element={<AddBook/>} />

                 <Route path="/category/:categoryName/book" element={ <BookTable />}/>

           </Routes>
         </div>
         <Footer />
       </Router>
     
        </div>
  );
}

export default App;
