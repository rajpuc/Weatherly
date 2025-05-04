import React, { useEffect, useState } from "react";
import {
  Cloud,
  CloudDrizzleIcon,
  CloudFog,
  CloudHail,
  CloudMoonRain,
  CloudSnow,
  CloudSun,
  Droplet,
  LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const weatherIcons: LucideIcon[] = [
  Cloud,
  CloudDrizzleIcon,
  CloudFog,
  CloudHail,
  CloudMoonRain,
  CloudSnow,
  CloudSun,
  Droplet,
];

const WeatherIconCarousel: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % weatherIcons.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = weatherIcons[index];

  return (
    <div className=" flex items-end justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-blue-500"
        >
          <CurrentIcon className="h-10 10" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WeatherIconCarousel;
