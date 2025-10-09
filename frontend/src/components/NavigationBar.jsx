import { Link } from "react-router-dom"
import "../css/NavigationBar.css"

function NavigationBar() {

    return <nav className="navigation-bar">
        <div className='navigation-bar-brand'>
            <div className="logo">
                <Link to="/">Recipe App</Link>
            </div>
            <div className="navigation-bar-links">
                {/* links go here */}
                <Link to="/test-home" className="nav-link">Home</Link>
            </div>

        </div>
    </nav>

}

export default NavigationBar