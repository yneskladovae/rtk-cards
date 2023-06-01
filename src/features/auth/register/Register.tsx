import React from "react";
import {useAppDispatch} from "app/hooks";
import {authThunks} from "features/auth/auth.slice";

export const Register = () => {
    const dispatch = useAppDispatch();

    const registerHandler = () => {
        dispatch(authThunks.register());
    };

    return (
        <div>
            <h2>Register</h2>
            <button onClick={registerHandler}>register</button>
        </div>
    );
};
