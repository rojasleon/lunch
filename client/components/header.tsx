import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="ui menu">
      <Link href="/">
        <a className="header item">Hello Alegra!</a>
      </Link>
      <div className="right menu">
        <Link href="/recipes">
          <a className="item">Recipes</a>
        </Link>
        <Link href="/ingredients">
          <a className="item">Ingredients</a>
        </Link>
        <Link href="/purchases">
          <a className="item">Purchases</a>
        </Link>
        <Link href="/orders">
          <a className="item">Orders</a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
