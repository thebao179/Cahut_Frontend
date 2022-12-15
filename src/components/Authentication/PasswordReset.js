import React from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";

const PasswordResetSchema = yup.object().shape({
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is a required field"),
    password2: yup
        .string()
        .required("Re-enter your password")
        .oneOf([yup.ref("password"), null], "Your password does not match")
});

function PasswordReset() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(PasswordResetSchema)
    });

    const onSubmit = (data) => {
        //console.log(data.password);
    }

    return (
        <div className="p-4 w-100 flex-grow-1 d-flex align-items-center">
            <div className="w-100">
                <div className="text-center mb-5">
                    <p className="mb-3">
                        <i className="fa fa-2x fa-circle-notch text-primary-light"/>
                    </p>
                    <h1 className="fw-bold mb-2">Password Reset</h1>
                </div>

                <div className="row g-0 justify-content-center">
                    <div className="col-sm-8 col-xl-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    className={`form-control form-control-lg form-control-alt py-3 ${errors.password ? "is-invalid" : ""}`}
                                    placeholder="Password"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="fs-sm fw-medium text-danger">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    className={`form-control form-control-lg form-control-alt py-3 ${errors.password2 ? "is-invalid" : ""}`}
                                    placeholder="Confirm Password"
                                    {...register("password2")}
                                />
                                {errors.password2 && (
                                    <p className="fs-sm fw-medium text-danger">
                                        {errors.password2.message}
                                    </p>
                                )}
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-lg btn-alt-info">
                                    <i className="fa fa-fw fa-plus me-1 opacity-50"/> Change Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordReset;
