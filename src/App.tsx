import React, {useEffect} from "react";
import {Counter} from "features/counter/Counter";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./App.css";
import {Login} from "features/auth/login/Login";
import {Register} from "features/auth/register/Register";
import {ForgotPassword} from "features/auth/forgotPassword/ForgotPassword";
import {SetNewPassword} from "features/auth/setNewPassword/SetNewPassword";
import {Profile} from "features/profile/Profile";
import {Packs} from "features/packs/Packs";
import {Cards} from "features/cards/Cards";
import {Learn} from "features/learn/Learn";
import {useAppDispatch, useAppSelector} from "app/hooks";
import {appActions} from "features/app/app.slice";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Counter/>,
    },
    {
        path: "login",
        element: <Login/>,
    },
    {
        path: "register",
        element: <Register/>,
    },
    {
        path: "forgot-password",
        element: <ForgotPassword/>,
    },
    {
        path: "set-new-password",
        element: <SetNewPassword/>,
    },
    {
        path: "profile",
        element: <Profile/>,
    },
    {
        path: "packs",
        element: <Packs/>,
    },
    {
        path: "cards",
        element: <Cards/>,
    },
    {
        path: "learn",
        element: <Learn/>,
    },
]);

function App() {
    const isLoading = useAppSelector((state) => state.app.isLoading);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(appActions.setIsLoading({isLoading: false}));
        }, 3000);
    }, []);
    if (isLoading) return <h1>Loader...</h1>
    return (
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
