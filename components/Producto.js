import Image from "next/image"
import { formatearDinero } from "@/helpers";
import useQuiosco from "@/hooks/useQuiosco";

export default function Producto({producto}) {
  const {handleSetProducto, handleChangeModal} = useQuiosco();

  const {id,nombre,precio,imagen} = producto;
  return (
    <div className="border p-3">
      <Image src={`/assets/img/${imagen}.jpg`} width={400} height={500} alt={`Imagen de ${nombre}`}/>
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>
        <button className="bg-indigo-600 hover:bg-indigo-700 w-full mt-5 p-3 uppercase text-white font-bold" type="button" onClick={()=> {
          handleSetProducto(producto),
          handleChangeModal()
          }}>Agregar</button>
      </div>
    </div>
  )
}
