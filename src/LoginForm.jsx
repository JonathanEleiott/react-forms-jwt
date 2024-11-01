import { useState } from "react";

const LoginForm = ({ setToken }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const logInUser = async(event) => {
    event.preventDefault();
    // console.log(`LOGIN EMAIL:`, loginEmail);
    // console.log(`LOGIN PASSWORD:`, loginPassword);

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      });

      const responseJson = await response.json();
      const accessToken = responseJson.access_token; 
      console.log(accessToken);
      setToken(accessToken);

      setLoginEmail('');
      setLoginPassword('');
    } catch(err) {
      console.log(err);
    }
  }
  
  return (
    <>
      <h2>Login a User</h2>

      <form onSubmit={logInUser}>
        <input 
          placeholder="email"
          value={loginEmail}
          onChange={(event) => { setLoginEmail(event.target.value) }}
        />

        <input 
          placeholder="password"
          value={loginPassword}
          onChange={(event) => { setLoginPassword(event.target.value) }}
        />

        <button>Log In</button>
      </form>
    </>
  )
}

export default LoginForm;

