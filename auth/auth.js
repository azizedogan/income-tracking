import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    signInWithPopup,
    GoogleAuthProvider,
    updatePassword
} from "firebase/auth";
import { auth, db } from "@/firebaseConfig"; 
import { doc, setDoc, getDoc} from "firebase/firestore";
import { useRouter } from "next/router";

const saveUserToFirestore = async(user) => {
    if(!user) return;
    
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if(!userSnap.exists()) {
        await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
        });
    }
};

export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        await saveUserToFirestore(result.user);
        return result.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const signup = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await saveUserToFirestore(user);

        return user;
    } catch (error) {
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    const router = useRouter();

    try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await signOut(auth);
        
        router.push("/");
    } catch (error) {
        throw error;
    }
};

export const updateUserPassword = async(newPassword) => {
    try {
        if(auth.currentUser) {
            await updatePassword(auth,currentUser, newPassword);
        } 
        } catch(error) {
            throw error;
        }
    };

export const subscribeToAuthChanges = (callback) => {
    const unsubscribe =
     onAuthStateChanged(auth, async(user) => {
        if(user) {
            await saveUserToFirestore(user);
        }
        callback(user);
    });

    return unsubscribe;
};
