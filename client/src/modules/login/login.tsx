import { Form } from "antd";
import "./login.scss";
import { FormInput, PasswordInput } from "../../components/form-input";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../path";
import { useLoginMutation, UserData } from "../../share/auth";
import { isErrorWithMessage } from "../../utils/isError";
import { useState } from "react";
import { ErrorMessage } from "../error/error";
import Layout from "../layout/layout";

export default function Login() {
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation(); // [loginUser, loginUserResault ]
  const [error, setError] = useState("");
  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();

      navigate(Paths.home);
    } catch (err) {
      const isError = isErrorWithMessage(err);

      setTimeout(() => {
        if (isError) {
          setError(err.data.message);
        } else {
          setError("An unexpected error occurred");
        }
      }, 1000);
    }
  };

  return (
    <Layout>
      <img className="background-image" src="src/assets/images/fields.jpeg"/>
      <div className="login">
        <div className="login__form-wrapper">
          <h1 className="login__form-title">Login</h1>
          <Form onFinish={login}>
            <FormInput type="email" name="email" placeholder="email" />
            <PasswordInput name="password" placeholder="password" />
            <div className="login__button-wrapper">
              <button className="login__form-button" type="submit">
                login
              </button>
              <Link to={Paths.register}>
                <p className="login__link">no account yet?</p>
              </Link>
            </div>
            <ErrorMessage message={error} />
          </Form>
        </div>
      </div>
    </Layout>
  );
}
