import React, { useEffect, useState } from 'react'
import app from "./Firebase"
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore'

const db = getFirestore(app)

const App = () => {

  const valorInicial = { Categoria:"", Id: "", Nombre:"", Descripcion:"", Imagen:"", Link:"", Precio:null, PrecioD:null, Stock:null }

  const [user, setUser] = useState(valorInicial)
  const [lista, setLista] = useState([])
  const [subId, setSubId] = useState('')

  const capturarInputs = (e)=>{
      const {name, value} = e.target
      setUser({...user, [name]: value})
  }

  const guardarInfo = async(e)=>{
    e.preventDefault()
    if(subId === ''){
      try {
        await addDoc(collection(db,"Listado Productos"),{
          ...user
        })
      } catch (error) {
          console.log(error);
      }
    }
    else{
      await setDoc(doc(db, "Listado Productos", subId),{
        ...user
      })
    }
    setUser({...valorInicial})
    setSubId('')
  }

  useEffect(()=>{
    const getLista = async()=>{
      try {
        const querySnapshot = await getDocs(collection(db,"Listado Productos"))
        const docs = []
        querySnapshot.forEach((doc)=>{
          docs.push({...doc.data(), id: doc.id})
        })
        setLista(docs)
      } catch (error) {
        console.log(error);
      }
    }
    getLista();
  },[lista])

  const deleteUsuario = async(id)=>{
    await deleteDoc(doc(db, "Listado Productos", id))
  }

  const getOne = async(id) =>{
    try {
      const docRef = doc(db, "Listado Productos", id)
      const docSnap = await getDoc(docRef)
      setUser(docSnap.data())
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(subId !== ''){
      getOne(subId)
    }
  },[subId])
  return (
  <div className="row container">
      <div className="col-md-12">
        <h2 className='text-center'>Crear/Actualizar Producto</h2>
        <form onSubmit={guardarInfo}>
          <div className="card card-body">
            {/* 1 input */}
            <div className="form-group">
              <input type="text" name="Categoria" className="form-control mb-3" placeholder="Ingresar Categoria" onChange={capturarInputs} value={user.Categoria}/>
            </div>
            {/* 2 input */}
            <div className="form-group">
              <input type="text" name="Id" className="form-control mb-3" placeholder="Ingresar el Id" onChange={capturarInputs} value={user.Id}/>
            </div>
            {/* 3 input */}
            <div className="form-group">
              <input type="text" name="Nombre" className="form-control mb-3" placeholder="Ingresar el Nombre" onChange={capturarInputs} value={user.Nombre}/>
            </div>
            {/* 4 input */}
            <div className="form-group">
              <input type="text" name="Descripcion" className="form-control mb-3" placeholder="Ingresar la Descripcion" onChange={capturarInputs} value={user.Descripcion} />
            </div>
            {/* 5 input */}
            <div className="form-group">
              <input type="text" name="Link" className="form-control mb-3" placeholder="Ingresar Link" onChange={capturarInputs} value={user.Link}/>
            </div>
            {/* 6 input */}
            <div className="form-group">
              <input type="text" name="Imagen" className="form-control mb-3" placeholder="Ingresar la Imagen" onChange={capturarInputs} value={user.Imagen}/>
            </div>
            {/* 7 input */}
            <div className="form-group">
              <input type="number" name="Precio" className="form-control mb-3" placeholder="Ingresar el Precio" onChange={capturarInputs} value={user.Precio}/>
            </div>
            {/* 8 input */}
            <div className="form-group">
              <input type="number" name="PrecioD" className="form-control mb-3" placeholder="Ingresar el PrecioD" onChange={capturarInputs} value={user.PrecioD}/>
            </div>
            {/* 9 input */}
            <div className="form-group">
              <input type="number" name="Stock" className="form-control mb-3" placeholder="Ingresar el Stock" onChange={capturarInputs} value={user.Stock}/>
            </div>
            <button className='btn btn-primary'>{subId === '' ? 'Guardar' : 'Actualizar'}</button>
          </div>
        </form>
      </div>
      <div className="col-md-8">
        <h2 className='text-center'>Lista de Productos</h2>
        <table class="table table-2">
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Id</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>PrecioD</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {lista.map(list => (
              <tr key={list.id}>
                <td>{list.Categoria}</td>
                <td>{list.Id}</td>
                <td>{list.Nombre}</td>
                <td>{list.Descripcion}</td>
                <td>{list.Precio}</td>
                <td>{list.PrecioD}</td>
                <td>{list.Stock}</td>
                <td>{list.Imagen}</td>
                <td>{list.Link}</td>
                <td>
                  <button className='btn btn-danger' onClick={()=>deleteUsuario(list.id)}>Eliminar</button>
                  <button className='btn btn-success m-1'onClick={()=>setSubId(list.id)} >Actualizar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App