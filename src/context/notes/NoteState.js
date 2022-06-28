import { useState } from "react";
import NoteContex from "./NoteContex";
const NoteState = (props) => {
  const host = 'http://localhost:4000'
  const initialnotes = []
  const [notes, setNotes] = useState(initialnotes)

  //  add note
  const addNote =async (title, description, tag) => {
    // api call 
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')

      },

      body: JSON.stringify({title,description,tag})
    });
    const note= await response.json();
    setNotes(notes.concat(note))
  }
  //  get all note
  const getNotes =async () => {
    // api call 
    const response = await fetch(`${host}/api/notes/fechallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      }
    });
    const json=await response.json()
    console.log(json);
    setNotes(json)
 
  }


  //  delete note

  const deleteNote =async (id) => {
    // api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')

      },

    });
    const json=response.json()
    console.log(json);

    console.log('deleting the note with id' + id);
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }


  //  edit note
  const editNote = async(id, title, description, tag) => {
    // Api call (google-fech with headers)

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')

      },

      body: JSON.stringify({title,description,tag})
    });
    const json= await response.json();
    console.log(json);


let newNotes=JSON.parse(JSON.stringify(notes))
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
 
    if (element._id === id) {
      newNotes[index].title = title
      newNotes[index].description = description
      newNotes[index].tag = tag
      break
    }

  }
  setNotes(newNotes)

}



return (
  <NoteContex.Provider value={{ notes, setNotes, addNote, deleteNote, editNote,getNotes }}>

    {props.children}
  </NoteContex.Provider>
)
}

export default NoteState