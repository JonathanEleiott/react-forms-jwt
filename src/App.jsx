import { useEffect, useState } from "react";
import LoginForm from './LoginForm.jsx';

const App = () => {
  const [users, setUsers] = useState([]);

  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [roleInput, setRoleInput] = useState('');
  const [avatarInput, setAvatarInput] = useState('');

  const [token, setToken] = useState('');

  useEffect(() => {
    const getUsers = async() => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/users');
        const retrievedUsers = await response.json();
        setUsers(retrievedUsers);
      } catch(err) {
        console.log(err);
      }
    }

    getUsers();
  }, []);
  
  const createUser = async(event) => {
    event.preventDefault();
    // console.log(`EMAIL:`, emailInput);
    // console.log(`NAME:`, nameInput);
    // console.log(`PASSWORD:`, passwordInput);
    // console.log(`ROLE:`, roleInput);
    // console.log(`AVATAR:`, avatarInput);

    // https://media.istockphoto.com/id/486869012/photo/goat-looks-at-us.jpg?s=612x612&w=0&k=20&c=yeu3XUkLR2-mO2zwDGNaVL5o0DITA-deNXSKNaCX6bA=

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          email: emailInput,
          name: nameInput,
          password: passwordInput,
          role: roleInput,
          avatar: avatarInput
        })
      });

      const newUser = await response.json();
      console.log(newUser);

      if(!newUser.error) {
        const newUsersArray = [...users, newUser];

        setUsers(newUsersArray);
  
        setEmailInput('');
        setNameInput('');
        setPasswordInput('');
        setRoleInput('');
        setAvatarInput('');
      }
    } catch(err) {
      console.log(err);
    }
  }
  
  const getProfile = async() => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${token}`
        }
      });
      const x = await response.json();
      console.log(x);
    } catch(err) {
      console.log(err)
    }
  }
  
  return (
    <>
      <h1>Actors</h1>

      <LoginForm setToken={setToken} />

      <button onClick={getProfile}>Find Me</button>

      <h2>Create a New User</h2>

      <form onSubmit={createUser}>
        <input 
          type="email"
          placeholder="email"
          value={emailInput}
          onChange={(event) => setEmailInput(event.target.value)}
        />

        <input 
          placeholder="name"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
        />

        <input 
          placeholder="password"
          value={passwordInput}
          onChange={(event) => setPasswordInput(event.target.value)}
        />

        <input 
          placeholder="role"
          value={roleInput}
          onChange={(event) => setRoleInput(event.target.value)}
        />

        <input 
          placeholder="avatar"
          value={avatarInput}
          onChange={(event) => setAvatarInput(event.target.value)}
        />

        <button>Create User!</button>
      </form>

      <ul>
        {
          users.map((singleUser) => {
            return <li key={singleUser.id}>{singleUser.name} - {singleUser.email} - {singleUser.password}</li>
          })
        }
      </ul>

    </>
  )
}

export default App
