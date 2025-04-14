import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 text-center border-t border-border">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} MAO SEDTHA. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;