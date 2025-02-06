import { signup, login, signInWithGoogle } from "@/auth/auth";
import { useState } from "react";

const AuthPopup = ({ closePopup }) => {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      closePopup();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      closePopup();
    } catch (error) {
      setError("Google ile giriş yapılamadı: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white dark:bg-gray-800 p-8 rounded shadow-md w-96">
        <button 
          onClick={closePopup} 
          className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          {isLogin ? "Giriş Yap" : "Kayıt Ol"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded dark:text-black"
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded dark:text-black"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </button>
        </form>

        <div className="mt-4">
          <button 
            onClick={handleGoogleSignIn} 
            className="w-full bg-red-500 text-white py-2 rounded flex items-center justify-center"
          >
            <img 
              src="/google-logo.svg" 
              alt="Google" 
              className="w-5 h-5 mr-2"
            />
            Google ile Giriş Yap
          </button>
        </div>
        
        <p
          className="text-sm text-center mt-4 cursor-pointer dark:text-white"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Hesabın yok mu? Kayıt ol" : "Zaten hesabın var mı? Giriş yap"}
        </p>
      </div>
    </div>
  );
}

export default AuthPopup;
