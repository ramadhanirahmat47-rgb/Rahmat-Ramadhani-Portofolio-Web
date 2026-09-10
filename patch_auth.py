with open('admin.js', 'r') as f:
    content = f.read()

# Replace imports
import_str = """import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, onSnapshot, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";"""

new_import_str = """import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, onSnapshot, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";"""

content = content.replace(import_str, new_import_str)

# Replace variable declaration
content = content.replace("let app, db, docRef;", "let app, db, docRef, auth;")

# Add auth initialization
init_firebase_str = """  const databaseId = firebaseConfig.firestoreDatabaseId || "(default)";
  db = getFirestore(app, databaseId);
  docRef = doc(db, "portfolio", "data");"""

new_init_firebase_str = """  const databaseId = firebaseConfig.firestoreDatabaseId || "(default)";
  db = getFirestore(app, databaseId);
  auth = getAuth(app);
  docRef = doc(db, "portfolio", "data");"""

content = content.replace(init_firebase_str, new_init_firebase_str)

with open('admin.js', 'w') as f:
    f.write(content)
