import { Link } from "react-router-dom"
import "../styles/NavigationBar.css"
import DefaultProfilePicture from "../../assets/images/DefaultProfilePicture.png"
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
                        <Link to="/search-by-recipe-name" className="nav-name">
                            Recipe Name
                        </Link>
                        <Link to="/" className="nav-ingredients">
                            Ingredients
                        </Link>
                        <Link to="/search-by-nutrients" className="nav-nutrition">
                            Nutrients
                        </Link>
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
