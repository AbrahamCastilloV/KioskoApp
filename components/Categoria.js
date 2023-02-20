import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";

export default function Categoria({categoria}) {
    const {handleClickCategorias, categoriaActual} = useQuiosco();

    const {nombre,icono,id} = categoria;
  return (
    <div className={`${categoriaActual?.id === id ? 'bg-amber-200' : ''} flex items-center gap-4 w-full border p-5 hover:bg-amber-200`}>
        <Image alt="Imagen Icono" width={70} height={70} src={`/assets/img/icono_${icono}.svg`}/>
        <button onClick={() => handleClickCategorias(id)} type="button" className="text-2xl font-bold hover:cursor-pointer">{nombre}</button>
    </div>
  )
}
