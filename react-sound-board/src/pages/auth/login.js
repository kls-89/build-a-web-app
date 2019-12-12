import React from "react";

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <h3>Login to access your saved soundboards.</h3>
      <form method="POST" action="/login">
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username" />
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password" />
        <br />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
