import React,  { useEffect, useState } from 'react';
import { Container, ContainerLogin } from './style';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';




function Login () {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email:'',
    password:'',
  })
  const [userAuth, setUserAuth] = useState('');

  useEffect(() => {
    localStorage.setItem('userAuth', userAuth); 
  }, [userAuth]);

  
  async function loginUser (userData) { 
    
    await fetch(`http://localhost:3000/user/auth/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })
      .then((response) => response.json())
      .then((data) =>{ 
        if(data.userId) {
          toast.success(data.message)
          setUserAuth(data.userId)
          navigate('/products')
        }else { 
          toast.warning(data.message)
          setUserAuth('')
        }
      }) 
      .catch((err) => toast.error(err.message, {
        icon: false
      }));
  
    }

  const handleChange = e => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
        ...prevState,
        [name]: value
    }));
};
  return (
    <Container>
      <img src="https://www.mypharma.com.br/wp-content/uploads/2021/05/logo-mypharma-original.png" alt="MyPharma Logo" />

      <ContainerLogin>
      <label>
      <span>Email:</span>
      <input 
        value={loginData.email}
        type="text"
        onChange={handleChange}
        name="email"
      />
      </label>

      <label>
      <span>Password:</span>
      <input 
        value={loginData.password}
        type="password"
        onChange={handleChange}
        name="password" 
      />
      </label>  
    <div>
      <button type='button' onClick={async () => {
        await loginUser(loginData);

      }}
      >
        Login
      </button>
      <Link to='/createuser'>New User?</Link>
    </div>
      </ContainerLogin>

    </Container>
  );
}

export default Login;