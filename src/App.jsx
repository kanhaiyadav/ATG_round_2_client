import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import { selectThemeMode } from "./redux/theme/theme.selector";
import { useSelector } from "react-redux";
import Home from "./pages/home";

import { useEffect } from "react";

function App() {
    const theme = useSelector(selectThemeMode);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <Routes>
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="/" element={<Home />} />
        </Routes>
    );
}

export default App;
