let addBtn = document.getElementById('add-btn')
let addTitle = document.getElementById('note-title')
let addText = document.getElementById('note-text')

addBtn.addEventListener("click", (e) => {
    /* if the title or text box are empty,
    and the user attempts to submit, return an alert. */
    if (addTitle.value == "" || addText.value == ""){
        return alert("Please add a Title & Details before adding.")
    }
    // setting the notes variable to whatever is in localStorage
    let notes = localStorage.getItem("notes");
    // if local storage is empty, set our notes object as an empty array
    if (notes == null){
        notesObj = [];
    } else {
        // else, set our notes object to whatever is in localStorage
        notesObj = JSON.parse(notes);
    }
    // creating an object for a users note
    let myObj = {
        title: addTitle.value,
        text: addText.value
    }
    // pushing the note to the note array
    notesObj.push(myObj);
    // saving the note from the notesObj to local storage
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // set the title and text boxes to empty after we submit
    addTitle.value = "";
    addText.value = "";

    // calling function to show the notes on the page
    showNotes();
})

// creating showNotes function
function showNotes() {
    let notes = localStorage.getItem("notes");
        // if local storage is empty, set our notes object as an empty array
        if (notes == null){
            notesObj = [];
        } else {
            // else, set our notes object to whatever is in localStorage
            notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function(element, index) {
        // for each note added, this is what will be shown.
        // notice the ${} variables. This is setting each notes number, title, and text.
        /* for the edit and delete buttons, we gave them each an id of the index they 
        are at. We also made is so when each button is clicked, the edit or delete
        function is called, which targets the note that the button is located in. this is
        achieved using the 'this' function. */
        // the variable HTML is assigned to this block of text, which is the form our notes will take
        html += `
        <div id="note" class="notes">
        <p class="note-counter">Note ${index + 1}</p>
        <h3 class="note-title">${element.title}</h3>
        <p class="note-text">${element.text}</p>
        <button id="${index}" onclick="deleteNote(this.id)" class="note-btn">Delete</button>
        <button id="${index}" onclick="editNote(this.id)" class="note-btn edit-btn">Edit</button>
    </div>
        `;
    });

    let noteElement = document.getElementById('notes');
    // if there are objects in localStorage, display them using the form used in the HTML
    // variable above.

    // else, display the message.
    if (notesObj.length != 0) {
        noteElement.innerHTML = html;
    } else {
        noteElement.innerHTML = "No notes yet! Add a note using the form above."
    }
    
}

// function to delete notes
// we pass index as a paramater
// because the delete button will call the index of the note it's located at
function deleteNote(index) {
    // send a message to the user to confirm the delete
    let confirmDel = confirm("Are you sure you want to delete this note?")

    // if the delete is confirmed
    if (confirmDel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}

// function to edit notes
function editNote(index) {
    let notes = localStorage.getItem('notes');
    // make sure the form is clear before editing
    if (addTitle.value !== "" || addText.value !== "") {
        return alert("Please clear the form before editing a note!");
    }
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    // console.log(notesObj);
    // get the note you chose to edit and put its text into the form
    notesObj.findIndex((element, index) => {
        addTitle.value = element.title;
        addText.value = element.text;
    })
    // remove the chosen note from the list, so a note is not duplicated
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

showNotes();