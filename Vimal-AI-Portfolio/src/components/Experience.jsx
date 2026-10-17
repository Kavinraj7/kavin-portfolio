import { motion } from "framer-motion";
import portfolioData from "../data/portfolioData";

function Experience() {

  const internships = portfolioData.internships;

  return (
    <section
      id="experience"
      className="py-24 px-8"
    >

      <div className="max-w-7xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center text-cyan-400"
        >
          Experience
        </motion.h2>


        <div className="mt-16 space-y-8">

          {internships.map((internship, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2
              }}
              className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-cyan-400 transition"
            >

              <h3 className="text-2xl font-bold text-cyan-400">
                {internship.company}
              </h3>


              <h4 className="text-xl text-white mt-2">
                {internship.role}
              </h4>


              <p className="text-gray-400 mt-2">
                {internship.duration}
              </p>


              <p className="text-gray-300 mt-4 leading-7">
                {internship.description}
              </p>


            </motion.div>

          ))}

        </div>


      </div>


    </section>
  );
}

export default Experience;