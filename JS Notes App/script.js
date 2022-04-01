let title = document.getElementById('noteTitle');
let details = document.getElementById('noteDetails');
let addBtn = document.getElementById('addBtn');
let noteList = document.getElementById('noteDisplay');


addBtn.addEventListener("click", (e) => {

    // Make sure the notes have a value before submitting
    if (title.value == "") {
        return alert("Please make sure there is at least a title");
    }
    // notes = whatever notes we may have in localStorage
    let notes = localStorage.getItem('notes');
    // if local storage is empty
    if(notes == null) {
        // ours notesObj is empty
        notesObj = [];
    } else {
        // else, parse the notes
        notesObj = JSON.parse(notes);
    }
    // create an object for our notes
    // will contain the user input
    let myObj = {
        title: title.value,
        text: details.value
    }
    // push the user input to our notesObj
    notesObj.push(myObj);
    // Push the users note to localstorage
    localStorage.setItem('notes', JSON.stringify(notesObj));
    // clear our title and details
    title.value = "";
    details.value = "";
    // call the showNotes function
    showNotes();

})

showNotes = () => {
    // create the notes variable
    let notes = localStorage.getItem('notes');
    // if the localStorage is empty
    if(notes == null) {
        // our notesObj is empty
        notesObj = [];
    } else {
        // else, copy the localStorage's notes into our Obj
        notesObj = JSON.parse(notes);
    }
    // clear the noteList div
    noteList.innerHTML = ''
    // for each item in the notesObj
    notesObj.forEach(function(element, index) {
        // add the following html to the notesList div
        noteList.innerHTML += `
        <div class="py-3">
            <h5>${element.title}</h5>
            <p>${element.text}</p>
            <button id="${index}" class="btn btn-danger" onclick="deleteNote(this.id)">Delete <i class="fa-solid fa-trash-can"></i></button>
            <button id="${index}" class="btn btn-warning" onclick="editNote(this.id)">Edit <i class="fa-solid fa-pen-to-square"></i></button>
        </div>
        `
    })



}

// using the index of the note as a parameter
function deleteNote(index) {
    // Put out a warning to the user before they delete
    let confirmDel = confirm('Are you sure you want to delete this note?');
    // if the confirm delete returns true
    if(confirmDel) {
        // set up a variable for notes
        let notes = localStorage.getItem('notes');
        // if the local storage is empty
        if (notes == null) {
            // the notes object would return empty
            notesObj = [];
        } else {
            // else, translate the local storage's notes into the notesObj
            notesObj = JSON.parse(notes);
        }
        // as position {index}, remove 1 item (the note)
        notesObj.splice(index, 1);
        // put the notesObj with the removed item back into localStorage
        localStorage.setItem('notes', JSON.stringify(notesObj));
        // call the showNotes function to show the updated notes
        showNotes();
    }
}

function editNote(index) {
    // set up our notes variable to grab the notes that may be stored
    let notes = localStorage.getItem('notes');
    // make sure the current form values are empty
    if (title.value !== "" || details.value !== "") {
        // if they're not, return this alert
        return alert('please clear the form before editing a note!');
    }
    // otherwise, start grabbing the notes from localStorage
    // if localStorage is empty
    if (notes == null) {
        // then our notes Obj is empty
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    // make sure our title/details forms are filled with the value
    // of the specified note
    title.value = notesObj[index].title;
    details.value = notesObj[index].text;
    // now we must remove the note we chose to edit from the list shown
    notesObj.splice(index, 1);
    // update the localStorage
    localStorage.setItem('notes', JSON.stringify(notesObj));
    // call the showNotes function to update the shown list
    showNotes();
}

// shows the stored notes on page load
showNotes();
