import Header from "../header/header";
import "./layout.scss";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      {children}
    </div>
  );
}
