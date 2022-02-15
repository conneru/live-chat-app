import "./Login.css";
import chat from "../../chat.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { authenticate } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) navigate("/dashboard");
  });

  async function submitForm() {
    let res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (res.ok) {
      dispatch(authenticate());
      navigate("/dashboard");
    }
  }
  async function submitRegister() {
    let res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        hashedPassword: password,
      }),
    });
    if (res.ok) {
      console.log("logginin now");
      let login = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });
      console.log(login);
      if (login.ok) {
        dispatch(authenticate());
        navigate("/dashboard");
      }
    }
  }

  async function demoUser() {
    let res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "demo@gmail.com",
        password: "demo",
      }),
    });
    if (res.ok) {
      dispatch(authenticate());
      navigate("/dashboard");
    }
  }
  return (
    <div
      style={{
        backgroundColor: "#c396e4",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#ebebeb",
      }}
    >
      {login ? (
        <div
          style={{
            width: "700px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#343d46",
            height: "400px",
            borderRadius: "10px",
            zIndex: "0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              zIndex: "1",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="username">Email</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                className="login-input"
              ></input>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="password">Password</label>
              <input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                className="login-input"
              ></input>
            </div>
            <div className="login-page-button" onClick={submitForm}>
              Login
            </div>
            <div
              onClick={() => {
                setLogin(false);
                setEmail("");
                setPassword("");
                setUsername("");
              }}
              style={{
                color: "#c396e4",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Don't have an account? Click to register!
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={chat}
              alt="chat"
              style={{
                width: "250px",
                height: "250px",
                paddingBottom: "75px",
              }}
            ></img>
            <div
              onClick={demoUser}
              style={{
                color: "#c396e4",
                cursor: "pointer",
                marginLeft: "50px",
              }}
            >
              Demo User
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "400px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#343d46",
            height: "600px",
            borderRadius: "10px",
            zIndex: "0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <label htmlFor="username">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                className="register-input"
              ></input>
            </div>
            <label htmlFor="username">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="username"
              className="register-input"
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <label htmlFor="password">Password</label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="register-input"
            ></input>
          </div>
          <div className="register-page-button" onClick={submitRegister}>
            Register
          </div>
          <div
            onClick={() => {
              setLogin(true);
              setEmail("");
              setPassword("");
              setUsername("");
            }}
            style={{
              color: "#c396e4",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Have an account? Click to login!
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
