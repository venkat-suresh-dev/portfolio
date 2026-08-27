import type { Metric } from "./types";

export type AcademicProject = {
  id: string;
  title: string;
  /** Shorter scan title when `title` is the full document name. */
  headline?: string;
  /** Document type, e.g. dissertation. */
  designation?: string;
  summary: string;
  technologies?: readonly string[];
  collaborators?: string;
  metrics?: readonly Metric[];
};

export type EducationDocument = {
  id: string;
  kind: "degree";
  title: string;
  caption: string;
  /** Local path under /public when the real document scan exists. */
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type EducationEntry = {
  id: string;
  institution: string;
  degree: string;
  start: string;
  end?: string;
  location?: string;
  outcome?: string;
  modules?: readonly string[];
  academicProjects?: readonly AcademicProject[];
  documents?: readonly EducationDocument[];
};

export type Achievement = {
  id: string;
  name: string;
  kind?: string;
  label?: string;
  value: string;
  year: string;
  paper?: string;
  context?: string;
  sourceUrl?: string;
  featured?: boolean;
};

export const education: readonly EducationEntry[] = [
  {
    id: "msc-qmul",
    institution: "Queen Mary University of London",
    degree: "MSc Big Data Science",
    start: "Sep 2023",
    location: "London, United Kingdom",
    outcome: "Graduated with Distinction",
    modules: [
      "Applied Statistics",
      "Data Mining",
      "Cloud Computing",
      "Big Data Processing",
      "Machine Learning",
      "Deep Learning",
    ],
    // Master's academic evidence only — not homepage portfolio projects.
    // Array order is editorial: the first entry is the lead academic evidence.
    academicProjects: [
      {
        id: "exoplanet-detection",
        headline: "Exoplanet Detection",
        designation: "Dissertation",
        title:
          "Refined Machine and Deep Learning Approaches for Exoplanet Detection: A Comparative Study.",
        summary:
          "Comparative machine-learning classifier study for exoplanet detection, including a CNN implemented in PyTorch on the Kepler dataset.",
        technologies: ["PyTorch", "CNN", "Kepler dataset"],
        metrics: [
          { label: "Maximum test F1", value: "0.9196" },
          { label: "Balanced accuracy", value: "0.9004" },
        ],
      },
      {
        id: "stock-analysis",
        title: "Stock-analysis web application",
        summary:
          "Django-based web application using the YFinance REST API for real-time stock analysis.",
        technologies: ["Django", "YFinance API"],
        collaborators: "Collaborative team of four",
      },
      {
        id: "cifar-cnn",
        title: "CIFAR-10 / CIFAR-100 CNN",
        summary:
          "Custom CNN built from scratch in PyTorch, evaluated on CIFAR-10 and CIFAR-100.",
        technologies: ["PyTorch", "CNN"],
        metrics: [
          { label: "CIFAR-10 test accuracy", value: "93%" },
          { label: "CIFAR-100 test accuracy", value: "90%" },
        ],
      },
      {
        id: "ethereum-blockchain",
        title: "Ethereum blockchain analysis",
        summary:
          "Analysis of terabyte-scale Ethereum blockchain data in PySpark, including transaction trends, a Spark versus MapReduce comparison, and scam and miner activity analysis.",
        technologies: ["PySpark", "Ethereum"],
      },
      {
        id: "historical-events-ontology",
        title: "Historical-events ontology",
        summary:
          "OWL2 ontology in Protégé with SPARQL endpoints, supporting querying and reasoning about historical information.",
        technologies: ["OWL2", "Protégé", "SPARQL"],
      },
      {
        id: "mile-end-sounds",
        title: "Mile End Sounds",
        summary:
          "Machine-learning pipeline that predicts six locations from audio samples using extracted and averaged features including power, pitch, and spectral features, with Random Forest and KNN.",
        technologies: ["Random Forest", "KNN"],
        metrics: [{ label: "Validation accuracy", value: "60%" }],
      },
    ],
    // Scan not yet in the repository. Add the real file under
    // public/education/ (for example public/education/qmul-msc-degree.jpg)
    // then set src, width, and height. Do not generate a fake certificate.
    documents: [
      {
        id: "DOC. 01",
        kind: "degree",
        title: "Degree / Award document",
        caption:
          "Queen Mary University of London · MSc Big Data Science",
        alt: "Queen Mary University of London Master of Science in Big Data Science degree certificate awarded to Venkataramanan Suresh",
      },
    ],
  },
];

export const achievements: readonly Achievement[] = [
  {
    id: "gate-air-340",
    name: "GATE",
    kind: "exam",
    label: "All-India Rank",
    value: "340",
    year: "2025",
    context:
      "GATE (Graduate Aptitude Test in Engineering) is a national postgraduate entrance examination in India.",
    featured: true,
  },
];
