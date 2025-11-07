import { Logo } from "../Logo/Logo";
import "./Header.css";

export const Header = () => {
  return (
    <header className="layout-header">
      <section className="grey-dark-section">
        <div className="wt-container">
          <Logo />
        </div>
      </section>
    </header>
  );
};
