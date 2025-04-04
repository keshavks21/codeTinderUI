import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="fixed bottom-0  footer footer-center bg-white text-base-content p-2 ">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by DevCircle
          </p>
        </aside>
        <nav className="grid grid-flow-row md:grid-flow-col md:gap-4">
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
