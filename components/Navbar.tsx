import { FunctionComponent } from "preact";

const Navbar: FunctionComponent = () => {
  return (
    <div class="navbar">
      <a href="/wordcsr">Client Side</a>
      <a href="/wordssr">Server Side</a>
    </div>
  );
};

export default Navbar;
