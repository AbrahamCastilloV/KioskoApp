import useQuiosco from "@/hooks/useQuiosco"
import Image from "next/image";
import { formatearDinero } from "@/helpers";
import { useState, useEffect } from "react";

export default function ModalProducto() {
  /* States */
  const [ cantidad, setCantidad ] = useState(1);
  const [ edicion, setEdicion ] = useState(false)
  /* DB */
  const { producto, handleChangeModal, handleAgregarPedido, pedido } = useQuiosco();
  const {nombre,imagen, precio}= producto;
    
  /* Effects */
  useEffect(() => {
    //Comprobar si el Modal Actual está en el pedido
    if(pedido.some(pedidoState => pedidoState.id === producto.id)){
      const productoEdicion = pedido.find(pedidoState => pedidoState.id === producto.id)
      setEdicion(true);
      setCantidad(productoEdicion.cantidad)
    }

  }, [producto,pedido])
  



  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <Image src={`/assets/img/${imagen}.jpg`} width={300} height={400} alt={`Imagen del producto ${imagen}`}/>
      </div>
      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button onClick={handleChangeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <h1 className="text-3xl font-bold mt-5">{nombre}</h1>
        <p className="mt-5 font-black text-5xl text-amber-500">{formatearDinero(precio)}</p>

        <div className="flex mt-5 gap-4">
          <button type="button" onClick={() => {
            if(cantidad <= 1) return;
            setCantidad(cantidad - 1)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-amber-500 font-bold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <p className="text-3xl">{cantidad}</p>

          <button type="button" onClick={() => setCantidad(cantidad + 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-amber-500 font-bold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <button onClick={() => handleAgregarPedido({...producto,cantidad })} type="button" className="bg-indigo-500 hover:bg-indigo-700 mt-5 px-5 py-2 font-bold uppercase rounded text-white">
          {edicion ? 'Guardar Cambios' :'Añadir al Pedido'}
        </button>
      </div>
    </div>
  )
}
