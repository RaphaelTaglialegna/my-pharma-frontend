
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Container } from './style';


function HomePage () {
  const navigate = useNavigate();
  return (
    <Container className='card-group'>
      <img src="https://www.projetodraft.com/wp-content/uploads/2017/05/mypharma.jpg" alt="MyPharma Logo" />
      <button type='buttom' onClick= {() => navigate('/login') }>Login</button>
    </Container>
  );
}

export default HomePage;