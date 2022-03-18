import React,  { useState } from 'react';
import { Container, ContainerLabels } from './style';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function CreateUser () {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username:'',
    email:'',
    password:'',
    confirmpassaword:'',
  })
    
  async function createUser (userData) { 
    await fetch(`https://my-pharma-backend.herokuapp.com/user/auth/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })
      .then((response) => response.json())
      .then((data) =>{ 
        if(data.message === 'User created success') {
          toast.success(data.message)
          navigate('/login')
        }else { 
          toast.warning(data.message)
        }
      }) 
      .catch((err) => toast.error(err.message, {
        icon: false
      }));
  
    }

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  return (
    <Container>
      <img src="https://www.mypharma.com.br/wp-content/uploads/2021/05/logo-mypharma-original.png" alt="MyPharma Logo" />
      <ContainerLabels>
        <label>
          <span>Nome:</span>
          <input 
            value={userData.username}
            type="text"
            onChange={handleChange}
            name="username"
          />
        </label>
        <label>
          <span>Email:</span>
          <input 
            value={userData.email}
            type="text"
            onChange={handleChange}
            name="email"
          />
        </label>    

        <label>
          <span>Password:</span>
          <input 
            value={userData.password}
            type="password"
            onChange={handleChange}
            name="password" 
          />
        </label>
        <label>
          <span>Confirm Password:</span>
          <input 
            value={userData.confirmpassword}
            type="password"
            onChange={handleChange}
            name="confirmpassword" 
          />
        </label>    
    
      <button type='button' onClick={async () => {
        await createUser(userData);
      }}
      >
        Create
      </button>    
      </ContainerLabels>
    </Container>
  );
}

export default CreateUser;