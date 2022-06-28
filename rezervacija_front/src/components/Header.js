import React from 'react'
import {Link} from 'react-router-dom';
import AuthService from "../services/Auth.service";
import { useState, useEffect } from "react";
import './Header.css'; 

function Header() {

    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
        setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      }
    }, []);

    const logOut = () => {
      AuthService.logout();
    };

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
          {currentUser && (
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Knygų lentelė
              </Link>
            </li>
          )}
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderatoriaus informacija
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Administratoriaus Informacija
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
               Jūsų užsakymai
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav">
              <li className="nav-item ">
                <Link to={"/profile"} className="nav-link me-2">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item d-flex">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Atsijungti
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Prisijungti
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Registruotis
                </Link>
              </li>
            </div>
           
          )}
        </nav>
    </div>
 )


    // return (
    //     <div>

    //         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    //             <div className="container-fluid">
    //                 <a className="navbar-brand" href="#">Food Categories</a>
    //             </div>
    //         </nav>
    //     </div>

    // )
}
    

export default Header