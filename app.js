// Importa los módulos necesarios desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// CONFIGURACIÓN DE FIREBASE:
// En producción, se recomienda utilizar variables de entorno o un sistema de configuración seguro para estos datos.
const firebaseConfig = {
  apiKey: "AIzaSyCzZBL-GfbxbWtPzMHOkSgnfF0UXD7wt4Y",
  authDomain: "pruebacamarero-b7f54.firebaseapp.com",
  databaseURL: "https://pruebacamarero-b7f54-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "pruebacamarero-b7f54",
  storageBucket: "pruebacamarero-b7f54.firebasestorage.app",
  messagingSenderId: "191387429666",
  appId: "1:191387429666:web:ae8472198e543c6de5d37b",
  measurementId: "G-KXDVQLNQW2"
};

// Inicializa la aplicación Firebase y la base de datos
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/**
 * Guarda un pedido en Firebase Realtime Database.
 * Se espera que orderData incluya:
 *  - mesa: (string) Nombre o número de la mesa.
 *  - pedido: (array) Detalles de los productos.
 *  - precio: (number) Precio total.
 *  - notas: (string) Notas adicionales (opcional).
 *  - fecha: (string) Fecha en formato ISO (se genera automáticamente si no se provee).
 * @param {Object} orderData - Datos del pedido.
 * @returns {Promise} Promesa que se resuelve al guardar el pedido.
 */
export function guardarPedido(orderData) {
  if (!orderData.fecha) {
    orderData.fecha = new Date().toISOString();
  }
  const pedidosRef = ref(db, 'pedidos');
  return push(pedidosRef, orderData);
}

// Exporta la configuración y la instancia de Firebase si fuera necesario
export { firebaseConfig, db };