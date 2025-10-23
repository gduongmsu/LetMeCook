import { Link } from "react-router-dom"
import "../styles/NavigationBar.css"
import DefaultProfilePicture from "../../assets/images/DefaultProfilePicture.png"
import logo from "../../assets/images/logo.png"
import leaf from "../../assets/images/leaf.png"

function NavigationBar() {
    return (
        <nav className="navigation-bar">
            <div className="nav-container">

                {/* logo */}
                <Link to="/" className="nav-logo">
                    <img src={leaf} alt="Logo" />
                </Link>

                {/* centered search section */}
                <div className="nav-center-container">
                    <div className="search-by">
                        Search by
                    </div>
                    <div className="nav-center">
                        <div className="nav-name">
                            <Link to="/search-by-recipe-name">Recipe Name</Link>
                        </div>
                        <div className="nav-ingredients">
                            <Link to="/">Ingredients</Link>
                        </div>
                        <div className="nav-nutrition">
                            <Link to="/search-by-nutrition">Nutrition</Link>
                        </div>
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
