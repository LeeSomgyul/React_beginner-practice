import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import About from "./screens/About";
import Home from "./screens/Home";
import Notfound from "./screens/Notfound";
import User from "./screens/users/User";
import Follower from "./screens/users/Follower";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "",
                element: <Home/>,
            },
            {
                path: "about",
                element: <About/>,
            },
            {
                path: "users/:userId",
                element: <User/>,
                children: [
                    {
                        path: "followers",
                        element: <Follower/>,
                    }
                ],
            },
        ],
        errorElement: <Notfound/>,
    },
]);

export default router;