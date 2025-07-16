import type { ReactNode } from "react";
import {
  FaTree,
  FaUsers,
  FaUmbrellaBeach,
  FaUserFriends,
  FaGraduationCap,
  FaSun,
  FaCampground,
  FaCalendarAlt,
  FaCoffee,
  FaUserSecret,
  FaRegSmile,
  FaRegClock,
  FaSnowflake,
  FaSun as FaSummerSun,
  FaCity,
  FaHome,
  FaPlane,
  FaWater,
  FaImage,
  FaTags,
} from "react-icons/fa";

export const tagIconMap: Record<string, ReactNode> = {
  Nature: <FaTree />,
  Family: <FaUsers />,
  OnVacation: <FaUmbrellaBeach />,
  WithFriends: <FaUserFriends />,
  Graduation: <FaGraduationCap />,
  Sunset: <FaSun />,
  Camping: <FaCampground />,
  NewYear: <FaCalendarAlt />,
  Coffee: <FaCoffee />,
  Solitude: <FaUserSecret />,
  Memories: <FaRegSmile />,
  Happiness: <FaRegSmile />,
  Nostalgia: <FaRegClock />,
  Winter: <FaSnowflake />,
  Summer: <FaSummerSun />,
  CityTour: <FaCity />,
  HomePeace: <FaHome />,
  Travel: <FaPlane />,
  Sea: <FaWater />,
  Scenery: <FaImage />,
};

// Varsayılan ikon
export const defaultTagIcon = <FaTags />;
