
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
  role: "AI/ML & Data Engineer",
  contact: {
    email: "rahul.ranjan.pandey.4370@gmail.com",
    linkedin: "https://linkedin.com/in/rahul-ranjan-pandey-0a13b0116/",
    github: "https://github.com/rahulrpandey", // Kept existing as not provided in resume
  },
  hero: {
    title: "Hi, I'm Rahul Ranjan Pandey",
    subtitle: "AI/ML & Data Engineer passionate about developing advanced machine learning models and AI solutions.",
    cta: "Explore My Work",
  },
  summary: "Driven AI/ML & Data Engineer with over 2 years of experience, primarily focused on developing and deploying advanced machine learning models, AI solutions, and generative AI applications on cloud platforms such as AWS and GCP. Skilled in designing scalable data pipelines and robust ETL processes using Hadoop, Hive, Databricks and Spark to support high-impact AI initiatives, ensuring data security, compliance, and tailored, client-specific innovations.",
  education: [
    {
      institution: "SJB Institute of Technology, Bengaluru, India",
      degree: "Bachelor of Engineering in Information Science and Engineering",
      period: "2018 - 2022",
      details: "CGPA: 9.1"
    },
    {
      institution: "Mount Assisi School, India",
      degree: "Higher Secondary (ISE Class XII) & Secondary (ICSE Class X)",
      period: "Secondary: 2015-2016, Higher Secondary: 2017-2018",
      details: "ISE (Class XII) Percentage: 74. ICSE (Class X) Percentage: 87.1"
    }
  ],
  experience: [
    {
      company: "Y MEDIA LABS PVT. LTD. (Now Code and Theory)",
      role: "Software Engineer [AI/ML]",
      period: "August 2022 - Present",
      description: "Developed tailored AI/ML models to address unique client requirements, delivering data-driven solutions that boosted operational efficiency by 35%. Integrated targeted data analytics and streamlined ETL processes using Hadoop, Hive, and Spark, while leveraging AWS and GCP cloud services to optimize data ingestion and enhance model performance, resulting in a 25% reduction in processing time. Collaborated with cross-functional teams to integrate advanced analytics and machine learning insights into robust production systems. SOP Award recipient for exceptional contributions and earned multiple KUDOS for outstanding teamwork and proactive problem-solving.",
      techStack: ["AI/ML", "Python", "ETL", "Hadoop", "Hive", "Spark", "AWS", "GCP", "Data Analytics"]
    },
    {
      company: "Automation Anywhere",
      role: "Software Engineer Intern",
      period: "March 2022 - August 2022",
      description: "Assisted in cloud migration and application testing to support efficient backend processes.",
      techStack: ["Cloud Migration", "Application Testing"]
    }
  ],
  skills: [
    "Python", "SQL", "ETL Pipeline Development", "Data Warehousing", "Hadoop", "Spark", "Hive",
    "Machine Learning", "Deep Learning", "GenAI", "LLMs", "AWS", "Databricks", "GCP", "PyTorch",
    "LlamaIndex", "Langchain", "Data Analytics", "Pandas", "Numpy", "Matplotlib", "AI Tools", "Git", "Agile",
    "Leadership", "Communication", "Teamwork", "Critical Thinking", "Creativity", "Adaptability"
  ],
  projects: [
    {
      id: "project1",
      title: "Agentic GenAI-Powered Knowledge Base & Evaluation Framework",
      description: "Smart RAG-based knowledge assistant with specialized agentic modules and a GenAI evaluation framework.",
      longDescription: "Built a smart RAG-based knowledge assistant that ingests data from Workfront, HubSpot, APIs, and web scraping, followed by ETL and ingestion into a vector DB with TF-IDF boosted retrieval. Developed specialized agentic modules (search agent, relevance agent, processing agent) to improve context retrieval, response accuracy, and overall efficiency of the RAG system. Designed and implemented a GenAI evaluation framework, combining BLEU, ROUGE, and LLM-as-a-judge methods to assess model outputs on correctness, relevance, instruction-following, and QA performance.",
      techStack: ["GenAI", "RAG", "Vector DB", "TF-IDF", "ETL", "Python", "APIs", "Web Scraping", "BLEU", "ROUGE", "LLM-as-a-judge"],
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "knowledge base",
      // liveLink: "#", // Add if available
      // repoLink: "#" // Add if available
    },
    {
      id: "project2",
      title: "AI-Driven Universal Web Scraper for User Insights",
      description: "AI-powered web scraper with an ETL pipeline for scalable data warehousing and user insights.",
      longDescription: "Developed an AI-powered web scraper to extract structured data. Built an ETL pipeline using Databricks (Spark), Hadoop, and Hive for scalable data warehousing and analysis, reducing processing time by 25%. Leveraged PySpark notebooks in Databricks for seamless data transformation and monitoring. Delivered user segmentation and sentiment analysis for actionable insights.",
      techStack: ["AI", "Web Scraping", "ETL", "Databricks", "Spark", "Hadoop", "Hive", "PySpark", "User Segmentation", "Sentiment Analysis"],
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "web scraper",
      // liveLink: "#",
      // repoLink: "#"
    },
    {
      id: "project3",
      title: "Event Recommendation System with High-Accuracy Personalization",
      description: "Recommendation engine for event suggestions achieving 95% accuracy through advanced ML techniques.",
      longDescription: "Built a recommendation engine for event suggestions based on user interests, achieving an accuracy rate of 95%. Experimented with similarity metrics, clustering, and collaborative filtering techniques, achieving a 15% improvement in personalization accuracy.",
      techStack: ["Recommendation Systems", "Machine Learning", "Python", "Collaborative Filtering", "Clustering", "Similarity Metrics"],
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "recommendation engine",
      // liveLink: "#",
      // repoLink: "#"
    },
    {
      id: "project4",
      title: "Customized LLM for Client-Specific Summarization and Recommendations",
      description: "Custom LLM solution for summarization, email generation, and recommendations from conversation data.",
      longDescription: "Developed a custom LLM solution to provide client-specific summaries, email generation, and resource recommendations based on conversation data. Implemented data cleaning, feature engineering, and context-limiting using LlamaIndex.",
      techStack: ["LLM", "LlamaIndex", "NLP", "Python", "Data Cleaning", "Feature Engineering"],
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "custom llm",
      // liveLink: "#",
      // repoLink: "#"
    }
  ]
};
