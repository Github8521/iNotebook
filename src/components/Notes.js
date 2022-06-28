import React from 'react'
import NoteContex from '../context/notes/NoteContex'
import { useContext,useRef } from 'react'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useEffect,useState } from 'react'
import {  useNavigate } from 'react-router-dom'




const Notes = (props) => {
  let navigate=useNavigate()

    const context=useContext(NoteContex)
    const{notes,getNotes,editNote}=context
    useEffect(()=>{
      if(localStorage.getItem('token')){

        getNotes()
      }
      else{
        navigate("/login")

      }
      // eslint-disable-next-line
    },[])


  const[note,setNote]= useState({id:'', etitle:'',edescription:'',etag:''})

    const ref=useRef(null)
    const refClose=useRef(null)


    const updateNote=(currentNote)=>{
    ref.current.click()
    setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }


    const handlechange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
      // iska matlab jo v change ho raha hai uska name uski value k barabar ho jaye
  }

  const handleclick=(e)=>{
    // e.preventDefault()
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click()

    console.log('updating note...',note);
    props.showAlert('updated successfully','success')

}
 

  return (
    <>
    <AddNote showAlert={props.showAlert}/>
    
<button type="button" className="btn btn-primary d-none"  ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">



      <form>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" value={note.etitle} name='etitle' aria-describedby="emailHelp" onChange={handlechange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={handlechange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={handlechange}/>
  </div>
 
</form>




      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<4 || note.edescription.length<5} type="button" onClick={handleclick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>

    <div className="row my-3">
    <h2>Your notes</h2>
    <div className="container">
    {notes.length===0&&'nothing in notes'}
    </div>
    {notes.map((note)=>{
     return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote}  note={note}/>
    })}
    </div>
    </>
  )
}

export default Notes
