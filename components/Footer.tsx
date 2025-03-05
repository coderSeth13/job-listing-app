// components/Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 text-center">
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} JobLista. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
