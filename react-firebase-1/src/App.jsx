import {Routes, Route} from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from './context/UserProvider';

//Carpeta routes
import Login from './routes/Login';
import Home from './routes/Home';
import Perfil from './routes/Perfil';
import NotFound from './routes/NotFound';
//Componentes
import Navbar from './components/Navbar';
import Register from './routes/Register';
import LayoutContainer from './components/Layout/LayoutContainer';
import RequireAuth from './components/Layout/RequireAuth';






const App = () => {

//El con context es importante para llamar elementos de un componete y utilizarlos
  const {user} = useContext(UserContext)
//como el usuario inicializa con el estado false
//Nota importantisimo este if por que nos permite proteger el navbar mientras se hacen los llamados de la base de datos
  if(user === false){
    return <p>Loading...</p>
  }

  return (
    <>
      <Navbar />

      <Routes>
      
        <Route path="/" element={<RequireAuth />}>
          <Route index element={<Home/>}/>
          <Route path='perfil' element={<Perfil/>}/>
        </Route>

        <Route path='/' element={<LayoutContainer />}>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/register' element={<Register />} ></Route>
        </Route>

          <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
};

export default App

/*
Actividades de la app:

React router dom 6

#Paso 1: 

  importar el Routes en los fragmes 

  NOTA: 
    la etiqueta ROUTES solo debe envolver las rutas que vamos a crear.
    si agregas un h1 o una etiqueta cualquiera va arrojar error por que solo debe envolver la rutas
  
#Paso 2:

  importar las rutas(route)  con sus atributos para enlazar las rutas Home Y Login.
  
  path(es la ruta que vamos a enlazar) este atributo se manifiesta en la url (localhost:3000/[path])

  element(la importacion del jsx que vamos a llamar)

#Pase 3:

creamos la carpeta components y creamos un jsx del navbar.

Porque no se creo el navbar en la carpeta routes? 
R= por que el navbar es un componente que se va rederizar en todas las routes y por ende va estar en todos los llamados.

#Pase 4:

  importamos el navbar

#paso 5:

Context

vamos a utilizar el context, vamos a crear una carpeta con ese nombre y creamos un UserProvider.jsx

#paso 6:

RUTAS PROTEGIDAS

el RequireAuth lo exportamos y lo que va envolver son todos los accesos que estaran protegido donde solo el usuario tiene acceso

#Paso 7:

agregamos una nueva ruta que se llama register 



*/
