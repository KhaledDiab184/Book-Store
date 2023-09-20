import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiClient from "../services/ApiClient";
const schema = z
  .object({
    firstName: z.string().min(2, { message: "first Name is required" }),
    lastName: z.string().min(2, { message: "last Name is required" }),
    email: z
      .string()
      .email()
      .endsWith(".com", { message: "Only .com domains allowed" }),
    password: z
      .string()
      .min(6, { message: "Password is required, at least 6 characters" })
      .regex(/[A-Z]/, "Password must include at least one Uppercase character")
      .regex(/[a-z]/, " Password must Include at least Uppercase character")
      .regex(/[0-9]/, "Password must Include at least one number"),
    confirmPassword: z
      .string()
      .min(1, { message: "confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "confirm Password dose not math",
  });
type FormData = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleRegister = (data: FormData) => {
    // Axios Call

    setIsLoading(true);

    ApiClient
      .post("/Auth/register", data)
      .then((response) => {
        console.log(response.data);
        toast.success("Reigsterd completed, please login in");
        navigate("/Login", { replace: true });
        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data.errors);
        }
        setIsLoading(false);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto mt-2">
          <div className="card border-0 shadow rounded-3 my-3 mt-">
            <div className="card-body p-4 p-sm-5 ">
              <h2 className="card-title text-center mb-5 fw-light  fs-2">
                Register
              </h2>
              <form onSubmit={handleSubmit(handleRegister)}>
                <div className="form-floating mb-3">
                  <input
                    {...register("firstName")}
                    className="form-control"
                    id="floatingInput"
                    placeholder="firstName"
                  />
                  <label htmlFor="floatingInput">First Name</label>
                  {errors.firstName && (
                    <span className="text-danger">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    {...register("lastName")}
                    className="form-control"
                    id="floatingInput"
                    placeholder="lastName"
                  />
                  <label htmlFor="floatingInput">Last Name</label>
                  {errors.lastName && (
                    <span className="text-danger">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    {...register("email")}
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput">Email address</label>
                  {errors.email && (
                    <span className="text-danger">{errors.email.message}</span>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    {...register("password")}
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label htmlFor="floatingPassword">Password</label>
                  {errors.password && (
                    <span className="text-danger">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Confirm Password"
                  />
                  <label htmlFor="floatingPassword">Confirm Password</label>
                  {errors.confirmPassword && (
                    <span className="text-danger">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary btn-login fw-bold">
                    {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span className="ms-2" role="status">Signin up ...</span>
                    </>
                  ) : (
                    "Register"
                  )}
              
                  </button>
                </div>
              </form>
              <p className="mt-4">
                {" "}
                Don have an account?<NavLink to="/Login">Sign In </NavLink>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
