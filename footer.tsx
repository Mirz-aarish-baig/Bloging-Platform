import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export  function Footer() {
  // const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-auto w-full">
  <div className="container mx-auto px-2 py-4"> {/* yahan py-4 adjust kiya */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* gap thodi choti ki */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <h3 className="text-lg font-bold mb-2">Mirza Arish Baig</h3> {/* text-lg kiya */}
        <p className="text-gray-300 text-sm">Full Stack Developer</p>
        <p className="text-gray-300 text-sm mt-1">Turning ideas into reality through code.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <h3 className="text-lg font-bold mb-2">Quick Links</h3> {/* text-lg kiya */}
        <ul className="space-y-1 text-sm">
          <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
          <li><a href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</a></li>
          <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
          <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
        <h3 className="text-lg font-bold mb-2">Connect</h3>
        <div className="flex space-x-3"> {/* space-x-3 choti ki */}
          <Github className="text-gray-300 hover:text-white transition-colors h-5 w-5" /> {/* icon size chota */}
          <Linkedin className="text-gray-300 hover:text-white transition-colors h-5 w-5" />
          <Twitter className="text-gray-300 hover:text-white transition-colors h-5 w-5" />
          <Mail className="text-gray-300 hover:text-white transition-colors h-5 w-5" />
        </div>
      </motion.div>
    </div>

    <motion.div className="mt-4 pt-2 border-t border-gray-700 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
      <p className="text-gray-400 text-xs">© {new Date().getFullYear()} Mirza Arish Baig. All rights reserved.</p> {/* text-xs kiya */}
    </motion.div>
  </div>
</footer>

  );
}
