import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    return (
        <div className="drawer h-full">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <NavBar />
                {children}
                <Footer />
            </div>
            <div className="drawer-side">
                <label for="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-white/80 rounded-r-xl text-base-content min-h-full w-80 p-4">
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Layout;