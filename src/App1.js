// subir muchos productos

import app from "./Firebase"
import {getFirestore, collection, addDoc} from 'firebase/firestore'

const db = getFirestore(app)
// {Categoria: "    ", Id: "    ", Nombre: "    ", Precio: "    ", PrecioD: null, Descripcion: "    ", Link: "    ", Imagen: "    ", Stock: null,},
const App1 = () => {
    const handleSubmit = (e) => {

        e.preventDefault()

        const Productos = 
        [
           
        ]
        
        const collectionref = collection(db, 'Listado Productos')
        Productos.forEach((Item)=>{
            addDoc(collectionref, Item)
            .then((doc) => {
                console.log(doc.id);
            })
        })

    }
    

    return (
      <button type='submit' onClick={handleSubmit}>Subir</button>
    )
}

export default App1





// actualizar 10 productos

// import app from "./Firebase"
// import {getFirestore, collection, writeBatch, query, where, getDocs, documentId} from 'firebase/firestore'

// const db = getFirestore(app)

// const App1 = () => {
//     const handleSubmit = async (e) => {

//         e.preventDefault()

//         const Productos = []

//         const batch = writeBatch(db)
//         const collectionref = collection(db, 'Listado Productos')
//         const q = query(collectionref, where(documentId(), "in", Productos))
//         const products = await getDocs(q)
//         products.docs.forEach((doc) => {
//             batch.update(doc.ref, {
//                 Precio: "800"
//             })
//         })
//         batch.commit()
//     }
    

//     return (
//       <button type='submit' onClick={handleSubmit}>Actualizar</button>
//     )
// }

// export default App1