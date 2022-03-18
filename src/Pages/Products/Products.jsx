import React,  { useEffect, useState } from 'react';
import { Container, ContainerTable, TableColumn, TableLine } from './style';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import ProductsModal from './components/products/ComponentProduct.jsx';


function Products () {
  const navigate = useNavigate();
  const [productsDb, setProductsDb] = useState([])
  const Auth = localStorage.getItem('userAuth')
  const [modalOpen, setModalOpen] = useState(false);


 
  useEffect(() => { 
    const fetchProduct = async () => { 
      await fetch(`http://localhost:3000/product/all`, {
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
            navigate('/login')
          }else { 
            setProductsDb(data)
          }
        }) 
        .catch((err) => toast.error(err.message, {
          icon: false
        }));
    }
    fetchProduct();
  },[modalOpen])
    
  async function logoutUser () { 
    await fetch(`http://localhost:3000/user/auth/logout`, {
        method: 'DELETE',
        headers: {
          Authorization: Auth,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((data) =>{ 
          localStorage.setItem('userAuth', '')
          toast.success(data.message)
      }) 
      .catch((err) => toast.error(err.message, {
        icon: false
      }));
  
    }

  return (
    <Container>
      <img src="https://www.mypharma.com.br/wp-content/uploads/2021/05/logo-mypharma-original.png" alt="MyPharma Logo" />
      <button className='logout' type='buttom' onClick= {async () => { 
        await logoutUser();
        navigate('/login')
      }}>
        Logout
      </button> 
  {/* Model  */}

      <ContainerTable>
      <div className="ModalBtnConteiner">
      
      <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Cadastrar Produto
      </button>

      {modalOpen && <ProductsModal setOpenModal={setModalOpen} />}
    </div>
        <table className="bg-gray-50 dark:bg-gray-700">
          <thead>
            <tr>
              <TableColumn>Nome</TableColumn>
              <TableColumn>Decrição</TableColumn>
              <TableColumn>Preço</TableColumn>
              <TableColumn>Estoque</TableColumn>
              <TableColumn>Marca</TableColumn>
              <TableColumn>Categoria</TableColumn>
            </tr>
          </thead>
          <tbody>
            { productsDb.map((p) => {
                return (
                <tr key={p._id}>
                <TableLine>{p.name}</TableLine>
                <TableLine>{p.description}</TableLine>
                <TableLine>R$ {parseFloat(p.price).toFixed(2)}</TableLine>
                <TableLine>{p.inventory} cx</TableLine>
                <TableLine>{p.brand.name}</TableLine>
                <TableLine>{p.category.name}</TableLine>
              </tr>
              )})
            }           
          </tbody>
        </table>
      </ContainerTable>
    </Container>
  );
}

export default Products;