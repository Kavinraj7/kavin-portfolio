import { motion } from "framer-motion";
import portfolioData from "../data/portfolioData";

function Certifications() {

  const certifications = portfolioData.certifications;

  return (
    <section
      id="certifications"
      className="py-24 px-8"
    >

      <div className="max-w-7xl mx-auto">


        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center text-cyan-400"
        >
          Certifications
        </motion.h2>



        <div className="grid md:grid-cols-2 gap-8 mt-16">


          {certifications.map((certificate, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1
              }}
              className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-cyan-400 transition"
            >

              <h3 className="text-xl text-gray-200">
                🏆 {certificate}
              </h3>

            </motion.div>

          ))}


        </div>


      </div>


    </section>
  );
}

export default Certifications;