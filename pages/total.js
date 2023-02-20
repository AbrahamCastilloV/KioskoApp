import { useEffect, useCallback } from "react";

import Layout from "@/layout/Layout";
import useQuiosco from "@/hooks/useQuiosco";
import { formatearDinero } from "@/helpers";


export default function Total() {
  const {pedido,nombre, setNombre, colocarOrden,total} = useQuiosco();
  /* Funciones */

  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre==='' || nombre.length < 3;
  },[pedido, nombre])
  /* Effects */
  useEffect(() => {

    comprobarPedido();
  
  }, [pedido,comprobarPedido])
  return (
    <Layout pagina='Total y Confirmar Pedido'>
        <h1 className="text-4xl font-black ">Total y Confirmar Pedido</h1>
        <p className="text-2xl my-10">Confirma tu Pedido a Continuación</p>
        <form onSubmit={colocarOrden}>
          <div>
            <label htmlFor="nombre" className="block uppercase text-slate-700 font-bold text-xl">Nombre</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)} id='nombre' type="text" className="bg-gray-200 w-full mt-3 lg:w-1/3 p-2 rounded-md" />
          </div>
          <div className="mt-10">
            <p className="text-2xl">Total a pagar {''} <span className="font-bold">{formatearDinero(total)}</span></p>
          </div>
          <div className="mt-5">
            <input disabled={comprobarPedido()} type='submit' value='Confimar Pedido' className={`${comprobarPedido() ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-800 cursor-pointer'} w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white  text-center`}/>
          </div>
        </form>
    </Layout>
  )
}
