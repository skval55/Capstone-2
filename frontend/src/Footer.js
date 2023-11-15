import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

const Footer = () => {
  return (
    <footer className=" py-10 bg-black text-neutral-content text-center md:flex">
      <div className="m-auto md:w-1/2">
        <p>
          GrooveGuru
          <br />
          Created by Samuel Valadez
        </p>

        <a
          className="m-auto"
          href="https://www.freepik.com/free-photo/transparent-green-creativity-modern-art-ink-colors-are-amazingly-bright-luminous-translucent-freeflowing-dry-quickly-natural-pattern-luxury-abstract-artwork-trendy-style_26934772.htm#query=dark%20blue%20green%20black%20background&position=31&from_view=search&track=ais"
        >
          Image by benzoix on Freepik
        </a>
      </div>
      <nav className="w-screen md:w-1/2">
        <header className="footer-title mt-4 ">Connect</header>
        <div className="flex justify-around w-screen md:w-full">
          {/* grid grid-flow-col gap-4 */}
          <a href="https://github.com/skval55/Capstone-2">
            <FontAwesomeIcon className="text-2xl" icon="fa-brands fa-github" />
          </a>
          <a href="https://www.linkedin.com/in/samval55/">
            <FontAwesomeIcon
              className="text-2xl"
              icon="fa-brands fa-linkedin"
            />
          </a>
          <a href="https://open.spotify.com/user/skvaladez?si=e23185d6aafc4adc">
            <FontAwesomeIcon className="text-2xl" icon="fa-brands fa-spotify" />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
