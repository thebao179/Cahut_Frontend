/* eslint-disable */
import React from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";

const phoneRegExp = /^((\+)33|0)[1-9](\d{2}){4}$/;

const InfoSchema = yup.object().shape({
    username: yup.string().required("Username is a required field"),
    phone: yup
        .string()
        .matches(phoneRegExp, {message: "Phone number is not valid", excludeEmptyString: true})
});

const PasswordSchema = yup.object().shape({
    cpassword: yup
        .string()
        .required("Current password is a required field"),
    password: yup
        .string()
        .min(8, "New password must be at least 8 characters")
        .required("New password is a required field"),
    password2: yup
        .string()
        .required("Re-enter your new password")
        .oneOf([yup.ref("password"), null], "Your password does not match")
});

function Profile() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(InfoSchema)
    });

    const onSubmit = (data) => {
        One.helpers('jq-notify', {type: 'success', icon: 'fa fa-check me-1', message: 'Profile updated'});
    }

    const pValidator = useForm({
        resolver: yupResolver(PasswordSchema)
    });

    const onSubmit2 = (data) => {
        One.helpers('jq-notify', {type: 'success', icon: 'fa fa-check me-1', message: 'Change password successfully'});
    }

    return (
        <>
            <div className="bg-image" style={{backgroundImage: 'url("/assets/media/photos/profile-photo.jpg")'}}>
                <div className="bg-primary-dark-op">
                    <div className="content content-full text-center">
                        <div className="my-3">
                            <img className="img-avatar img-avatar-thumb" src="/assets/media/avatars/avatar.jpg" alt="" />
                        </div>
                        <h1 className="h2 text-white mb-0">Trong Le</h1>
                    </div>
                </div>
            </div>
            <div className="content content-boxed">
                <div className="block block-rounded">
                    <div className="block-header block-header-default">
                        <h3 className="block-title">User Profile</h3>
                    </div>
                    <div className="block-content">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row push">
                                <div className="col-lg-4">
                                    <p className="fs-sm text-muted">
                                        Your account’s vital info. Your username will be publicly visible.
                                    </p>
                                </div>
                                <div className="col-lg-8 col-xl-5">
                                    <div className="mb-4">
                                        <label className="form-label">Email Address</label>
                                        <input type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                               value="quoctrongle2001@gmail.com" disabled={true}
                                               {...register("email")} />
                                        {errors.email && (
                                            <p className="fs-sm fw-medium text-danger">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Username</label>
                                        <input type="text" className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                               placeholder="Enter Your Username" defaultValue={'Trong Le'}
                                               {...register("username")} />
                                        {errors.username && (
                                            <p className="fs-sm fw-medium text-danger">
                                                {errors.username.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Phone</label>
                                        <input type="text" className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                               placeholder="Enter Your Phone Number"
                                               {...register("phone")} />
                                        {errors.phone && (
                                            <p className="fs-sm fw-medium text-danger">
                                                {errors.phone.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <button type="submit" className="btn btn-alt-primary">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="block block-rounded">
                    <div className="block-header block-header-default">
                        <h3 className="block-title">Change Password</h3>
                    </div>
                    <div className="block-content">
                        <form onSubmit={pValidator.handleSubmit(onSubmit2)}>
                            <div className="row push">
                                <div className="col-lg-4">
                                    <p className="fs-sm text-muted">
                                        Changing your sign in password is an easy way to keep your account secure.
                                    </p>
                                </div>
                                <div className="col-lg-8 col-xl-5">
                                    <div className="mb-4">
                                        <label className="form-label">Current Password</label>
                                        <input type="password" className={`form-control ${pValidator.formState.errors.cpassword ? "is-invalid" : ""}`}
                                               {...pValidator.register("cpassword")} />
                                        {pValidator.formState.errors.cpassword && (
                                            <p className="fs-sm fw-medium text-danger">
                                                {pValidator.formState.errors.cpassword.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">New Password</label>
                                        <input type="password" className={`form-control ${pValidator.formState.errors.password ? "is-invalid" : ""}`}
                                               {...pValidator.register("password")} />
                                        {pValidator.formState.errors.password && (
                                            <p className="fs-sm fw-medium text-danger">
                                                {pValidator.formState.errors.password.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Confirm New Password</label>
                                        <input type="password" className={`form-control ${pValidator.formState.errors.password2 ? "is-invalid" : ""}`}
                                               {...pValidator.register("password2")} />
                                        {pValidator.formState.errors.password2 && (
                                            <p className="fs-sm fw-medium text-danger">
                                                {pValidator.formState.errors.password2.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <button type="submit" className="btn btn-alt-primary">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;
