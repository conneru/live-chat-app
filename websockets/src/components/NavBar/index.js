import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [proInfo, setProInfo] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const clickedOutside = (e) => {
      if (proInfo && ref.current && !ref.current.contains(e.target)) {
        setProInfo(false);
      }
    };
    document.addEventListener("mousedown", clickedOutside);
    return () => {
      document.removeEventListener("mousedown", clickedOutside);
    };
  }, [proInfo]);

  return (
    <nav>
      <div className="navBar">
        <NavLink to="/" exact={true} className="homeLink">
          <span className="logo">Discourse</span>
        </NavLink>

        {user ? (
          <div className="login-button" onClick={() => navigate("/dashboard")}>
            Dashboard
          </div>
        ) : (
          <div className="login-button" onClick={() => navigate("/login")}>
            Login
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
