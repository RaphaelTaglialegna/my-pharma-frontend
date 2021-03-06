import styled from 'styled-components';


export const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(200,200,200,.8);
  position: absolute;
  top: 0%;
  left: 0%;
  display: flex;
  justify-content: center;
  align-items: center; 
`

export const ModelContainer = styled.div`
  width: 800px;
  height: 600px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;

.title {
  display: inline-block;
  text-align: center;
  margin-top: 10px;
}
.footer button {
  width: 150px;
  height: 45px;
  margin: 10px;
  border: none;
  background-color: cornflowerblue;
  color: white;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
}
.titleCloseBtn {
  display: flex;
  justify-content: flex-end;
}

.titleCloseBtn button {
  background-color: transparent;
  border: none;
  font-size: 25px;
  cursor: pointer;
}

.body {
  flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
  text-align: center;
}

.footer {
  flex: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
 

#cancelBtn {
  background-color: crimson;
}
`


