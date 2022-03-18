import React, { useState } from "react";
import { ModalBackground, ModelContainer } from "./style";
import { toast } from 'react-toastify';

function CategoryModal({ setOpenModal }) {
  const Auth = localStorage.getItem('userAuth')
  const [categoryData, setUserData] = useState({
    name:'',
    description:'',
   
  }) 
   
    async function createCategory () { 
    await fetch(`https://my-pharma-backend.herokuapp.com/category/create`, {
        method: 'POST',
        headers: {
          Authorization: Auth,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData)
      })
      .then((response) => response.json())
      .then((data) =>{ 
        if(data.message === 'Category created success') {
          toast.success(data.message)
          setOpenModal(false)
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
    <ModalBackground>
      <ModelContainer>
        <div className="titleCloseBtn">
          <button
            onClick={() => {setOpenModal(false)}}>
            X
          </button>
        </div>
        <div className="font-bold text-lg title">
          <h1>Cadastro de Categoria</h1>
        </div>
        <div className="body mt-3">
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-left text-sm font-bold mb-2" for="grid-first-name">
               Nome da categoria
              </label>
              <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              id="grid-first-name" 
              placeholder="Dipirona 100mg" 
              value={categoryData.name}
              type="text"
              onChange={handleChange}
              name="name"/>
              <p className="text-red-500 text-xs italic">Por favor preencha esse campo.</p>
            </div>
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-left text-sm mt-3 font-bold mb-2" for="grid-first-description">
               Descrição da categoria
              </label>
              <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              id="grid-first-description" 
              placeholder="Medicamento indicado para dores" 
              value={categoryData.description}
              type="text"
              onChange={handleChange}
              name="description"/>
              <p className="text-red-500 text-xs italic">Por favor preencha esse campo.</p>
            </div>
          </div>
        </form>

        </div>
        <div className="footer">
          <button
            type="button"
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancelar
          </button>
          <button
          type="button"
          onClick={() => createCategory()}
          >Salvar</button>
        </div>
      </ModelContainer>
  </ModalBackground>  );
}

export default CategoryModal;
