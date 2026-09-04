import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 256 256"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M 128.005 191.173 C 128.448 156.208 156.93 128 192 128 L 192 64 L 128 64 C 128 99.346 99.346 128 64 128 L 64 192 L 128 192 Z M 192 256 L 64 256 C 28.654 256 0 227.346 0 192 L 0 64 L 64 64 L 64 0 L 192 0 C 227.346 0 256 28.654 256 64 L 256 192 L 192 192 Z" />
  </svg>
);

export const StablecoinNavbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-[50px] py-5 w-full">
      <div className="flex items-center justify-between max-w-[88rem] mx-auto w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <LogoIcon className="w-7 h-7 text-black" />
          <span className="text-2xl font-extrabold tracking-tight text-black">ArthSetu</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200">Home</Link>
          <Link to="/products" className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200">Products</Link>
          <Link to="/ai-research" className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200">AI Research</Link>
          <Link to="/pricing" className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200">Pricing</Link>
          <Link to="/about" className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200">About</Link>
          <Link to="/contact" className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200">Contact</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200">
            Login
          </Link>
          <button
            onClick={() => navigate('/signup')}
            className="bg-black text-white text-base font-medium px-7 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
          >
            Create Account
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StablecoinNavbar;
