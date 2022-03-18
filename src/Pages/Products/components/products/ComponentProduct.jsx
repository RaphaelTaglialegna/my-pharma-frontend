import React, { useState, useEffect } from "react";
import { ModalBackground, ModelContainer } from "./style";
import { toast } from 'react-toastify';
import { FcAddDatabase } from "react-icons/fc"
import CategoryModal from "../category/ComponentCategory";
import BrandModal from "../brands/ComponentBrand";

function ProductModal({ setOpenModal }) {
  const Auth = localStorage.getItem('userAuth')
  const [category, setCategory] = useState([])
  const [brands, setBrands] = useState([])
  const [categoryModal, setCategoryModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);

  const [productData, setProductData] = useState({
    name:'',
    description:'',
    price:'',
    inventory:'',
    category: '',
    brand: '',
  })

  useEffect(() => { 
    const fetchCategory = async () => { 
      await fetch(`https://my-pharma-backend.herokuapp.com/category/all`, {
          method: 'GET',
          headers: {
            Authorization: Auth,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((response) => response.json())
        .then((data) =>{
          if(data.message === 'Access denied'|| data.message === 'Invalid token') {
            toast.warning(data.message)
          }else { 
            setCategory(data)
          }
        }) 
        .catch((err) => toast.error(err.message, {
          icon: false
        }));
    }
    const fetchBrand = async () => { 
      await fetch(`https://my-pharma-backend.herokuapp.com/brand/all`, {
          method: 'GET',
          headers: {
            Authorization: Auth,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((response) => response.json())
        .then((data) =>{
          if(data.message === 'Access denied'|| data.message === 'Invalid token') {
            toast.warning(data.message)
          }else { 
            setBrands(data)
          }
        }) 
        .catch((err) => toast.error(err.message, {
          icon: false
        }));
    }
    fetchCategory();
    fetchBrand();
  },[brandModal, categoryModal])

    async function createProduct () { 
    await fetch(`https://my-pharma-backend.herokuapp.com/product/create`, {
        method: 'POST',
        headers: {
          Authorization: Auth,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      })
      .then((response) => response.json())
      .then((data) =>{ 
        if(data.message === 'Product created success') {
          toast.success(data.message)
          setOpenModal(false)
        }else {
          console.log(data.message) 
          toast.warning(data.message)
        }
      }) 
      .catch((err) => toast.error(err.message, {
        icon: false
      }));  
    }

  const handleChange = e => {
    const { name, value } = e.target;
    setProductData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };
  return (
    <ModalBackground>
      <ModelContainer>
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="font-bold text-lg title">
          <h1>Cadastro De Produto</h1>
        </div>
        <div className="body mt-3">
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-left text-sm font-bold mb-2" htmlFor="grid-first-name">
               Nome do Produto
              </label>
              <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              id="grid-first-name" 
              placeholder="Dipirona 100mg" 
              value={productData.name}
              type="text"
              onChange={handleChange}
              name="name"/>
              <p className="text-red-500 text-xs italic">Por favor preencha esse campo.</p>
            </div>
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-left text-sm mt-3 font-bold mb-2" htmlFor="grid-first-description">
               Descrição do Produto
              </label>
              <input 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              id="grid-first-description" 
              placeholder="Medicamento indicado para dores" 
              value={productData.userdescription}
              type="text"
              onChange={handleChange}
              name="description"/>
              <p className="text-red-500 text-xs italic">Por favor preencha esse campo.</p>
            </div>
            
          </div>
          
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-price">
                Preço
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-price" 
              value={productData.price}
              type="text"
              onChange={handleChange}
              name="price"
              placeholder="5.0" />
            </div>
            
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-inventory">
                inventory
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
              id="grid-inventory" 
              type="text" 
              value={productData.inventory}
              onChange={handleChange}
              name="inventory"
              placeholder="1 CX" 
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor="grid-brand">
                Marca
              </label>
              <div className="relative">
                <div className="flex">
                        
                  <button
                    className="text-4xl mx-2"
                    type="button"
                    onClick={() => {setBrandModal(true)}}
                  >
                    <FcAddDatabase/>
                  </button>
                  {brandModal && <BrandModal setBrand={setBrandModal} />}
                <select className="block appearance-none text-lg w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="grid-brand"
                value={productData.brand}
                onChange={handleChange}
                name="brand">
                  <option>Selecione</option>
                 {brands.map((b) =>{ 
                   return(
                     <option key={b._id} value={b._id}>{b.name}</option>
                     )
                    })}
                </select>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" htmlFor="grid-category">
                Categoria
              </label>
              <div className="relative">
                <div className="flex">      
                    <button
                      className="text-4xl mx-2"
                      type="button"
                      onClick={() => {setCategoryModal(true)}}
                    >
                      <FcAddDatabase/>
                    </button>
                      {categoryModal && <CategoryModal setOpenModal={setCategoryModal} 
                    />}
                    <select className="block appearance-none text-lg w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="grid-category"
                    value={productData.category}
                    onChange={handleChange}
                    name="category">
                      <option>Selecione</option>
                      {category.map((c) => {
                        return (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      )})}
                    </select>
                  </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
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
          onClick={() => createProduct()}
          >Salvar</button>
        </div>
      </ModelContainer>
  </ModalBackground>  );
}

export default ProductModal;

