// Importa los módulos necesarios desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// ─── CONFIGURACIÓN DE FIREBASE ───────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyDPbN_dr1LzVhksnFmzeKOLpHAZZRSxWv4",
  authDomain:        "tecnologiasonix-733fc.firebaseapp.com",
  databaseURL:       "https://tecnologiasonix-733fc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:         "tecnologiasonix-733fc",
  storageBucket:     "tecnologiasonix-733fc.firebasestorage.app",
  messagingSenderId: "139377195491",
  appId:             "1:139377195491:web:0727f6e57cc23351bd88d6",
  measurementId:     "G-DTY83CCZZ9"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

/**
 * Guarda un pedido en Firebase Realtime Database.
 * @param {Object} orderData
 * @returns {Promise}
 */
export function guardarPedido(orderData) {
  if (!orderData.fecha) {
    orderData.fecha = new Date().toISOString();
  }
  const pedidosRef = ref(db, 'pedidos');
  return push(pedidosRef, orderData);
}

/**
 * Carga todos los productos desde Firebase Realtime Database.
 * Estructura esperada en /productos/{id}:
 *   name, description, price, image, category, subcategory, menuOptions (opcional)
 * @returns {Promise<Array>}
 */
export async function cargarProductos() {
  const productosRef = ref(db, 'productos');
  const snapshot = await get(productosRef);
  if (!snapshot.exists()) return [];

  const productos = [];
  snapshot.forEach(child => {
    const data = child.val();
    productos.push({
      id:          child.key,
      name:        data.name        || "",
      description: data.description || "",
      price:       parseFloat(data.price) || 0,
      image:       data.image       || "",
      category:    data.category    || "",
      subcategory: data.subcategory || "",
      menuOptions: data.menuOptions || null,
    });
  });

  return productos.filter(p => p.name);
}

export { firebaseConfig, db };
