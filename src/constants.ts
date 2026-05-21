export interface Program {
  id: string;
  title: string;
  duration: string;
  affiliation: string;
  description: string;
  icon: string;
  learningAreas: string[];
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  image: string;
  qualification: string;
}

export const PROGRAMS: Program[] = [
  {
    id: "bhms",
    title: "BHMS (Bachelor of Homeopathic Medicine)",
    duration: "5 Years + 1 Year Internship",
    affiliation: "Affiliated with Khyber Medical University (KMU)",
    description: "A premier medical degree combining modern diagnostic sciences with classical homeopathic clinical excellence.",
    icon: "GraduationCap",
    learningAreas: [
      "Human Anatomy & Physiology",
      "Homeopathic Materia Medica",
      "Organon of Medicine & Philosophy",
      "Pathology & Microbiology",
      "Practice of Medicine",
      "Surgery & Gynaecology"
    ]
  },
  {
    id: "dhms",
    title: "DHMS (Diploma in Homeopathic Medicine)",
    duration: "4 Years Diploma",
    affiliation: "Recognized by National Council for Homeopathy",
    description: "A professional qualification for aspiring homeopathic practitioners, focusing on clinical therapeutics and pharmacy.",
    icon: "Award",
    learningAreas: [
      "Fundamentals of Homeopathy",
      "Homeopathic Pharmacy",
      "Basic Anatomy & Physiology",
      "General Pathology",
      "Homeopathic Therapeutics",
      "Clinical Diagnostics"
    ]
  },
  {
    id: "md-philosophy",
    title: "M.D. in Homeopathic Philosophy",
    duration: "3 Years Post-Graduate",
    affiliation: "Advanced Academic Research",
    description: "In-depth specialization in the Organon of Medicine, Chronic Miasms, and the philosophical foundations of healing.",
    icon: "BookOpen",
    learningAreas: [
      "Advanced Organon of Medicine",
      "Theory of Chronic Miasms",
      "Medical Logic & Philosophy",
      "Hahnemannian Principles",
      "Research Methodology",
      "Philosophy of Homeopathic Pharmacy"
    ]
  },
  {
    id: "md-materia",
    title: "M.D. in Homeopathic Materia Medica",
    duration: "3 Years Post-Graduate",
    affiliation: "Pharmacological Excellence",
    description: "Advanced research into drug proving, comparative study of remedies, and clinical pharmacological efficacy.",
    icon: "Beaker",
    learningAreas: [
      "Pure Drug Proving",
      "Comparative Materia Medica",
      "Pharmacodynamics",
      "Remedy Relationship & Efficacy",
      "Clinical Application of Remedies",
      "Pharmacognosy in Homeopathy"
    ]
  },
  {
    id: "md-repertory",
    title: "M.D. in Homeopathic Repertory",
    duration: "3 Years Post-Graduate",
    affiliation: "Advanced Case Analytics",
    description: "Specialized training in complex case taking and systematic analysis using modern digital repertory software.",
    icon: "Search",
    learningAreas: [
      "Evolution of Repertories",
      "Computerized Case Analysis",
      "Advanced Clinical Repertory",
      "Case Taking Techniques",
      "Repertorization Methods",
      "Clinical Problem Solving"
    ]
  },
  {
    id: "dhp",
    title: "DHP (Homeopathy Pharmacy)",
    duration: "2 Years Technical Diploma",
    affiliation: "Qualified Pharmacist Training",
    description: "Authorized training for homeopathic pharmacy management, dispensing, and pharmaceutical standardisation.",
    icon: "Stethoscope",
    learningAreas: [
      "Pharmaceutical Chemistry",
      "Homeopathic Dispensing",
      "Liquid & Solid Potentization",
      "Forensic Pharmacy",
      "Drug Store Management",
      "Pharmaceutical Jurisprudence"
    ]
  },
  {
    id: "pgdhms",
    title: "PGDHMS (Advanced Clinical Diploma)",
    duration: "2 Years Post-Graduate",
    affiliation: "Clinical Specialization",
    description: "An advanced bridge program designed for experienced practitioners to refine their clinical and surgical integration.",
    icon: "ShieldCheck",
    learningAreas: [
      "Advanced Case Management",
      "Applied Materia Medica",
      "Clinical Surgery for Homeopaths",
      "Gynaecology & Obstetrics",
      "Acute & Chronic Prescribing",
      "Predictive Homeopathy"
    ]
  },
  {
    id: "mlt-short",
    title: "Certificate in Medical Lab Technology",
    duration: "1 Year Vocational",
    affiliation: "Diagnostic Training",
    description: "Foundational technical training in laboratory diagnostics, pathology, and biochemical instrument management.",
    icon: "Activity",
    learningAreas: [
      "Clinical Biochemistry",
      "Hematology & Blood Bank",
      "Histopathology",
      "Microbiology & Serology",
      "Lab Instrumentation & Safety",
      "Diagnostic Case Correlation"
    ]
  }
];

