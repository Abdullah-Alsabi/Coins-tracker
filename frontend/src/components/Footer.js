import React from "react";

const Footer = () => {
  let Year = new Date().getFullYear();

  return (
    <footer className="page-footer font-small blue pt-4">
      <div className="footer-copyright text-center py-3">
        Copyright © Coins Tracker {Year} • All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
