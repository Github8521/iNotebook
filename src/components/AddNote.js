import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import NoteContex from '../context/notes/NoteContex'


const AddNote = (props) => {
    const context=useContext(NoteContex)
    const{addNote}=context

    const[note,setNote]= useState({title:'',description:'',tag:''})


    const handlechange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
        // iska matlab jo v change ho raha hai uska name uski value k barabar ho jaye
    }
    const handleclick=(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        setNote({title:'',description:'',tag:''})
    props.showAlert('added successfully','success')

    }
  return (
    <div className="container my-3">
      <h1>Add a notes</h1>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={handlechange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={handlechange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name='tag'  value={note.tag} onChange={handlechange}/>
  </div>
 
  <button disabled={note.title.length<4 || note.description.length<5} type="submit" onClick={handleclick} className="btn btn-primary">Add Note</button>
</form>
     </div>
  )
}

export default AddNote
