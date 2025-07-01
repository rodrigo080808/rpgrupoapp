// script.js

console.log("****** ¡Hola desde script.js! ******"); // Línea de prueba para verificar carga

// Importa los módulos de Firebase que necesitas directamente
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// **TU CONFIGURACIÓN DE FIREBASE REAL**
const firebaseConfig = {
  apiKey: "AIzaSyD2P8-qMVtA5wY1zT5k9bSCYIY2-vA7KME",
  authDomain: "rpgrupo-2dc94.firebaseapp.com",
  projectId: "rpgrupo-2dc94",
  storageBucket: "rpgrupo-2dc94.firebasestorage.app",
  messagingSenderId: "548768070914",
  appId: "1:548768070914:web:4bce42906d4748828e161b"
};

// Inicializa Firebase en tu app
const app = initializeApp(firebaseConfig);

// Obtén las instancias de los servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);

// --- Ejemplo 1: Autenticación Anónima ---
// *** CAMBIO AQUÍ: Renombramos la función local a handleAnonymousSignIn ***
async function handleAnonymousSignIn() { // <-- ¡ANTES ERA signInAnonymously!
    try {
        // La llamada a la función de Firebase sigue siendo signInAnonymously(auth)
        const userCredential = await signInAnonymously(auth);
        // ¡ESTE ES EL MENSAJE QUE QUEREMOS VER!
        console.log("Usuario anónimo autenticado:", userCredential.user.uid);
        document.getElementById('app-content').innerHTML = `
            <p>¡Bienvenido, usuario anónimo! Tu ID es: ${userCredential.user.uid}</p>
            <button id="add-data-btn">Añadir datos de prueba a Firestore</button>
        `;
        document.getElementById('add-data-btn').addEventListener('click', addTestDataToFirestore);
    } catch (error) {
        console.error("Error al iniciar sesión anónimamente:", error);
        document.getElementById('app-content').innerHTML = `<p>Error al iniciar sesión: ${error.message}</p>`;
    }
}

// --- Ejemplo 2: Escribir datos en Firestore ---
async function addTestDataToFirestore() {
    try {
        const docRef = await addDoc(collection(db, "empresas"), {
            nombre: "Mi Empresa de Prueba",
            fundacion: 2023,
            descripcion: "Una empresa de ejemplo para la gestión de grupos.",
            creadoEn: serverTimestamp() // Usa esto para tener la fecha del servidor
        });
        console.log("Documento añadido con ID:", docRef.id);
        document.getElementById('app-content').innerHTML += `<p>Datos de empresa añadidos con éxito. ID: ${docRef.id}</p>`;
    } catch (e) {
        console.error("Error al añadir documento: ", e);
        document.getElementById('app-content').innerHTML += `<p>Error al añadir datos: ${e.message}</p>`;
    }
}

// Llama a la función de autenticación cuando la página se cargue
document.addEventListener('DOMContentLoaded', () => {
    // *** CAMBIO AQUÍ: Llamamos a la nueva función renombrada ***
    handleAnonymousSignIn(); // <-- ¡ANTES ERA signInAnonymously()!
});

console.log("script.js cargado y ejecutándose.");
