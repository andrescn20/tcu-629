import React from "react";

const Footer = () => {
  return (
<footer className="flex text-neutral-content items-center p-4 flex-wrap">
  <aside className="items-center flex-grow">
   
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav className="flex gap-4 md:place-self-center md:justify-self-end">
    <a href="https://www.facebook.com/hogardeancianosdepalmares/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        className="fill-current">
        <path
          d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
      </svg>
    </a>
  </nav>
</footer>
  );
}

export default Footer;