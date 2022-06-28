import React from 'react'
import { useContext } from 'react'
import NoteContex from '../context/notes/NoteContex'

const NoteItem = (props) => {
  const {note,updateNote}=props
  const context=useContext(NoteContex)
  const{deleteNote}=context
  return (
    <div  className='col-md-3 my-3'>
       <div className="card" style={{width: "18rem"}}>
  <div className="card-body">
    <div className="d-flex align-items-center">

    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);props.showAlert('deleted successfully','success')}} ></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
    </div>
    <p className="card-text">{note.description}.</p>
   
  </div>
</div>
    </div>
  )
}

export default NoteItem
