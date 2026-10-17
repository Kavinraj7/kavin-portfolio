import { FaRobot } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
          <FaRobot />
          Vimal AI
        </h1>

        <ul className="hidden md:flex gap-8 text-gray-300">

  <li>
    <a href="#home" className="hover:text-cyan-400 cursor-pointer">
      Home
    </a>
  </li>

  <li>
    <a href="#about" className="hover:text-cyan-400 cursor-pointer">
      About
    </a>
  </li>

  <li>
    <a href="#skills" className="hover:text-cyan-400 cursor-pointer">
      Skills
    </a>
  </li>

  <li>
    <a href="#projects" className="hover:text-cyan-400 cursor-pointer">
      Projects
    </a>
  </li>

  <li>
    <a href="#contact" className="hover:text-cyan-400 cursor-pointer">
      Contact
    </a>
  </li>

</ul>
      </div>
    </nav>
  );
}

export default Navbar;