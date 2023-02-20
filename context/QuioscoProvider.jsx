import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { useRouter } from 'next/router';

const QuioscoContext = createContext();

export const QuioscoProvider = ({children}) => {
    /* States */
    const [ categorias, setCategorias ] = useState([]);
    const [ categoriaActual, setCategoriaActual ] = useState({})
    const [ producto, setProducto ] = useState({})
    const [ modal, setModal ] = useState(false)
    const [ pedido, setPedido ] = useState([])
    const [ nombre, setNombre ] = useState('')
    const [ total, setTotal ] = useState(0)
    /* Effects */
    useEffect(() => {
        obtenerCategorias();
    }, []) 

    useEffect(() => {
        setCategoriaActual(categorias[0]);
    }, [categorias]) 

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto)=>(producto.precio * producto.cantidad) + total, 0);
        setTotal(nuevoTotal)
    }, [pedido]) 
    /* Rutas */
    const router = useRouter();
    /* Funciones */
    const obtenerCategorias = async () => {
        const {data} = await axios('/api/categorias')
        setCategorias(data)
    }
    const handleClickCategorias = id => {
        const categoria = categorias.filter(cat => cat.id === id);
        setCategoriaActual(categoria[0]);
        router.push('/')
    }
    const handleSetProducto = producto => {
        setProducto(producto)
    }
    const handleChangeModal = () =>{
        setModal(!modal)
    }
    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        if(pedido.some(productostate => productostate.id === producto.id)){
            //Actualizar
            const pedidoActualizado = pedido.map(productostate=> productostate.id === producto.id ? producto : productostate)
            setPedido(pedidoActualizado);
            toast.success('Guardando Correctamente',{theme: "colored"})
        }else{
            setPedido([...pedido, producto]);
            toast.success('Agregando Pedido',{theme: "colored"})
        }
        setModal(false)
    }
    const handleEditarCantidades = id =>{
        const productoActualizar = pedido.filter(producto => producto.id === id);
        setProducto(productoActualizar[0])
        setModal(!modal);
    }
    const handleEliminarProducto = id =>{
        const pedidoActualizar = pedido.filter(producto => producto.id !== id);
        setPedido(pedidoActualizar)

    }
    const colocarOrden = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()});
            //Resetear app
            setCategoriaActual(categorias[0]);
            setPedido([])
            setNombre('')
            setTotal(0)
            toast.success('Pedido Realizado Correctamente!')
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <QuioscoContext.Provider value={{ categorias, handleClickCategorias, categoriaActual, producto, handleSetProducto,modal, handleChangeModal, handleAgregarPedido, pedido, handleEditarCantidades,handleEliminarProducto,nombre, setNombre, colocarOrden, total }}>
            {children}
        </QuioscoContext.Provider>
    )		
}
export default QuioscoContext;