import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDrDsIaPa5GmMwLDkFZJWi4KSI8xGsvig",
  authDomain: "lanchita-gestion.firebaseapp.com",
  projectId: "lanchita-gestion",
  storageBucket: "lanchita-gestion.firebasestorage.app",
  messagingSenderId: "782976912630",
  appId: "1:782976912630:web:f499f91866d40c33a3b0d7",
  measurementId: "G-MNFE7BTE5G"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const isFirebaseConfigured = true;

/**
 * Suscripción en tiempo real al documento del Hero principal en Firestore.
 * Documento: configuracion_web/hero_principal
 * @param {Function} onData - Callback al recibir datos
 * @param {Function} [onError] - Callback opcional ante error
 * @returns {Function} Función para cancelar la suscripción (unsubscribe)
 */
export function subscribeHeroPrincipal(onData, onError) {
  try {
    const heroDocRef = doc(db, 'configuracion_web', 'hero_principal');
    return onSnapshot(
      heroDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          onData(snapshot.data());
        } else {
          onData(null);
        }
      },
      (error) => {
        console.warn('[Firestore] Error escuchando hero_principal:', error);
        if (onError) onError(error);
      }
    );
  } catch (err) {
    console.warn('[Firestore] Fallo al iniciar onSnapshot:', err);
    if (onError) onError(err);
    return () => {};
  }
}

export default app;
