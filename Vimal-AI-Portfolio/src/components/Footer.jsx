import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-10">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-3xl font-bold text-cyan-400">
          R. V. Vimal
        </h2>

        <p className="text-gray-400 mt-3">
          AI | Machine Learning | Deep Learning | Full Stack Development
        </p>

        <div className="flex gap-6 mt-6 text-2xl">

          <a
            href="https://github.com/YOUR_GITHUB_USERNAME"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition"
          >
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com/in/YOUR_LINKEDIN_USERNAME"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="mailto:YOUR_EMAIL@gmail.com"
            className="hover:text-cyan-400 transition"
          >
            <FaEnvelope />
          </a>

        </div>

        <hr className="my-8 border-slate-700" />

        <p className="text-center text-gray-500">
          © 2026 R. V. Vimal. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;