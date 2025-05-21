// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js';
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDqg5yZTKmtIyWs1oXDQiqIOtxdisr5cto',
	authDomain: 'tpf-lab4-7b586.firebaseapp.com',
	projectId: 'tpf-lab4-7b586',
	storageBucket: 'tpf-lab4-7b586.firebasestorage.app',
	messagingSenderId: '899662412691',
	appId: '1:899662412691:web:3234bce8b24fc59c28c666',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector('#signInButton');
const signOutButton = document.querySelector('#signOutButton');

const userSignIn = async () => {
	signInWithPopup(auth, provider)
		.then((result) => {
			const user = result.user;
			console.log(user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
};

const userSignOut = async () => {
	signOut(auth)
		.then(() => {
			alert('You have been signed out!');
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
};

onAuthStateChanged(auth, (user) => {
	if (user) {
		alert('You are authenticated with Google');
		console.log(user);

		const name = user.displayName || '';
		const [firstName, ...rest] = name.split(' ');
		const lastName = rest.join(' ');
		document.getElementById('firstName').value = firstName || '';
		document.getElementById('lastName').value = lastName || '';
		document.getElementById('exampleInputEmail1').value = user.email || '';
	}
});

signInButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSignOut);
