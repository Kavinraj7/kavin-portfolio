import { motion } from "framer-motion";
import portfolioData from "../data/portfolioData";

function Skills() {

  const skills = portfolioData.skills;

  return (
    <section
      id="skills"
      className="py-24 px-8"
    >

      <div className="max-w-7xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center text-cyan-400"
        >
          Skills
        </motion.h2>


        <div className="grid md:grid-cols-2 gap-8 mt-16">

          {Object.entries(skills).map(([category, skillList], index) => (

            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2
              }}
              className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-cyan-400 transition"
            >

              <h3 className="text-2xl font-bold text-cyan-400 mb-6">
                {category.replace("_", " ")}
              </h3>


              <div className="flex flex-wrap gap-3">

                {skillList.map((skill) => (

                  <span
                    key={skill}
                    className="px-4 py-2 bg-slate-800 rounded-full text-gray-300 hover:bg-cyan-500 hover:text-white transition"
                  >
                    {skill}
                  </span>

                ))}

              </div>


            </motion.div>

          ))}

        </div>


      </div>

    </section>
  );
}

export default Skills;