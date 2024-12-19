import Navbar from "../components/Global/Navbar";
import PostForm from "../components/Global/PostForm";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/authActions";
import { useDispatch } from "react-redux";
const Home = () => {
    const dispatch = useDispatch();
    return (
        <div>
            <Navbar />
            <PostForm />
            <Button onClick={() => dispatch(logout())}>Logout</Button>
        </div>
    );
};

export default Home;
