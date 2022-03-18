import styled from 'styled-components';

export const Container = styled.div`
  width: 100% ;
  display: flex; 
  justify-content: center;

 img {
  position: absolute;
  top: 2%; left: 2%;   
  width: max-content;
 }
`
export const ContainerLabels = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 3rem;
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
  background-color: #9AB6B6;

  label {
    margin-bottom:1rem;
    span {
      margin-right: 1rem;
    }
    input{
      border-radius: 2rem;
      width: 300px;
      height: 20px;
    }
  }
  button { 
    border-radius: 2rem;
    background-color:#64c4ed ;
    width: 120px;
    height: 35px;
    font-weight: bolder;
    font-size: medium;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    
  }

`