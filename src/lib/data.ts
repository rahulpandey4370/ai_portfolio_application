export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  details?: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  description: string;
  techStack?: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  longDescription?: string; // For project summarizer input
  techStack: string[];
  imageUrl: string;
  dataAiHint: string;
  liveLink?: string;
  repoLink?: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: string[];
  projects: ProjectEntry[];
}

export const portfolioData: PortfolioData = {
  name: "Rahul Ranjan Pandey",
  role: "Software Engineer & AI Enthusiast",
  contact: {
    email: "rahul.pandey@example.com",
    linkedin: "https://linkedin.com/in/rahulrpandey", // Full links
    github: "https://github.com/rahulrpandey",
  },
  hero: {
    title: "Hi, I'm Rahul Ranjan Pandey",
    subtitle: "A creative Software Engineer transforming ideas into reality with code and AI.",
    cta: "Explore My Work",
  },
  summary: "Innovative Software Engineer with experience in building scalable web applications using modern technologies. Passionate about AI and creating impactful user experiences.",
  education: [
    {
      institution: "Indian Institute of Technology (IIT), Delhi",
      degree: "Bachelor of Technology in Computer Science",
      period: "2018 - 2022",
      details: "Relevant coursework: Data Structures, Algorithms, Artificial Intelligence, Machine Learning, Web Development."
    }
  ],
  experience: [
    {
      company: "Google",
      role: "Software Engineer",
      period: "2022 - Present",
      description: "Developed and maintained key features for large-scale user-facing products, focusing on performance and user experience. Collaborated with cross-functional teams in an Agile environment to deliver high-quality software solutions. Worked extensively with React, Next.js, TypeScript, and various Google Cloud services.",
      techStack: ["React", "Next.js", "TypeScript", "Google Cloud", "Kubernetes"]
    },
    {
      company: "Amazon",
      role: "Software Development Intern",
      period: "Summer 2021",
      description: "Contributed to the development of internal AWS tools, improving developer productivity and deployment efficiency. Gained hands-on experience in cloud services, microservices architecture, and backend development using Java and Python.",
      techStack: ["Java", "Python", "AWS", "Microservices"]
    }
  ],
  skills: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Python", "Java", "Firebase", "Google Cloud Platform", "AWS", "Genkit", "AI/ML", "Tailwind CSS", "Docker", "Kubernetes"],
  projects: [
    {
      id: "project1",
      title: "AI Portfolio Website",
      description: "My personal portfolio, showcasing skills and projects with an AI chatbot.",
      longDescription: "A personal portfolio website built with Next.js, Tailwind CSS, and integrated with Gemini AI for a chatbot and project summarization. It features a responsive design, theme toggling, and dynamically displays resume information, experience, and projects. The AI chatbot, acting as myself, answers questions based on my resume and LinkedIn data.",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Genkit", "Gemini API"],
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "portfolio website",
      liveLink: "#",
      repoLink: "https://github.com/rahulrpandey/ai-portfolio"
    },
    {
      id: "project2",
      title: "Intelligent Document Analyzer",
      description: "An AI-powered tool to extract insights and summarize large documents.",
      longDescription: "An AI-powered application designed to process and analyze large textual documents. Users can upload documents, and the system uses Natural Language Processing (NLP) techniques via Gemini API to provide summaries, extract key entities, identify sentiment, and answer questions about the document content. Built with Python (Flask/FastAPI backend) and a React frontend.",
      techStack: ["Python", "Flask", "React", "NLP", "Gemini API", "Docker"],
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "document analysis",
      liveLink: "#",
      repoLink: "#"
    },
    {
      id: "project3",
      title: "Real-time Collaborative Whiteboard",
      description: "A web application for real-time collaborative drawing and brainstorming.",
      longDescription: "A web-based collaborative whiteboard application that allows multiple users to draw, write, and share ideas in real-time. Features include various drawing tools, text input, shape creation, and synchronized sessions using WebSockets and Firebase Realtime Database for low-latency updates. The interface is built with React and Konva.js for canvas interactions.",
      techStack: ["React", "Node.js", "WebSockets", "Firebase", "Konva.js"],
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "whiteboard collaboration",
      liveLink: "#",
      repoLink: "#"
    }
  ]
};
