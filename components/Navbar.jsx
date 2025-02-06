import { 
    HiOutlineUser,
    HiOutlineMoon,
    HiOutlineSun,
    HiArrowRightOnRectangle
} from "react-icons/hi2";
import { useState, useEffect } from "react";
import { logout } from "@/auth/auth";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Logo from "./Logo";
import AuthPopup from "./AuthPopup";
import Link from "next/link";


function Navbar({toggleTheme, currentTheme}) {
    const [user, setUser] = useState(null);
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <nav className="w-full h-20 z-10 border-b bg-white fixed top-0 left-0 flex justify-between items-center px-12 py-12 dark:bg-gray-800 dark:border-gray-900">
            <Logo />

            <div className="flex items-start justify-end gap-3 px-8 py-3">
                {!user ? (
                    <button 
                        onClick={() => setShowAuthPopup(true)} 
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Giriş / Kayıt
                    </button>
                ) : (
                    <>
                        <Link href="/hesap">
                            <HiOutlineUser size={25} color="blue" />
                        </Link>
                        <button onClick={toggleTheme}>
                            {currentTheme === "light" ? (
                                <HiOutlineMoon size={25} color="blue" /> 
                                ) : ( 
                                <HiOutlineSun size={25} color="blue" />
                            )}
                        </button>
                        <button onClick={logout} title="Çıkış Yap">
                            <HiArrowRightOnRectangle size={25} color="blue" />
                        </button>
                    </>
                 )}
            </div>

            {showAuthPopup && ( <AuthPopup closePopup={() => setShowAuthPopup(false)} /> )}
        </nav>
    );
}

export default Navbar;
