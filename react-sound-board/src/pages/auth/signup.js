import React from "react";

const SignUp = () => {
  return (
    <>
      <h1>Sign Up</h1>
      <h3>
        Create an account to save your soundboards and share sounds with your
        friends!
      </h3>
      <form method="POST" action="/signup">
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username" />
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password" />
        <br />
        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input type="password" id="confirmPassword" name="confirmPassword" />
        <br />
        <label htmlFor="email">E-mail: </label>
        <input type="email" id="email" name="email" />
        <br />
        <button>Login</button>
      </form>
    </>
  );
};

export default SignUp;
