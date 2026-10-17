import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import portfolioData from "../data/portfolioData";

function Hero() {
  const { personal } = portfolioData;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-8 pt-20"
    >
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          <h2 className="text-cyan-400 text-xl">
            Hello, I'm
          </h2>


          <h1 className="text-6xl font-bold mt-3">
            {personal.name}
          </h1>


          <h3 className="text-3xl mt-5 text-gray-300">
            {personal.role}
          </h3>


          <p className="mt-6 text-gray-400 leading-8 max-w-xl">
            {portfolioData.about}
          </p>


          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href="/Resume.pdf"
              download="Resume.pdf"
              className="bg-cyan-500 px-6 py-3 rounded-xl font-semibold hover:bg-cyan-400 transition"
            >
              Download Resume
            </a>


            {/* Github Button */}
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="border border-cyan-500 px-6 py-3 rounded-xl hover:bg-cyan-500 transition flex items-center gap-2"
            >
              <FaGithub />
              GitHub
            </a>


            {/* LinkedIn Button */}
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="border border-cyan-500 px-6 py-3 rounded-xl hover:bg-cyan-500 transition flex items-center gap-2"
            >
              <FaLinkedin />
              LinkedIn
            </a>

          </div>

        </motion.div>


        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >

          <div className="relative">

            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-3xl opacity-20">
            </div>


            <img
              src="/images/profile.jpg"
              alt="R V Vimal"
              className="relative w-80 h-80 md:w-96 md:h-96 object-cover rounded-full border-4 border-cyan-400 shadow-2xl"
            />

          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default Hero;