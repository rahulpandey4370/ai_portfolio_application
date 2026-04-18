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
  startDate: string;
  endDate?: string;
  description: string;
  techStack?: string[];
  imageUrl?: string;
  skillsGained?: string[];
  notableProjects?: string[];
}

export type ProjectCategory = 'company' | 'personal';

export interface ProjectEntry {
  id: string;
  title: string;
  category: ProjectCategory;
  isLatest?: boolean;
  timeline?: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  imageUrl: string;
  dataAiHint: string;
  liveLink?: string;
  repoLink?: string;
}

export interface SkillEntry {
  name: string;
  section: 'Core Skills' | 'Additional Skills';
  subsection: string;
  level: 'high' | 'medium' | 'low';
  iconName?: string;
  imageUrl?: string;
}

export interface ArticleEntry {
  id: string;
  title: string;
  link: string;
  source: string;
  description: string;
  iconName?: string;
}

export interface YouTubeVideoEntry {
  id: string;
  title: string;
  embedId: string;
  description: string;
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
  skills: SkillEntry[];
  projects: ProjectEntry[];
  articles: ArticleEntry[];
  youtubeVideos: YouTubeVideoEntry[];
}

export const portfolioData: PortfolioData = {
  name: 'Rahul Ranjan Pandey',
  role: 'AI/ML Engineer & Product Developer',
  contact: {
    email: 'rahul.ranjan.pandey.4370@gmail.com',
    linkedin: 'https://www.linkedin.com/in/rahul-ranjan-pandey-0a13b0116/',
    github: 'https://github.com/rahul-pandey-ct',
  },
  hero: {
    title: "Hi, I'm Rahul Ranjan Pandey",
    subtitle:
      'AI/ML engineer building enterprise GenAI systems, agentic modernization workflows, and production-ready AI experiences.',
    cta: 'Explore My Work',
  },
  summary:
    'AI/ML Engineer and Product Developer with 4+ years of experience building enterprise AI systems, agentic workflows, and data-driven products. I currently work at Epicor Software Corporation on real-time AI interview systems, generative AI modernization programs, and agentic legacy transformation initiatives, with hands-on delivery across Azure infrastructure, Next.js applications, context-aware AI pipelines, and safe enterprise-grade orchestration.',
  education: [
    {
      institution: 'SJB Institute of Technology, Bengaluru, India',
      degree: 'Bachelor of Engineering in Information Science and Engineering',
      period: '2018 - 2022',
      details: 'CGPA: 9.1',
    },
    {
      institution: 'Mount Assisi School, India',
      degree: 'Higher Secondary (ISE Class XII) & Secondary (ICSE Class X)',
      period: 'Secondary: 2015-2016, Higher Secondary: 2017-2018',
      details: 'ISE (Class XII) Percentage: 74. ICSE (Class X) Percentage: 87.1',
    },
  ],
  experience: [
    {
      company: 'Epicor Software Corporation',
      role: 'Product Developer [AI/ML]',
      period: 'May 2025 - Present',
      startDate: '2025-05-19',
      description:
        'Building enterprise AI products focused on real-time screening workflows, generative modernization, and large-scale legacy transformation. My work spans AI application delivery, safe orchestration patterns, Azure-first deployments, and shipping production user experiences in Next.js.',
      techStack: [
        'GenAI',
        'Agentic AI',
        'Azure',
        'Realtime AI',
        'Context Engineering',
      ],
      imageUrl: '/logo.jpg',
      skillsGained: [
        'Realtime voice AI',
        'Azure AI delivery',
        'Agentic workflow design',
        'Enterprise-safe LLM orchestration',
        'Context engineering',
        'Next.js product development',
      ],
      notableProjects: [
        'AI voice screening platform for short-form internal technical interviews',
        'Generative AI workflow for ERP customization modernization',
        'Agentic legacy ERP migration pipeline targeting partial automated code conversion',
      ],
    },
    {
      company: 'Y MEDIA LABS PVT. LTD. (Now Code and Theory)',
      role: 'Software Engineer [AI/ML]',
      period: 'August 2022 - May 2025',
      startDate: '2022-08-16',
      endDate: '2025-05-16',
      description:
        'Developed tailored AI/ML models to solve client-specific problems, built analytics and ETL pipelines, and helped productionize data products on AWS and GCP. Delivered measurable gains in operational efficiency, faster processing, and stronger collaboration across engineering and product teams.',
      techStack: ['AI/ML', 'Python', 'ETL', 'Hadoop', 'Hive', 'Spark', 'AWS', 'GCP', 'Data Analytics'],
      imageUrl: '/code_and_theory_logo.jpg',
      skillsGained: [
        'Client-facing AI delivery',
        'ETL engineering',
        'Cloud ML deployment',
        'Spark-based data processing',
        'Cross-functional product execution',
      ],
      notableProjects: [
        'Tailored AI and analytics solutions for client workflows',
        'Scalable ETL pipelines for high-volume data processing',
        'Productionized ML systems with cloud-backed ingestion and reporting',
      ],
    },
    {
      company: 'Automation Anywhere',
      role: 'Software Engineer Intern',
      period: 'March 2022 - August 2022',
      startDate: '2022-03-01',
      endDate: '2022-08-01',
      description:
        'Supported backend engineering efforts across cloud migration and testing workflows, helping improve reliability for internal systems and release readiness.',
      techStack: ['Cloud Migration', 'Application Testing', 'Backend Support'],
      imageUrl: '/automation.png',
      skillsGained: [
        'Enterprise software foundations',
        'Cloud migration support',
        'Release validation',
        'Testing discipline',
      ],
      notableProjects: [
        'Cloud migration support initiatives',
        'Application testing and validation workflows',
      ],
    },
  ],
  skills: [
    { name: 'Machine Learning', section: 'Core Skills', subsection: 'AI & ML Systems', level: 'high', iconName: 'BrainCircuit' },
    { name: 'Deep Learning', section: 'Core Skills', subsection: 'AI & ML Systems', level: 'high', iconName: 'Layers3' },
    { name: 'GenAI', section: 'Core Skills', subsection: 'AI & ML Systems', level: 'high', iconName: 'Bot' },
    { name: 'LLMs', section: 'Core Skills', subsection: 'AI & ML Systems', level: 'high', iconName: 'MessageSquareText', imageUrl: '/LLM.png' },
    { name: 'Agentic AI', section: 'Core Skills', subsection: 'AI & ML Systems', level: 'high', iconName: 'Bot' },
    { name: 'Multi-Agent Systems', section: 'Core Skills', subsection: 'AI & ML Systems', level: 'medium', iconName: 'GitFork' },
    { name: 'Context Engineering', section: 'Core Skills', subsection: 'AI & ML Systems', level: 'high', iconName: 'Workflow' },
    { name: 'Embedding Models', section: 'Core Skills', subsection: 'AI & ML Systems', level: 'medium', iconName: 'Network' },
    { name: 'RAG Systems', section: 'Core Skills', subsection: 'AI & ML Systems', level: 'high', iconName: 'LibraryBig' },
    { name: 'Realtime AI', section: 'Core Skills', subsection: 'AI & ML Systems', level: 'high', iconName: 'Radio' },
    { name: 'Voice AI', section: 'Core Skills', subsection: 'AI & ML Systems', level: 'medium', iconName: 'Mic' },
    { name: 'Prompt Engineering', section: 'Core Skills', subsection: 'AI & ML Systems', level: 'high', iconName: 'MessageSquareText' },
    { name: 'LLM Orchestration', section: 'Core Skills', subsection: 'AI & ML Systems', level: 'high', iconName: 'Workflow' },
    { name: 'LLM Evaluation', section: 'Core Skills', subsection: 'AI & ML Systems', level: 'medium', iconName: 'BarChart3' },
    { name: 'Recommendation Systems', section: 'Core Skills', subsection: 'AI & ML Systems', level: 'medium', iconName: 'Network' },
    { name: 'NLP', section: 'Core Skills', subsection: 'AI & ML Systems', level: 'medium', iconName: 'Text' },

    { name: 'Python', section: 'Core Skills', subsection: 'Python & AI Frameworks', level: 'high', imageUrl: '/python.png', iconName: 'Code2' },
    { name: 'PyTorch', section: 'Core Skills', subsection: 'Python & AI Frameworks', level: 'medium', iconName: 'Network', imageUrl: '/pytorch_logo.png' },
    { name: 'scikit-learn', section: 'Core Skills', subsection: 'Python & AI Frameworks', level: 'medium', iconName: 'BrainCircuit' },
    { name: 'Transformers', section: 'Core Skills', subsection: 'Python & AI Frameworks', level: 'medium', iconName: 'Bot' },
    { name: 'LlamaIndex', section: 'Core Skills', subsection: 'Python & AI Frameworks', level: 'medium', iconName: 'LibraryBig' },
    { name: 'LangChain', section: 'Core Skills', subsection: 'Python & AI Frameworks', level: 'medium', iconName: 'Link2', imageUrl: '/langchain_logo.png' },
    { name: 'FastAPI', section: 'Core Skills', subsection: 'Python & AI Frameworks', level: 'medium', iconName: 'Waypoints' },
    { name: 'Streamlit', section: 'Core Skills', subsection: 'Python & AI Frameworks', level: 'medium', iconName: 'PanelsTopLeft' },
    { name: 'Pandas', section: 'Core Skills', subsection: 'Python & AI Frameworks', level: 'medium', iconName: 'Table2', imageUrl: '/pandas_logo.svg' },
    { name: 'NumPy', section: 'Core Skills', subsection: 'Python & AI Frameworks', level: 'medium', iconName: 'SigmaSquare', imageUrl: '/numpy_logo.png' },
    { name: 'Matplotlib', section: 'Core Skills', subsection: 'Python & AI Frameworks', level: 'medium', iconName: 'AreaChart' },

    { name: 'Azure', section: 'Core Skills', subsection: 'Cloud & AI Platforms', level: 'high', iconName: 'Cloud' },
    { name: 'Azure VM', section: 'Core Skills', subsection: 'Cloud & AI Platforms', level: 'medium', iconName: 'ServerCog' },
    { name: 'Azure Blob Storage', section: 'Core Skills', subsection: 'Cloud & AI Platforms', level: 'medium', iconName: 'Archive' },
    { name: 'Azure AI Foundry', section: 'Core Skills', subsection: 'Cloud & AI Platforms', level: 'medium', iconName: 'BrainCircuit' },
    { name: 'Azure OpenAI', section: 'Core Skills', subsection: 'Cloud & AI Platforms', level: 'medium', iconName: 'MessageSquareText' },
    { name: 'Cosmos DB', section: 'Core Skills', subsection: 'Cloud & AI Platforms', level: 'medium', iconName: 'Database' },
    { name: 'AWS', section: 'Core Skills', subsection: 'Cloud & AI Platforms', level: 'medium', iconName: 'Cloud' },
    { name: 'GCP', section: 'Core Skills', subsection: 'Cloud & AI Platforms', level: 'medium', iconName: 'CloudCog', imageUrl: '/GCP_logo.jpg' },
    { name: 'Databricks', section: 'Core Skills', subsection: 'Cloud & AI Platforms', level: 'medium', iconName: 'Boxes' },
    { name: 'BigQuery', section: 'Core Skills', subsection: 'Cloud & AI Platforms', level: 'medium', iconName: 'Database' },

    { name: 'Codex', section: 'Core Skills', subsection: 'AI Tools & Coding Agents', level: 'high', iconName: 'Sparkles' },
    { name: 'Claude Code', section: 'Core Skills', subsection: 'AI Tools & Coding Agents', level: 'high', iconName: 'Bot' },
    { name: 'GitHub Copilot SDK', section: 'Core Skills', subsection: 'AI Tools & Coding Agents', level: 'high', iconName: 'GitFork' },
    { name: 'GitHub Copilot', section: 'Core Skills', subsection: 'AI Tools & Coding Agents', level: 'high', iconName: 'Github' },
    { name: 'OpenCode', section: 'Core Skills', subsection: 'AI Tools & Coding Agents', level: 'medium', iconName: 'Code2' },
    { name: 'Deep Agents', section: 'Core Skills', subsection: 'AI Tools & Coding Agents', level: 'medium', iconName: 'Workflow' },
    { name: 'AI-Assisted Development', section: 'Core Skills', subsection: 'AI Tools & Coding Agents', level: 'high', iconName: 'WandSparkles' },

    { name: 'SQL', section: 'Core Skills', subsection: 'Data Engineering & Systems', level: 'high', iconName: 'Database', imageUrl: '/sql_logo.png' },
    { name: 'ETL Pipelines', section: 'Core Skills', subsection: 'Data Engineering & Systems', level: 'high', iconName: 'Workflow' },
    { name: 'Data Warehousing', section: 'Core Skills', subsection: 'Data Engineering & Systems', level: 'medium', iconName: 'Archive' },
    { name: 'Spark', section: 'Core Skills', subsection: 'Data Engineering & Systems', level: 'medium', iconName: 'Sparkles', imageUrl: '/Apache_Spark_logo.png' },
    { name: 'PySpark', section: 'Core Skills', subsection: 'Data Engineering & Systems', level: 'medium', iconName: 'Sparkles' },
    { name: 'Hadoop', section: 'Core Skills', subsection: 'Data Engineering & Systems', level: 'medium', iconName: 'ServerCog' },
    { name: 'Hive', section: 'Core Skills', subsection: 'Data Engineering & Systems', level: 'medium', iconName: 'DatabaseZap' },
    { name: 'Docker', section: 'Core Skills', subsection: 'Data Engineering & Systems', level: 'medium', iconName: 'Container' },
    { name: 'REST APIs', section: 'Core Skills', subsection: 'Data Engineering & Systems', level: 'medium', iconName: 'Waypoints' },
    { name: 'Web Scraping', section: 'Core Skills', subsection: 'Data Engineering & Systems', level: 'medium', iconName: 'Globe' },

    { name: 'TypeScript', section: 'Additional Skills', subsection: 'Frontend & Product Engineering', level: 'high', iconName: 'Code2' },
    { name: 'React', section: 'Additional Skills', subsection: 'Frontend & Product Engineering', level: 'high', iconName: 'Code2' },
    { name: 'Next.js 15', section: 'Additional Skills', subsection: 'Frontend & Product Engineering', level: 'high', iconName: 'AppWindow' },
    { name: 'UI Development', section: 'Additional Skills', subsection: 'Frontend & Product Engineering', level: 'medium', iconName: 'MonitorSmartphone' },
    { name: 'Tailwind CSS', section: 'Additional Skills', subsection: 'Frontend & Product Engineering', level: 'medium', iconName: 'Palette' },

    { name: 'Git', section: 'Additional Skills', subsection: 'Workflow & Collaboration', level: 'high', iconName: 'GitFork', imageUrl: '/git_logo.png' },

    { name: 'Agile Delivery', section: 'Additional Skills', subsection: 'Workflow & Collaboration', level: 'medium', iconName: 'IterationCcw', imageUrl: '/agile_logo.png' },
    { name: 'Stakeholder Communication', section: 'Additional Skills', subsection: 'Workflow & Collaboration', level: 'high', iconName: 'MessagesSquare' },
    { name: 'Cross-Functional Delivery', section: 'Additional Skills', subsection: 'Workflow & Collaboration', level: 'high', iconName: 'Workflow' },
    { name: 'Product Thinking', section: 'Additional Skills', subsection: 'Workflow & Collaboration', level: 'medium', iconName: 'Lightbulb' },

    { name: 'Leadership', section: 'Additional Skills', subsection: 'Soft Skills', level: 'high', iconName: 'Users' },
    { name: 'Communication', section: 'Additional Skills', subsection: 'Soft Skills', level: 'high', iconName: 'MessageCircle' },
    { name: 'Teamwork', section: 'Additional Skills', subsection: 'Soft Skills', level: 'high', iconName: 'UsersRound' },
    { name: 'Critical Thinking', section: 'Additional Skills', subsection: 'Soft Skills', level: 'medium', iconName: 'Brain' },
    { name: 'Adaptability', section: 'Additional Skills', subsection: 'Soft Skills', level: 'medium', iconName: 'RefreshCcwDot' },
    { name: 'Problem Solving', section: 'Additional Skills', subsection: 'Soft Skills', level: 'high', iconName: 'Puzzle' },
    { name: 'Ownership', section: 'Additional Skills', subsection: 'Soft Skills', level: 'high', iconName: 'ShieldCheck' },
  ],
  projects: [
    {
      id: 'company-project-1',
      title: 'AI Voice Interview Screening Platform',
      category: 'company',
      isLatest: true,
      timeline: '2025',
      description:
        'A real-time voice screening application for short internal technical interviews that reduced manual reviewer effort during early-stage hiring.',
      longDescription:
        'Built a public-safe, real-time AI voice screening platform for 15-minute technical interviews used in internal hiring workflows. The system combined a frontier voice model, structured interview orchestration, Azure deployment infrastructure, and a Next.js 15 interface to reduce engineering time spent on low-conversion screening loops while keeping evaluations more consistent.',
      techStack: ['Realtime AI', 'Voice AI', 'Next.js 15', 'Azure', 'LLMs', 'Evaluation Design'],
      imageUrl: '/ai-interview-project.webp',
      dataAiHint: 'voice interview AI',
    },
    {
      id: 'company-project-2',
      title: 'Generative AI ERP Modernization Assistant',
      category: 'company',
      isLatest: true,
      timeline: '2025-2026',
      description:
        'A generative AI workflow that accelerated modernization of older ERP customizations into newer platform patterns with safer enterprise orchestration.',
      longDescription:
        'Worked on a generative AI modernization workflow that helped migrate older ERP customizations to newer platform patterns using frontier models and an internal enterprise-safe AI framework. The solution focused on reducing customer effort, shortening modernization timelines, and improving confidence in upgrade-related transformation tasks while handling sensitive business data responsibly.',
      techStack: ['GenAI', 'LLM Orchestration', 'Azure', 'Enterprise AI', 'Modernization'],
      imageUrl: '/erp-project.webp',
      dataAiHint: 'ERP modernization AI',
    },
    {
      id: 'company-project-3',
      title: 'Agentic Legacy ERP Migration to .NET',
      category: 'company',
      isLatest: true,
      timeline: '2026',
      description:
        'An agentic migration pipeline designed to convert large legacy ERP logic into .NET with substantial AI-assisted coverage before manual completion.',
      longDescription:
        'Contributed to an agentic migration initiative for a large legacy ERP codebase written across COBOL, C, copybooks, subroutines, and complex database operations. The goal was to automate a significant portion of the migration to .NET through GitHub Copilot SDK-based agent workflows and frontier reasoning models, allowing engineers to focus on the remaining high-complexity manual refinement.',
      techStack: ['Agentic AI', 'Legacy Modernization', 'GitHub Copilot SDK', '.NET', 'COBOL Migration', 'Context Engineering'],
      imageUrl: '/legacy-modernisation-project.jpg',
      dataAiHint: 'legacy migration',
    },
    {
      id: 'company-project-4',
      title: 'Agentic GenAI-Powered Knowledge Base & Evaluation Framework',
      category: 'company',
      timeline: '2025',
      description:
        'Smart RAG-based knowledge assistant with specialized agentic modules and a GenAI evaluation framework.',
      longDescription:
        'Built a smart RAG-based knowledge assistant that ingests data from APIs and web sources, followed by ETL and ingestion into a knowledge system with retrieval boosting. Developed specialized agentic modules for search, relevance, and response processing, then designed a GenAI evaluation framework using BLEU, ROUGE, and LLM-as-a-judge methods.',
      techStack: ['GenAI', 'RAG', 'Vector DB', 'TF-IDF', 'ETL', 'Python', 'APIs', 'Web Scraping', 'BLEU', 'ROUGE', 'LLM-as-a-judge'],
      imageUrl: '/agentic.png',
      dataAiHint: 'AI knowledge',
    },
    {
      id: 'company-project-5',
      title: 'AI-Driven Universal Web Scraper for User Insights',
      category: 'company',
      timeline: '2024-2025',
      description:
        'AI-powered web scraper with an ETL pipeline for scalable data warehousing and user insights.',
      longDescription:
        'Developed an AI-powered web scraper to extract structured data and built an ETL pipeline using Databricks, Spark, Hadoop, and Hive for scalable warehousing and analysis. Delivered user segmentation and sentiment analysis outputs for actionable insights.',
      techStack: ['AI', 'Web Scraping', 'ETL', 'Databricks', 'Spark', 'Hadoop', 'Hive', 'PySpark', 'User Segmentation', 'Sentiment Analysis'],
      imageUrl: '/scraper.png',
      dataAiHint: 'data extraction',
    },
    {
      id: 'company-project-6',
      title: 'Event Recommendation System with High-Accuracy Personalization',
      category: 'company',
      timeline: '2025',
      description:
        'Recommendation engine for event suggestions achieving 95% accuracy through advanced ML techniques.',
      longDescription:
        'Built a recommendation engine for event suggestions based on user interests using similarity metrics, clustering, and collaborative filtering techniques to improve personalization quality.',
      techStack: ['Recommendation Systems', 'Machine Learning', 'Python', 'Collaborative Filtering', 'Clustering', 'Similarity Metrics'],
      imageUrl: '/recommendation.png',
      dataAiHint: 'event algorithm',
    },
    {
      id: 'company-project-7',
      title: 'Customized LLM for Client-Specific Summarization and Recommendations',
      category: 'company',
      timeline: '2024',
      description:
        'Custom LLM solution for summarization, email generation, and recommendations from conversation data.',
      longDescription:
        'Developed a custom LLM solution to provide client-specific summaries, email generation, and resource recommendations based on conversation data. Implemented data cleaning, feature engineering, and context-limiting using LlamaIndex.',
      techStack: ['LLM', 'LlamaIndex', 'NLP', 'Python', 'Data Cleaning', 'Feature Engineering'],
      imageUrl: '/LLM.png',
      dataAiHint: 'AI text',
    },
    {
      id: 'company-project-8',
      title: 'Real-Time Anomaly Detection Engine for Streaming Data',
      category: 'company',
      timeline: '2023-2024',
      description:
        'AI-powered system for identifying anomalies in real-time data streams using advanced ML models on GCP.',
      longDescription:
        'Developed a scalable anomaly detection engine for processing high-velocity streaming data. Leveraged Kafka for data ingestion, Spark Streaming for real-time processing, and a suite of unsupervised machine learning models deployed on Google Cloud Platform.',
      techStack: ['GCP', 'Kafka', 'Spark Streaming', 'Python', 'Machine Learning', 'Anomaly Detection', 'Docker', 'BigQuery'],
      imageUrl: '/realtime.png',
      dataAiHint: 'data stream',
    },
    {
      id: 'company-project-9',
      title: 'AI-Assisted Code Documentation Generator',
      category: 'company',
      timeline: '2024-2025',
      description:
        'GenAI tool to automatically generate comprehensive documentation for Python codebases.',
      longDescription:
        'Created an intelligent documentation tool that uses LLMs to analyze Python code and generate docstrings, README sections, and usage examples, reducing documentation effort while improving consistency.',
      techStack: ['GenAI', 'LLM', 'Python', 'NLP', 'Fine-tuning', 'Git', 'Streamlit', 'Docker'],
      imageUrl: '/docgenerater.png',
      dataAiHint: 'AI code',
    },
  ],
  articles: [
    {
      id: 'article1',
      title: 'A Survey on Evaluation of Large Language Models',
      link: 'https://arxiv.org/abs/2307.03109',
      source: 'ArXiv (2307.03109)',
      description: 'A comprehensive survey on the methodologies and metrics for evaluating Large Language Models.',
      iconName: 'FileText',
    },
    {
      id: 'article2',
      title: 'Science in the Age of AI',
      link: 'https://www.quantamagazine.org/series/science-in-the-age-of-ai/',
      source: 'Quanta Magazine',
      description: 'An insightful series exploring the impact and future of Artificial Intelligence in scientific discovery.',
      iconName: 'Atom',
    },
    {
      id: 'article3',
      title: 'Foundation Model for Personalized Recommendation',
      link: 'https://netflixtechblog.com/foundation-model-for-personalized-recommendation-1a0bd8e02d39',
      source: 'Netflix TechBlog',
      description: 'Exploring how Netflix leverages foundation models to enhance personalized recommendations.',
      iconName: 'Network',
    },
  ],
  youtubeVideos: [
    {
      id: 'video1',
      title: 'Google Firebase Studio In 23 Minutes',
      embedId: 'Rd6F5wHIysM',
      description:
        'A visual and intuitive explanation of Google Firebase Studio, including its features, pros and cons, and how it can be used to build applications quickly.',
    },
    {
      id: 'video2',
      title: 'Building AI Agents in 2025 for Beginners!',
      embedId: 'ZbIVOy_GPyQ',
      description:
        'A beginner-friendly walkthrough for getting started with agentic AI workflows and practical automation patterns.',
    },
  ],
};
