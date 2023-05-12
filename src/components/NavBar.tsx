import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">profile</a></li>
        <li><a href="/contact">Logout</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
