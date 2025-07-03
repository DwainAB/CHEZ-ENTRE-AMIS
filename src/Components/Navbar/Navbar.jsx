import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
//import logo from "../../Assets/logo.png";
import banner from "../../Assets/banner.webp";
import "./Navbar.css";
import TextJson from "../TextJson/TextJson.json";



function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();


    const navigate = useNavigate();

    const handleAnchorClick = (anchor) => {
        navigate('/');
        setTimeout(() => {
            const element = document.getElementById(anchor);
            if (element) {
                const offset = -80; // Ajustez cette valeur selon la hauteur de votre barre de navigation
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition + offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 100);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    // const isPanierPage = location.pathname === '/panier';
    const isMenuPage = location.pathname === '/menu';

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
            document.documentElement.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
            document.documentElement.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
            document.documentElement.classList.remove('no-scroll');
        };
    }, [isOpen]);

    return (
        <div className="containerGlobalNavbar" id="home" style={{ height: isMenuPage ? '130px' : '100vh' }}>
            {/* {!isPanierPage && <div className="shadowNavbar"></div>} */}
            {!isMenuPage && <div className="shadowNavbar"></div>}
            {!isMenuPage && (
                <img className="imgNavbar" src={banner} alt="" />
            )}
            
            <div className="containerTitle">
                {!isMenuPage && <h1>{formatText(TextJson.restaurantName)}</h1>}
                {!isMenuPage && <div className="mouse-container">
                    <div className="mouse">
                        <div className="scroll-wheel"></div>
                    </div>
                </div>}
            </div>
            <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <nav className={`containerNavbar ${isOpen ? 'open' : ''}`}>
                <div></div>
                {/* <div className="containerImgNavbar">
                    <img className="logoNavbar" src={logo} alt="" />
                </div> */}
                <div className="listNavbar">
                    <Link className="itemListNavbar" style={{ color: isMenuPage ? 'black' : '#fff' }} to="/" onClick={() => {
                        handleAnchorClick('home');
                        setIsOpen(false);
                    }}><p>{formatText(TextJson.nav1)}</p></Link>
                    <Link className="itemListNavbar" style={{ color: isMenuPage ? 'black' : '#fff' }} to="/menu" onClick={() => {setIsOpen(false);}}><p>{formatText(TextJson.nav2)}</p></Link>
                    <Link className="itemListNavbar" style={{ color: isMenuPage ? 'black' : '#fff' }} to="/" onClick={() => {handleAnchorClick('contact'); setIsOpen(false);}}><p>{formatText(TextJson.nav3)}</p></Link>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
