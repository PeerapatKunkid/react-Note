
import './App.css';
import { useState } from "react";
function App() {
  const [startNote, setStartNote] = useState({
    content: "",
    author: ""
  })
  const [note, setNote] = useState(startNote);
  const [editNote, setEditNote] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  function onNoteValueChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      }
    });
    // console.log(note);
  }
  function onEditNoteValueChange(event) {
    const { name, value } = event.target;
    setEditNote((prevEditNote) => {
      return {
        ...prevEditNote,
        [name]: value
      };
    });
  }

  function onNoteSubmit(event) {
    event.preventDefault();
    // console.log(note)
    setAllNotes((prevAllNotes) => {
      const newNote = { ...note };
      newNote.id = Date.now().toString();
      console.log(newNote)
      // console.log(newNote.id)
      return [note, ...prevAllNotes];
    })
    setNote(startNote);
  }

  function onEditNoteSubmit(event) {
    event.preventDefault();
    setAllNotes((prevAllNotes) => {
      return prevAllNotes.map((note) => {
        if (note.id !== editNote.id) return note;
        return editNote;
      });
    });
    setEditNote(null);
  }

  //ลบแบบ return array เป็นตัวใหม่
  function onNoteDelete(noteId) {
    setAllNotes((prevAllNotes) => {
      return prevAllNotes.filter(theNote => theNote.id !== noteId);
    });
  }

  const allNotesElements = allNotes.map((theNote) => {
    return (
      <div key={theNote.id} className="app-note">
        <h3>{theNote.content}</h3>
        <h5>{theNote.author}</h5>
        <p>
          <a onClick={() => { setEditNote(theNote) }}>Edit</a>
          <span> | </span>
          <a onClick={() => { onNoteDelete(theNote.id) }}>Delete</a>
        </p>
      </div>
    );
  });

  let editNoteElement = null;
  if (!!editNote) {
    editNoteElement = (
      <div className='content'>
        <form onSubmit={onEditNoteSubmit}>
          <section>
            <div className="app-container">
              <div >
                <input
                  type="text"
                  placeholder="Content"
                  name="content"
                  value={editNote.content}
                  onChange={onEditNoteValueChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Author"
                  name="author"
                  value={editNote.author}
                  onChange={onEditNoteValueChange}
                />
              </div>
              <p></p>
              <button type="submit">Edit</button>
            </div>
          </section>
        </form>

      </div>
    );
  }

  return (
    <div className='app'> <div className="grid">
      <div className='content'>
        <div>Write something ?</div>
        <form onSubmit={onNoteSubmit}>
          <section>
            <div className="app-container">
              <div >
                <input
                  type="text"
                  placeholder="Content"
                  name="content"
                  value={note.content}
                  onChange={onNoteValueChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Author"
                  name="author"
                  value={note.author}
                  onChange={onNoteValueChange}
                />
              </div>
              <p></p>
              <button type="submit">Add</button>
            </div>
          </section>
        </form>
        {allNotesElements}
      </div>
      {editNoteElement}
    </div></div>

  );
}

export default App;
