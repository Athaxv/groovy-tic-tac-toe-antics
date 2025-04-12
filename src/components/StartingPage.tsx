
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlayIcon, Users, Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StartingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-3">Tic Tac Toe</h1>
          <p className="text-muted-foreground">Choose a game mode to begin playing</p>
        </motion.div>
        
        <div className="space-y-4">
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Button 
              size="lg" 
              className="py-6"
              onClick={() => navigate("/game", { state: { gameMode: "player" }})}
            >
              <Users className="mr-2" />
              Play with Friend
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="py-6"
              onClick={() => navigate("/game", { state: { gameMode: "computer" }})}
            >
              <Cpu className="mr-2" />
              Play with Computer
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Select game mode to start playing!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StartingPage;
