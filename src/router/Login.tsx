import { NavLink, useNavigate } from "react-router-dom";
import { ShowHeader } from "../redux/HideSlice";
import { useAppDispatch } from "../redux/store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../redux/authSlice";
import { User } from "../types/User";
import AuthService from "../services/AuthService";
import { useState } from "react";
import axios from "axios";
const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password is required, at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;
const Login = () => {
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleLogin = (data: FormData) => {
    // Axios Call
    AuthService.LoginUser(data.email, data.password)
      .then(({ data }) => {
        const user: User = {
          email: data.email,
          firstname: data.firstName,
          lastname: data.lastName,
        };
        dispatch(loginUser(user));
        dispatch(ShowHeader());
        navigate("/", { replace: true });
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message);
        }
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto mt-5">
          <div className="card border-0 shadow rounded-3 my-5 mt-">
            <div className="card-body p-4 p-sm-5 ">
              <h2 className="card-title text-center mb-5 fw-light fs-2">
                Sign In
              </h2>
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="form-floating mb-3">
                {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
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

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="rememberPasswordCheck"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="rememberPasswordCheck"
                  >
                    Remember me
                  </label>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary btn-login fw-bold">
                    {" "}
                    Sign in
                  </button>
                  <div className="text-center"></div>
                </div>
                <p className="mt-4">
                  {" "}
                  Don’t have an account?
                  <NavLink to="/Register">Register now</NavLink>{" "}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
