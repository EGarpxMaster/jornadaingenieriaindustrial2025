import { useEffect, useRef, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faClock,
  faPersonRunning,
  faAward,
  faAddressCard,
  faPeopleGroup,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Importa el componente Link
import "./navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [navbarHidden, setNavbarHidden] = useState(false);

  const lastScrollTopRef = useRef(0);
  const tickingRef = useRef(false);

  const closeNavbar = useCallback(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, []);

  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdown((prev) => (prev === dropdownId ? null : dropdownId));
  };

  const handleScroll = useCallback(() => {
    const work = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const goingDown = scrollTop > lastScrollTopRef.current;
      setNavbarHidden(goingDown && scrollTop > 150);
      lastScrollTopRef.current = Math.max(scrollTop, 0);
      tickingRef.current = false;
    };
    if (!tickingRef.current) {
      tickingRef.current = true;
      requestAnimationFrame(work);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setOpenDropdown(null);
        (document.querySelector(".menu-toggle") as HTMLButtonElement | null)?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Ya no necesitas esta función
  const isActive = (href: string) =>
    typeof window !== "undefined" && window.location?.pathname === href;

  return (
    <nav className={`navbar ${navbarHidden ? "navbar-hidden" : ""}`} id="mainNav">
      <div className="navbar-container" role="navigation" aria-label="Principal">
        <div className="navbar-logo">
          {/* Usa Link para la navegación interna */}
          <Link to="/" aria-label="Ir a inicio">
            <img
              src={import.meta.env.BASE_URL + "/assets/images/LogoUnificado_Blanco.png"}
              alt="Logotipo de la Jornada de Ingeniería Industrial"
            />
          </Link>
        </div>

        <div className="nav-links-container">
          <button
            className="menu-toggle"
            aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-controls="mainMenu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
            <span className="menu-text">Menú</span>
          </button>

          <div className={`menu ${isMenuOpen ? "show" : ""}`} id="mainMenu">
            <div className="nav-item">
              <Link
                to="/"
                id="homebtn"
                className={`nav-link ${isActive("/#") ? "is-active" : ""}`}
                onClick={closeNavbar}
              >
                <FontAwesomeIcon icon={faHome} className="home-icon" />
                Inicio
              </Link>
            </div>
            <div className="nav-item dropdown">
              <button
                className="nav-link dropdown-header"
                aria-expanded={openDropdown === "nuestraJornada"}
                aria-controls="submenu-nuestra-jornada"
                onClick={() => toggleDropdown("nuestraJornada")}
              >
                <span>Nuestra Jornada</span>
                <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
              </button>
              <div
                id="submenu-nuestra-jornada"
                className={`dropdown-content ${openDropdown === "nuestraJornada" ? "show" : ""}`}
                role="menu"
                tabIndex={-1}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setOpenDropdown(null);
                  }
                }}
              >
                {/* Estos son enlaces de anclaje, no necesitan ser Links de React Router */}
                <a href="#acerca" className="dropdown-item" onClick={closeNavbar} role="menuitem">
                  Acerca de
                </a>
                <a href="#objetivo" className="dropdown-item" onClick={closeNavbar} role="menuitem">
                  Objetivo general
                </a>
                <a href="#publico" className="dropdown-item" onClick={closeNavbar} role="menuitem">
                  Público objetivo
                </a>
                <a href="#mision" className="dropdown-item" onClick={closeNavbar} role="menuitem">
                  Misión
                </a>
                <a href="#vision" className="dropdown-item" onClick={closeNavbar} role="menuitem">
                  Visión
                </a>
              </div>
            </div>

            <div className="nav-item">
              <Link
                to="/historia"
                className={`nav-link ${isActive("/historia") ? "is-active" : ""}`}
                onClick={closeNavbar}
              >
                <FontAwesomeIcon icon={faClock} className="home-icon" />
                Historia
              </Link>
            </div>

            <div className="nav-item">
              <Link
                to="/actividades"
                className={`nav-link ${isActive("/actividades") ? "is-active" : ""}`}
                onClick={closeNavbar}
              >
                <FontAwesomeIcon icon={faPersonRunning} className="home-icon" />
                Actividades
              </Link>
            </div>

            <div className="nav-item">
              <Link
                to="/staff"
                className={`nav-link ${isActive("/staff") ? "is-active" : ""}`}
                onClick={closeNavbar}
              >
                <FontAwesomeIcon icon={faClock} className="home-icon" />
                Staff
              </Link>
            </div>

            <div className="nav-item">
              <Link
                to="/concurso"
                className={`nav-link ${isActive("/concurso") ? "is-active" : ""}`}
                onClick={closeNavbar}
              >
                <FontAwesomeIcon icon={faAward} className="home-icon" />
                Concurso
              </Link>
            </div>

            <div className="nav-item">
              <Link
                to="/aliados"
                className={`nav-link ${isActive("/aliados") ? "is-active" : ""}`}
                onClick={closeNavbar}
              >
                <FontAwesomeIcon icon={faPeopleGroup} className="home-icon" />
                Aliados
              </Link>
            </div>

            <div className="nav-item">
              <Link
                to="/registro"
                className="nav-link btn-registro"
                onClick={closeNavbar}
              >
                Registro
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-logo2">
          {/* Este es un enlace externo, por lo que una etiqueta <a> está bien */}
          <a href="https://unicaribe.mx/" aria-label="Ir al sitio de Universidad del Caribe">
            <img src={import.meta.env.BASE_URL + "/assets/images/LogoUnicaribe_Blanco.png"} alt="Logotipo Universidad del Caribe" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;