export const FACULTY: Faculty[] = [
  {
    id: "director",
    name: "Col (r) Iqbal Shaheen",
    designation: "Director",
    image: "/image/Director of FHMC.jpg",
    qualification: "Senior Management & Administration",
  },
  {
    id: "principal",
    name: "Dr. Fakhar",
    designation: "Principal",
    image: "/image/principal.jpg",
    qualification: "BHMS, MSc, PhD",
  },
  {
    id: "3",
    name: "Dr. Sarah Khan",
    designation: "Vice Principal",
    image: "/image/Gallery 3.jpg",
    qualification: "BHMS, M.Phil",
  },
  {
    id: "4",
    name: "Mr. Ahmed Shah",
    designation: "Registrar",
    image: "/image/Gallery 4.jpg",
    qualification: "MA, M.Ed",
  },
  {
    id: "5",
    name: "Head of Department",
    designation: "HOD",
    image: "/image/HOD.jpg",
    qualification: "BHMS, PhD",
  },
  {
    id: "6",
    name: "General Staff Team",
    designation: "Administration & Support",
    image: "/image/Gallery 1.jpg",
    qualification: "Coordinated Medical Support Staff",
  },
];

export const HERO_IMAGE = "/image/hero.jpg";
export const HERO_IMAGES = [
  "/image/hero.jpg",
  "/image/Gallery 4.jpg",
  "/image/Gallery 1.jpg",
  "/image/Gallery 3.jpg",
  "/image/Gallery 5.jpg"
];

export const LOGO_IMAGE = "/image/official-logo.png";

// Regulatory Information
export const HERA_REG_NO = "322";
export const KMU_AFFILIATED_SINCE = "2015";

// Contact Information
export const CONTACT_PHONES = [
  "+92 332 9585893",
  "091-5816613",
  "091-5816614",
  "091-5892745"
];

export const CONTACT_EMAILS = [
  "fhmc.edu@gmail.com",
  "info@fhmc.edu.pk"
];

export const COLLEGE_ADDRESS = "15-B, Phase 5, Hayatabad, Peshawar, Khyber Pakhtunkhwa, Pakistan – 25000";

export const GALLERY_IMAGES = [
  "/image/hero.jpg",
  "/image/Gallery 1.jpg",
  "/image/Gallery 3.jpg",
  "/image/Gallery 4.jpg",
  "/image/Gallery 5.jpg",
  "/image/Gallery 6.jpg",
  "/image/Gallery 7.jpg",
  "/image/484376044_1070203021790720_2469244357359537740_n.jpg",
  "/image/485806576_1077549777722711_7770445915740036968_n.jpg",
  "/image/486097591_1077548594389496_3370746818051149490_n.jpg",
  "/image/557832328_1234482625362758_479546865224831958_n.jpg",
  "/image/558257599_1234482742029413_354682217562667196_n.jpg",
  "/image/633317685_1345235134287506_5634700305805555986_n.jpg",
  "/image/633453887_1345236234287396_9016429953369279717_n.jpg",
  "/image/645936302_1361993222611697_5871025219780972448_n.jpg",
  "/image/646037952_1361993262611693_7580584875219610477_n.jpg",
  "/image/logo-sign.jpg",
  "/image/principal.jpg",
];
