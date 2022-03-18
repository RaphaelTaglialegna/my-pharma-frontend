import styled from 'styled-components';
import tw from 'twin.macro';

export const Container = styled.div`
  width: 90% ;
 
 img {
  position: absolute;
  top: 2%; left: 2%;   
  width: max-content;
 }
 .logout { 
    border-radius: 2rem;
    background-color:#64c4ed ;
    width: 150px;
    height: 50px;
    font-weight: bolder;
    font-size: large;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    position: absolute;
    top: 2%; left: 80%;
  } 
  `
export const ContainerTable = styled.div`
  margin-top: 10%;
  display:flex ;
  flex-direction: column;
  align-items: center;
  table{
  min-width: 700px;
  max-width: fit-content;
}
  
  .openModalBtn { 
    border-radius: 2rem;
    background-color:#64c4ed ;
    width: 180px;
    height: 35px;
    margin-bottom: 2rem;
    font-weight: bolder;
    font-size: medium;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
`

export const TableColumn = styled.th`
  ${tw`
  py-3 
  px-6 
  text-xs 
  font-medium 
  tracking-wider 
  text-left 
  text-gray-700 uppercase 
  dark:text-gray-400
`}

`
export const TableLine = styled.th`
  ${tw`
  py-4 
  px-6 
  text-sm 
  font-medium 
  text-gray-900 
  whitespace-nowrap 
  dark:text-white
`}

`