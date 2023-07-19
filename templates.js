import { html, render } from './node_modules/lit-html/lit-html.js';
import { deleteNoteHandler } from './script.js';

const noteTemplate = (id, title, content, backgroundColor) => html`
<div id="${id}" class="note__container" style="background-color:#${backgroundColor};">
    <div class="note__container__icons">
        <button @click="${() => deleteNoteHandler(id)}">Delete</button>
        <button>Edit</button>
        <button @click="${() => pinNote(id)}">Pin</button>
    </div>
    <div class="note__container__body">
        <p class="note__title">${title}</p>
        <p class="note__content">${content}</p>
    </div>
</div>
`;

const userProfileTemplate = (name, email, notesNb) => html `
    <div class="container">
        <span>Name: ${name}</span>
        <span>Email: ${email}</span>
        <span>Created notes: ${notesNb}</span>
        <button>Logout</button>
    </div>
`;

export { noteTemplate, userProfileTemplate };

