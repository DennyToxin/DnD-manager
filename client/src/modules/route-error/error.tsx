import "./error.scss";
import Layout from "../layout/layout";
import { Link } from "react-router-dom";
import { Paths } from "../../path";

export const ErrorBoundary = () => {
  return (
    <Layout>
      <div className="error-page">
        <h1 className="error-page__title">Page not found</h1>
        <Link to={Paths.home}>
          <span className="error-page__link">Home</span>
        </Link>
      </div>
    </Layout>
  );
};
