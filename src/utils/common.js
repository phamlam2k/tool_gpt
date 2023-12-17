import {
  FaJava,
  FaPython,
  FaJsSquare,
  FaReact,
  FaCuttlefish,
  FaAngular,
  FaFigma,
} from "react-icons/fa";
import { CiDatabase, CiMobile1 } from "react-icons/ci";
import { DiCode } from "react-icons/di";

export const listLanguages = [
  {
    label: "JavaScript",
    value: "js",
    Icon: FaJsSquare,
  },
  {
    label: "Python",
    value: "py",
    Icon: FaPython,
  },
  {
    label: "Java",
    value: "java",
    Icon: FaJava,
  },
  {
    label: "ReactJs",
    value: "react",
    Icon: FaReact,
  },
  {
    label: "AngularJs",
    value: "angular",
    Icon: FaAngular,
  },
  {
    label: "Go Lang",
    value: "go",
    Icon: DiCode,
  },
  {
    label: "Figma",
    value: "figma",
    Icon: FaFigma,
  },
  {
    label: "Dart",
    value: "dart",
    Icon: CiMobile1,
  },
  {
    label: "Database",
    value: "database",
    Icon: CiDatabase,
  },
];
