import React, { useState } from "react";
import { ModalBackground, ModelContainer } from "./style";
import { toast } from 'react-toastify';

function BrandModal ({ setBrand }) {
  const Auth = localStorage.getItem('userAuth')
  const [brandData, setBrandData] = useState({
    name:'', 
  }) 
   
    async function createBrand () { 
    await fetch(`https://my-pharma-backend.herokuapp.com/brand/create`, {
        method: 'POST',
        headers: {
          Authorization: Auth,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(brandData)
      })
      .then((response) => response.json())
      .then((data) =>{ 
        if(data.message === 'Brand created success') {
          toast.success(data.message)
          setBrand(false)
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
    setBrandData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  return (
    <ModalBackground>
      <ModelContainer>
        <div className="titleCloseBtn">
          <button
            onClick={() => {setBrand(false)}}>
            X
          </button>
        </div>
        <div className="font-bold text-lg title">
          <h1>Cadastro de Marca</h1>
        </div>
        <div className="body mt-3">
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-left text-sm font-bold mb-2" for="grid-first-name">
               Nome da marca
              </label>
              <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              id="grid-first-name" 
              placeholder="Dipirona 100mg" 
              value={brandData.name}
              type="text"
              onChange={handleChange}
              name="name"/>
              <p className="text-red-500 text-xs italic">Por favor preencha esse campo.</p>
            </div>
            
          </div>
        </form>

        </div>
        <div className="footer">
          <button
            type="button"
            onClick={() => {
              setBrand(false);
            }}
            id="cancelBtn"
          >
            Cancelar
          </button>
          <button
          type="button"
          onClick={() => createBrand()}
          >Salvar</button>
        </div>
      </ModelContainer>
  </ModalBackground>  );
}

export default BrandModal ;
