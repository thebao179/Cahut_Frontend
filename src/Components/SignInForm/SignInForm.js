import React from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email("*Email must be a valid email address")
    .required("*Email is a required field"),
  password: yup.string().required("*Password is a required field")
});

function SignInForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignInSchema)
  });

  const OnSubmit = (submitData) => {
    console.log(submitData);
    navigate("dashboard");
  };

  return (
    <div className="p-4 w-100 flex-grow-1 d-flex align-items-center">
      <div className="w-100">
        <div className="text-center mb-5">
          <p className="mb-3">
            <i className="fa fa-2x fa-circle-notch text-primary-light" />
          </p>
          <h1 className="fw-bold mb-2">Sign In</h1>
          <p className="fw-medium text-muted">
            Welcome, please login or
            <a href="/signup"> sign up </a>
            for a new account.
          </p>
        </div>
        <div className="row g-0 justify-content-center">
          <div className="col-sm-8 col-xl-4">
            <form
              className="js-validation-signin"
              onSubmit={handleSubmit(OnSubmit)}
            >
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
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <a className="text-muted fs-sm fw-medium d-block d-lg-inline-block mb-1">
                    Forgot Password?
                  </a>
                </div>
                <div>
                  <button type="submit" className="btn btn-lg btn-alt-primary">
                    <i className="fa fa-fw fa-sign-in-alt me-1 opacity-50" />{" "}
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
