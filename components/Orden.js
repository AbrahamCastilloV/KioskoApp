import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

import { formatearDinero } from "@/helpers";

export default function Orden({orden}) {
    const {id, nombre, fecha, total, pedido} = orden;
    const completarOrden = async () => {
        try {
            await axios.post(`/api/ordenes/${id}`)
            toast.success('Orden Lista')
        } catch (error) {
            toast.error('Hubo un error')
        }
    }
  return (
    <div className="border p-10 space-y-5 ">
        <h3 className="text-2xl font-bold ">Orden: {id}</h3>
        <p className="text-lg font-bold">Cliente: {nombre}</p>
        <div className="">
            {pedido.map(platillo => (
                <div key={platillo.id} className="py-10 flex border-b last-of-type:border-o items-center">
                    <div className="w-32">
                        <Image width={400} height={500} src={`/assets/img/${platillo.imagen}.jpg`}alt={`Imagen del platillo ${platillo.nombre}`}/>
                    </div>
                    <div className="p-5 space-y-2">
                        <h4 className="text-xl font-bold text-amber-500">{platillo.nombre}</h4>
                        <p className="text-lg font-bold">Cantidad: {platillo.cantidad}</p>
                    </div>
                </div>
            ))}
            <div className="md:flex md:items-center md:justify-between my-10">
                <p className="mt-5 font-black text-4xl text-amber-500">Total a pagar: {formatearDinero(total)}</p>
                <button className="bg-indigo-500 hover:bg-indigo-700 mt-5 md:mt-0 text-white p-3 font-bold uppercase px-10 rounded-lg" type="button" onClick={completarOrden}>Completar Orden</button>
            </div>
        </div>
    </div>
  )
}
