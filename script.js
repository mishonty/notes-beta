import { html, render } from './node_modules/lit-html/lit-html.js';
import { noteTemplate, userProfileTemplate } from './templates.js';

const addNoteForm = document.querySelector('#add__note');
const myNotesSection = document.querySelector('.my__notes');
const clearBtn = document.querySelector('#clear');
const searchBox = document.querySelector('#searchbox');
const profileIcon = document.querySelector('#profile');

addNoteForm.addEventListener('submit', addNote);
clearBtn.addEventListener('click', () => {
    addNoteForm.reset();
});

// Adding a note
function addNote(event) {
    event.preventDefault();

    if (!auth.currentUser) {
        alert('Log in first.')
    } else if (!addNoteForm['content']) {
        alert('Type some content.');
    } else {
        const note = {
            date: Date.now(),
            title: addNoteForm['title'].value,
            content: addNoteForm['content'].value,
            backgroundColor: document.querySelector('#background-color option:checked').id
        }

        const userNotesCollection = db.collection('users').doc(auth.currentUser.uid).collection('notes');
        userNotesCollection.add(note);

        addNoteForm.reset();
        console.log('Note created.');
        updateNotes();
    }
}

// Update notes
async function updateNotes() {
    if (!auth.currentUser) {
        render('', myNotesSection);
    } else {
        const request = await db.collection('users').doc(auth.currentUser.uid).collection('notes').get();
        const notes = request.docs
            .sort((noteA, noteB) => noteB.data().date - noteA.data().date)
            .map(data => {
                const id = data.id;
                const note = data.data();

                return noteTemplate(id, note.title, note.content, note.backgroundColor)
            });

        render(notes, myNotesSection);
    }
}

// // Delete note and update notes list
async function deleteNoteHandler(id) {
    await db.collection('users').doc(auth.currentUser.uid).collection('notes').doc(id).delete();

    updateNotes();
}

// // Search
async function searchQuery() {
    const matches = [];
    const search = searchBox
        .value
        .toLowerCase();

    const request = await db.collection('users').doc(auth.currentUser.uid).collection('notes').get();
    const notes = request.docs.forEach(note => {
        note = note.data();
        const title = note.title.toLowerCase();
        const content = note.content.toLowerCase();

        title.includes(search) || content.includes(search) ? matches.unshift(note) : 0;

        const result = matches
            .sort((a, b) => b.date - a.date)
            .map(note => noteTemplate(note.id, note.title, note.content, note.backgroundColor));

        render(result, myNotesSection);
    });
}

export { addNoteForm, deleteNoteHandler, searchBox, searchQuery, updateNotes };