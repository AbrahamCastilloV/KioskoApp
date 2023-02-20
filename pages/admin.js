import AdminLayout from "@/layout/AdminLayout"
import Orden from "@/components/Orden"

import useSWR  from "swr"
import axios from "axios"

export default function admin() {
    const fetcher = () => axios('/api/ordenes').then(datos => datos.data)
    const {data, error, isLoading} = useSWR('api/ordenes', fetcher, {refreshInterval:100})

  return (
    <AdminLayout pagina={'Admin'}>
        <h1 className="text-4xl font-black ">Panel de Administración</h1>
        <p className="text-2xl my-10">Administra las Ordenes</p>
        { data && data.length ? data.map(orden => (
            <Orden orden={orden} key={orden.id}/>
        )) : 'No hay ordenes disponibles'}
    </AdminLayout>
  )
}
