import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to={"/"} className="flex items-center space-x-2">
            <img src="/logo.png" alt="" className="w-[50px]" />
            <h1>
                <span>Link</span>
                <span>Sphere</span>
            </h1>
        </Link>
    );
};

export default Logo;
