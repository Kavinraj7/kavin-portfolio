import { motion } from "framer-motion";
import portfolioData from "../data/portfolioData";

function Projects() {

  const projects = portfolioData.projects;

  return (
    <section
      id="projects"
      className="py-24 px-8"
    >

      <div className="max-w-7xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center text-cyan-400"
        >
          Projects
        </motion.h2>


        <div className="grid md:grid-cols-2 gap-10 mt-16">


          {projects.map((project, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1
              }}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-400 transition"
            >


              <img
                src={project.image}
                alt={project.title}
                className="w-full h-60 object-cover"
              />


              <div className="p-6">


                <h3 className="text-2xl font-bold text-cyan-400">
                  {project.title}
                </h3>


                <p className="text-gray-400 mt-4 leading-7">
                  {project.description}
                </p>



                <div className="flex flex-wrap gap-2 mt-5">

                  {project.technologies.map((tech) => (

                    <span
                      key={tech}
                      className="bg-slate-800 px-3 py-1 rounded-full text-sm text-gray-300"
                    >
                      {tech}
                    </span>

                  ))}

                </div>


              </div>


            </motion.div>

          ))}


        </div>


      </div>


    </section>
  );
}

export default Projects;