
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GameBoard from "@/components/GameBoard";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { motion } from "framer-motion";

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialGameMode = location.state?.gameMode || "player";
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex justify-between items-center max-w-xl mx-auto"
        >
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="flex items-center gap-1"
          >
            <Home size={16} />
            <span>Home</span>
          </Button>
        </motion.div>

        <GameBoard initialGameMode={initialGameMode} />
        
        <motion.div 
          className="mt-8 text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>Made with 💜 by Atharv Gaur</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Game;
