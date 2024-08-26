import "./error.scss";
import deeps from "../../assets/images/deeps.jpeg";
import Layout from "../layout/layout";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../path";

export const ErrorBoundary = () => {
  const navigate = useNavigate();
  const toHome = () => {
    navigate(Paths.home);
  };

  return (
    <Layout>
      <img className="background-image" src={deeps} />
      <div className="error-page">
        <div className="error-page__wrapper">
          <h1 className="error-page__title">Page not found</h1>
          <button className="status__button" onClick={toHome}>
            Back
          </button>
        </div>
      </div>
    </Layout>
  );
};
