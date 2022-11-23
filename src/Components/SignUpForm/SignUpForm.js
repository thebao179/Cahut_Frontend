import React from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import axiosClient from "../../API/AxiosClient";
import authenticationApi from "../../API/AuthenticationApi";

const SignUpSchema = yup.object().shape({
  username: yup.string().required("*Username is a required field"),
  email: yup
    .string()
    .email("*Email must be a valid email address")
    .required("*Email is a required field"),
  password: yup
    .string()
    .min(8, "*Password must be at least 8 characters")
    .required("*Password is a required field"),
  password2: yup
    .string()
    .required("*Re-enter your password")
    .oneOf([yup.ref("password"), null], "*Your password does not match")
});

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignUpSchema)
  });
  

  const onSubmit = (data) => authenticationApi.signup(data.email, data.username, data.password);
  

  return (
    <div className="w-100">
      <div className="text-center mb-5">
        <p className="mb-3">
          <i className="fa fa-2x fa-circle-notch text-primary-light" />
        </p>
        <h1 className="fw-bold mb-2">Create Account</h1>
        <p className="fw-medium text-muted">
          Get your access today in one easy step
        </p>
      </div>

      <div className="row g-0 justify-content-center">
        <div className="col-sm-8 col-xl-4">
          <form
            className="js-validation-signup"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4">
              <input
                type="text"
                className="form-control form-control-lg form-control-alt py-3"
                placeholder="Username"
                {...register("username")}
              />
              {errors.username && (
                <p className="fs-sm fw-medium text-danger">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="email"
                className="form-control form-control-lg form-control-alt py-3"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="fs-sm fw-medium text-danger">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="form-control form-control-lg form-control-alt py-3"
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
                className="form-control form-control-lg form-control-alt py-3"
                placeholder="Confirm Password"
                {...register("password2")}
              />
              {errors.password2 && (
                <p className="fs-sm fw-medium text-danger">
                  {errors.password2.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <a className="fs-sm fw-medium" href="/">
                Already have an account?
              </a>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-lg btn-alt-success">
                <i className="fa fa-fw fa-plus me-1 opacity-50" /> Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
