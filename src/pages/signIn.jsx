import { signIn } from "../redux/user/user.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import ThemeSelector from "../components/shared/themeSelector";
import Logo from "../components/shared/Logo";
import { useToast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const reset = () => {
        setFormData({
            ...formData,
            email: "",
            password: "",
        });
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(signIn(formData))
            .unwrap()
            .then(() => {
                toast({
                    title: "Success 🎉",
                    description: "Singed in successfully",
                });
                navigate("/");
                reset();
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Error ⚠️",
                    description: error.message,
                });
                console.log(error);
            });
    };
    return (
        <div className="flex flex-col items-start justify-center h-screen bg-[url('/bgSign.svg')] dark:bg-[url('/bgSign2.svg')]  bg-cover bg-center">
            <div className="absolute bottom-4 left-4">
                <ThemeSelector />
            </div>
            <Card className="w-[350px] ml-[250px]">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>
                        Welcome back! Please sign in to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="form" onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Your email"
                                    value={formData.email}
                                    required
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    placeholder="password"
                                    required
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={reset}>
                        Reset
                    </Button>
                    <Button form="form" type="submit">
                        Sign In
                    </Button>
                </CardFooter>
            </Card>
            <div className="ml-[250px] text-center w-[350px] mt-8">
                <span>
                    Don&apos;t have an account?
                    <Link
                        to={"/signup"}
                        className=" underline font-semibold text-primary"
                    >
                        SignUp
                    </Link>
                </span>
            </div>
            <div className="absolute top-4 left-4">
                <Logo />
            </div>
        </div>
    );
};

export default SignIn;
