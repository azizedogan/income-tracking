import logo from "@/public/logo.png";
import Image from "next/image";

function Logo() {
    return (
        <div className="flex items-center gap-3 mb-2">
            <Image src={logo} alt="logo img" width='60' height='60' className="rounded-full" />
            <span className="text-lg font-bold text-blue-900 sm:text-xl md:text-2xl">Gelir - Gider Takip</span>
        </div>
    );
}

export default Logo;
