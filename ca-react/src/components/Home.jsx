import React, { useState } from "react";

export default function Home({
  facade,
  setLoggedIn,
  setErrorMessage,
  logout,
  loggedIn,
  loggedInUser,
  setLoggedInUser,
}) {
  const initialState = { username: "", password: "" };
  const [login, setLogin] = useState(initialState);

  const changeName = (event) => {
    //console.log([event.target.name])
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  function addUser() {
    const userObject = {
      userName: login.username,
      userPass: login.password,
    };
    console.log(userObject);

    const options = facade.makeOptions("POST", true, userObject);

    fetch(`https://jenseninc.dk/Restaurant/api/info/newUser`, options)
      .then(facade.handleHttpErrors)
      .then((data) => {
        setLogin(initialState);
        alert("User has been created - Now you can login!");
      })
      .catch(facade.errorHandling);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(login);

    facade.login(login.username, login.password, setLoggedIn, setErrorMessage);
    console.log(setLoggedIn);
    console.log(setErrorMessage);
    setLoggedInUser(login.username);
    console.log(loggedInUser);
    setLogin(initialState);
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log(login);
    if (login.username === null) {
      alert("You need to fill in a username..");
    } else {
      addUser();
    }
  };

  return (
    <div className="col-xs-1" align="center">
      <h2>Home</h2>
      {!loggedIn && (
        <form onSubmit={handleSubmit}>
          <label>
            User Name:
            <br />
            <input
              type="text"
              name="username"
              value={login.username}
              onChange={changeName}
            />
            <br />
            Password:
            <br />
            <input
              type="text"
              name="password"
              value={login.password}
              onChange={changeName}
            />
          </label>
          <br />
          <br />
          <button type="submit">Login</button>
          <button onClick={handleClick}>Sign Up</button>
        </form>
      )}
      <p>Role: {facade.getUserRoles()}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
