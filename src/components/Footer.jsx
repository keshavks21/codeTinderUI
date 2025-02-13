import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center bg-base-300 text-base-content fixed bottom-0 p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
        <nav className="grid grid-flow-col gap-4">
    <Link to={"contactus"} className="link link-hover">Contact Us</Link>
    <Link to={"privacy_policy"} className="link link-hover">Privacy & Policy</Link>
    <Link to={"term&conditions"} className="link link-hover">Term & Conditons</Link>
    <Link to={"cancellation&refund"} className="link link-hover">Cancellation & Refund</Link>
    <Link to={"shipping&delivery"} className="link link-hover">Shipping & Delivery</Link>
    
  </nav>
      </footer>
    </div>
  );
};

export default Footer;
