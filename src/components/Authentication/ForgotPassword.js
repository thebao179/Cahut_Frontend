import React from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import authenticationApi from "../../api/AuthenticationApi";

const ForgotPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .email("Email must be a valid email address")
        .required("Email is a required field"),
});

function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(ForgotPasswordSchema)
    });

    const onSubmit = async (data) => {
        const result = await authenticationApi.forgotPassword(data.email);
        // eslint-disable-next-line no-undef
        One.helpers('jq-notify', {
            type: `${result.status === true ? 'success' : 'danger'}`,
            icon: `${result.status === true ? 'fa fa-check me-1' : 'fa fa-times me-1'}`,
            message: result.message
        });
    }

    return (
        <div className="p-4 w-100 flex-grow-1 d-flex align-items-center">
            <div className="w-100">
                <div className="text-center mb-5">
                    <p className="mb-3">
                        <i className="fa fa-2x fa-circle-notch text-primary-light"></i>
                    </p>
                    <h1 className="fw-bold mb-2">
                        Password Reminder
                    </h1>
                    <p className="fw-medium text-muted">
                        Please provide your account’s email and we will send you your password.
                    </p>
                </div>
                <div className="row g-0 justify-content-center">
                    <div className="col-sm-8 col-xl-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <input type="text" placeholder="Email"
                                       className={`form-control form-control-lg form-control-alt py-3 ${errors.email ? "is-invalid" : ""}`}
                                       {...register("email")}/>
                                {errors.email && (
                                    <p className="fs-sm fw-medium text-danger">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-lg btn-alt-primary">
                                    <i className="fa fa-fw fa-envelope me-1 opacity-50"></i> Send Mail
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
