import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom'; 

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-neutral-900 bg-opacity-70 bg-cover bg-center w-full px-4 py-2 fixed">

            <div className="flex justify-between">

                


                <button
                    className="text-white md:hidden"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            <ul
                className={`${isMenuOpen ? "block" : "hidden"
                    } md:flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mt-4 md:mt-0 justify-center`}
            >
                <li className="text-md font-bold text-white cursor-pointer  border border-white border-2xl p-2 rounded-lg hover:scale-105 hover:shadow-2xl p-2">
                    <Link to="/">
                        HOME
                    </Link>
                </li>
                <li className="text-md font-bold text-white cursor-pointer border border-white border-2xl p-2 rounded-lg hover:scale-105 hover:shadow-2xl p-2">
                    <Link to="/feature" >
                        ABOUT US
                    </Link>
                </li>
            </ul>
        </div>
    );
}
