import { Link } from "react-router-dom"
import "../css/NavigationBar.css"
import DefaultProfilePicture from "../assets/DefaultProfilePicture.png"
import logo from "../assets/logo.png"

function NavigationBar() {

    return (
        <nav className="navigation-bar">
            <div className='nav-container'>
                {/* logo */}
                <Link to="/" className="nav-logo">
                    <img
                        src={logo}
                        alt="Logo"
                    />
                </Link>

                {/* search options */}
                <div className="nav-center">
                    <div className="nav-name">
                        <Link to="/search-by-name">Name</Link>
                    </div>
                    <div className="nav-ingredients">
                        <Link to="/">Ingredients</Link>
                    </div>
                    <div className="nav-nutrition">
                        <Link to="/search-by-nutrition">Nutrition</Link>
                    </div>
                </div>

                {/* profile */}
                <div className="nav-profile">
                    <img
                        src={DefaultProfilePicture}
                        alt="Profile"
                        className="profile-pic"
                    />
                </div>
            </div>
        </nav>
    )
}


export default NavigationBar