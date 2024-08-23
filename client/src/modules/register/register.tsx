import { Form } from "antd";
import "./register.scss";
import { FormInput, PasswordInput } from "../../components/form-input";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../path";
import Layout from "../layout/layout";
import { selectUser } from "../../features/auth.slice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRegisterMutation } from "../../share/auth";
import { User } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/isError";
import { ErrorMessage } from "../error/error";

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

export default function Register() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();
      navigate(Paths.home);
    } catch (err) {
      const isError = isErrorWithMessage(err);

      if (isError) {
        setError(err.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <Layout>
      <div className="register">
        <div className="register__form-wrapper">
          <h1 className="register__form-title">register</h1>
          <Form onFinish={register}>
            <FormInput name="name" placeholder="name" />
            <FormInput type="email" name="email" placeholder="email" />
            <PasswordInput name="password" placeholder="password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="confirm password"
            />
            <div className="register__button-wrapper">
              <button className="register__form-button" type="submit">
                register
              </button>
              <p className="register__link">already have an account?</p>
              <Link className="register__link" to={Paths.login}>
                login
              </Link>
            </div>
          </Form>
        </div>
      </div>
      <ErrorMessage message={error} />
    </Layout>
  );
}
