import { useNavigate, useParams } from "react-router-dom";
import "./status.scss";
import { Paths } from "../../path";
import Layout from "../layout/layout";

enum Statuses {
  created = "successfully created",
  updated = "successfully updated",
  deleted = "successfully deleted",
}

export default function Status() {
  const { status } = useParams();
  const navigate = useNavigate();

  const toHome = () => {
    navigate(Paths.home);
  };

  return (
    <Layout>
      <div className="status">
        <h1 className="status__title">
          {status
            ? Statuses[status as keyof typeof Statuses]
            : "Something went wrong"}
        </h1>
        <button className="status__button" onClick={toHome}>
          Back
        </button>
      </div>
    </Layout>
  );
}
