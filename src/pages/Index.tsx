
import GameBoard from "@/components/GameBoard";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <GameBoard />
        
        <motion.div 
          className="mt-8 text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>Made with 💜 by Lovable</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
