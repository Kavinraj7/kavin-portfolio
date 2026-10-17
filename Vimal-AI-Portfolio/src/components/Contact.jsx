import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import portfolioData from "../data/portfolioData";

function Contact() {

  const { personal } = portfolioData;

  return (
    <section
      id="contact"
      className="py-24 px-8"
    >

      <div className="max-w-5xl mx-auto">


        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center text-cyan-400"
        >
          Contact Me
        </motion.h2>



        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center text-gray-400 mt-5"
        >
          Let's connect and build something innovative with AI and technology.
        </motion.p>



        <div className="grid md:grid-cols-3 gap-8 mt-16">


          {/* Email */}

<div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center hover:border-cyan-400 transition">

  <FaEnvelope className="text-cyan-400 text-4xl mx-auto"/>

  <h3 className="text-xl font-bold mt-4">
    Email
  </h3>

  <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=vimal141205@gmail.com"
  target="_blank"
  rel="noreferrer"
  className="text-gray-400 mt-2 break-all block hover:text-cyan-400"
>
  vimal141205@gmail.com
</a>
</div>



          {/* Github */}

          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center hover:border-cyan-400 transition"
          >

            <FaGithub className="text-cyan-400 text-4xl mx-auto"/>

            <h3 className="text-xl font-bold mt-4">
              GitHub
            </h3>

            <p className="text-gray-400 mt-2">
              View my projects
            </p>

          </a>




          {/* LinkedIn */}

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center hover:border-cyan-400 transition"
          >

            <FaLinkedin className="text-cyan-400 text-4xl mx-auto"/>

            <h3 className="text-xl font-bold mt-4">
              LinkedIn
            </h3>

            <p className="text-gray-400 mt-2">
              Connect with me
            </p>

          </a>


        </div>


      </div>


    </section>
  );
}

export default Contact;