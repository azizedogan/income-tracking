import Link from "next/link";
import { useState } from "react";
import { 
    HiOutlineHome,
    HiOutlinePlusCircle,
    HiOutlineMinusCircle, 
    HiOutlineListBullet
 } from "react-icons/hi2";

function Sidebar() {
    return (
        <aside className="bg-white text-black w-64 h-screen mt-28 border-r pt-24 fixed top-0 left-0 z-1 dark:bg-gray-800 dark:text-white dark:border-gray-900">
            <ul className="flex flex-col gap-12 text-xl ps-14">
                <li className="flex items-center gap-3">
                    <HiOutlineHome size={25} />
                    <Link href="/">Anasayfa</Link>
                </li>
                <li className="flex items-center gap-3">
                    <HiOutlinePlusCircle size={25} />
                    <Link href="/gelir">Gelir</Link>
                </li>
                <li className="flex items-center gap-3">
                    <HiOutlineMinusCircle size={25} />
                    <Link href="/gider">Gider</Link>
                </li>
                <li className="flex items-center gap-3">
                    <HiOutlineListBullet size={25} />
                    <Link href="/son-islemler">Son İşlemler</Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
