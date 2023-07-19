import { html, render } from './node_modules/lit-html/lit-html.js';
import { addNoteForm, searchBox, searchQuery, updateNotes } from './script.js';

const authForm = document.querySelector('.form');
const closeBtn = document.querySelector('.close-btn');
const loginBtn = document.querySelector('.login-btn');
const logoutBtn = document.querySelector('.logout-btn');

closeBtn.addEventListener('click', function () {
    authForm.classList.remove('active');
});
loginBtn.addEventListener('click', function () {
    authForm.classList.add('active');
});
logoutBtn.addEventListener('click', signOut);

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        searchBox.addEventListener('input', searchQuery);
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        authForm.classList.remove('active');
        console.log('User logged in ', user);
    } else {
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        console.log('User logged out');
    }       
    updateNotes();
    addNoteForm.reset();
})

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', signup);

async function signup(e) {
    e.preventDefault();

    const email = signupForm['email'].value;
    const password = signupForm['password'].value;

    auth.createUserWithEmailAndPassword(email, password).then(credentials => {
        console.log(`Sucess! User registered as`);
        console.log(credentials.user);
        signupForm.reset();
    }).catch(err => {
        console.error(`Opa! ${err.message}`);
    });
}

// logout
function signOut(e) {
    e.preventDefault();

    auth.signOut().then(() => {
        console.log('User signed out');
    });
}

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', login);

async function login(e) {
    e.preventDefault();

    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    auth.signInWithEmailAndPassword(email, password).then(credentials => {
        loginForm.reset();
    }).catch(err => {
        console.error(`Opa! ${err.message}`);
    });
}