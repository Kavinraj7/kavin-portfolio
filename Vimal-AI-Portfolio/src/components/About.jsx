import { motion } from "framer-motion";
import portfolioData from "../data/portfolioData";

function About() {
  const { education } = portfolioData;

  return (
    <section
      id="about"
      className="py-24 px-8"
    >

      <div className="max-w-7xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center text-cyan-400"
        >
          About Me
        </motion.h2>


        <div className="grid md:grid-cols-2 gap-10 mt-16">


          {/* About Description */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900 p-8 rounded-2xl border border-slate-800"
          >

            <p className="text-gray-300 leading-8 text-lg">
              {portfolioData.about}
            </p>


            <p className="text-gray-300 leading-8 text-lg mt-5">
              I have experience building AI and full-stack applications,
              including Deep Learning models, Generative AI solutions,
              and intelligent systems using modern technologies.
            </p>


            <p className="text-gray-300 leading-8 text-lg mt-5">
              My goal is to create impactful AI solutions that combine
              machine learning, software engineering, and real-world problem solving.
            </p>

          </motion.div>



          {/* Education Card */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900 p-8 rounded-2xl border border-slate-800"
          >

            <h3 className="text-3xl font-bold text-cyan-400">
              Education
            </h3>


            <div className="mt-6 space-y-4 text-gray-300">

              <p>
                <span className="font-bold text-white">
                  Degree:
                </span>
                <br />
                {education.degree}
              </p>


              <p>
                <span className="font-bold text-white">
                  College:
                </span>
                <br />
                {education.college}
              </p>


              <p>
                <span className="font-bold text-white">
                  CGPA:
                </span>
                <br />
                {education.cgpa}
              </p>


            </div>


          </motion.div>


        </div>


      </div>

    </section>
  );
}

export default About;