import { Outlet } from 'react-router-dom'

const PantallaAcceso = () => {
  return (
    <div className="p-6 m-auto max-w-2xl">
      <p className="text-xl text-center pb-6">Con una cuenta de usuario podrás guardar 
      tus tableros de tareas y consultarlos en cualquier dispositivo</p>
      <div className="flex md:flex-row flex-col gap-6">
        <div className="grow shrink">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default PantallaAcceso