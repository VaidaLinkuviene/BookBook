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

const AuthAdminRoute = ({children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if(user.username !== "admin") {
    return <Navigate to="/" replace/>
  }
  return children;
}

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
           <Route path='/profile' element={ <AuthRoute><Profile /> </AuthRoute>}/>
           <Route path='/user' element={<AuthRoute><BoardUser /></AuthRoute>}/>
           <Route path="/" element={ <Login />}/>
             <Route path="/add-category" element={<AuthAdminRoute><AddCategory /></AuthAdminRoute>} />
             <Route path="/edit-category/:name" element={<AuthAdminRoute><AddCategory/></AuthAdminRoute>} />
             <Route path='/category/:name/book' element={<BookTable />} />  
             <Route path="/category/:catName/add-book" element={<AuthAdminRoute><AddBook /></AuthAdminRoute>} />
             <Route path="/category/:catName/book/:id" element={<AuthAdminRoute><AddBook/></AuthAdminRoute>} />

                 <Route path="/category/:categoryName/book" element={ <BookTable />}/>

           </Routes>
         </div>
         <Footer />
       </Router>
     
        </div>
  );
}

export default App;
