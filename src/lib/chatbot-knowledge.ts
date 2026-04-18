import { portfolioData, type ExperienceEntry, type ProjectEntry } from '@/lib/data';

interface ChatHistoryItem {
  sender: 'user' | 'bot';
  text: string;
}

export interface ChatbotKnowledgeSection {
  id: string;
  title: string;
  topic: string;
  tags: string[];
  aliases: string[];
  content: string;
}

const stopWords = new Set([
  'a',
  'about',
  'an',
  'and',
  'are',
  'can',
  'current',
  'for',
  'from',
  'have',
  'how',
  'i',
  'in',
  'is',
  'me',
  'of',
  'on',
  'or',
  'tell',
  'the',
  'to',
  'what',
  'with',
  'you',
  'your',
]);

function buildExperienceSection(experience: ExperienceEntry): ChatbotKnowledgeSection {
  return {
    id: `experience-${experience.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title: `${experience.company} Experience`,
    topic: 'experience',
    tags: [
      'experience',
      'work',
      'career',
      'company',
      experience.company.toLowerCase(),
      experience.role.toLowerCase(),
      ...(experience.techStack ?? []).map((tech) => tech.toLowerCase()),
      ...(experience.skillsGained ?? []).map((skill) => skill.toLowerCase()),
    ],
    aliases: [
      experience.company.toLowerCase(),
      experience.role.toLowerCase(),
      ...(experience.notableProjects ?? []).map((project) => project.toLowerCase()),
    ],
    content: [
      `Company: ${experience.company}`,
      `Role: ${experience.role}`,
      `Period: ${experience.period}`,
      `Summary: ${experience.description}`,
      experience.techStack?.length ? `Core technologies: ${experience.techStack.join(', ')}` : '',
      experience.skillsGained?.length ? `Skills gained: ${experience.skillsGained.join(', ')}` : '',
      experience.notableProjects?.length ? `Projects: ${experience.notableProjects.join(' | ')}` : '',
    ]
      .filter(Boolean)
      .join('\n'),
  };
}

function buildProjectSection(project: ProjectEntry): ChatbotKnowledgeSection {
  return {
    id: `project-${project.id}`,
    title: project.title,
    topic: project.category === 'company' ? 'company-project' : 'personal-project',
    tags: [
      'project',
      project.category,
      ...project.techStack.map((tech) => tech.toLowerCase()),
      ...project.title.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean),
    ],
    aliases: [project.title.toLowerCase(), ...project.techStack.map((tech) => tech.toLowerCase())],
    content: [
      `Project: ${project.title}`,
      `Category: ${project.category}`,
      project.timeline ? `Timeline: ${project.timeline}` : '',
      `Summary: ${project.description}`,
      project.longDescription ? `Details: ${project.longDescription}` : '',
      `Tech stack: ${project.techStack.join(', ')}`,
    ]
      .filter(Boolean)
      .join('\n'),
  };
}

export const chatbotKnowledgeBase: ChatbotKnowledgeSection[] = [
  {
    id: 'profile-snapshot',
    title: 'Profile Snapshot',
    topic: 'profile',
    tags: ['profile', 'summary', 'intro', 'about', 'experience', 'skills'],
    aliases: ['who are you', 'tell me about yourself', 'introduce yourself', 'profile summary'],
    content: [
      `Name: ${portfolioData.name}`,
      `Role: ${portfolioData.role}`,
      `Summary: ${portfolioData.summary}`,
      'Experience level: 4+ years across AI/ML, product engineering, and enterprise AI delivery.',
      `Current company: ${portfolioData.experience[0]?.company ?? 'N/A'}`,
    ].join('\n'),
  },
  {
    id: 'contact-and-links',
    title: 'Contact and Links',
    topic: 'contact',
    tags: ['contact', 'email', 'linkedin', 'github', 'links'],
    aliases: ['contact', 'linkedin', 'github', 'email', 'reach out'],
    content: [
      `Email: ${portfolioData.contact.email}`,
      `LinkedIn: ${portfolioData.contact.linkedin}`,
      `GitHub: ${portfolioData.contact.github}`,
    ].join('\n'),
  },
  {
    id: 'skills-overview',
    title: 'Skills Overview',
    topic: 'skills',
    tags: ['skills', 'tech stack', 'tools', 'azure', 'genai', 'agentic ai', 'next.js'],
    aliases: ['skills', 'tech stack', 'what tools do you use', 'what are you good at'],
    content: [
      'Primary strengths: Agentic AI, enterprise GenAI systems, context engineering, Azure-based AI delivery, Python AI frameworks, data engineering for AI systems, and agentic coding workflows.',
      `Core skills: ${portfolioData.skills
        .filter((skill) => skill.section === 'Core Skills')
        .map((skill) => skill.name)
        .join(', ')}`,
      `AI tools and coding agents: ${portfolioData.skills
        .filter((skill) => skill.subsection === 'AI Tools & Coding Agents')
        .map((skill) => skill.name)
        .join(', ')}`,
      `Additional skills: ${portfolioData.skills
        .filter((skill) => skill.section === 'Additional Skills')
        .map((skill) => skill.name)
        .join(', ')}`,
      `Soft skills: ${portfolioData.skills
        .filter((skill) => skill.subsection === 'Soft Skills')
        .map((skill) => skill.name)
        .join(', ')}`,
    ].join('\n'),
  },
  {
    id: 'education',
    title: 'Education',
    topic: 'education',
    tags: ['education', 'college', 'degree', 'school', 'cgpa'],
    aliases: ['education', 'college', 'degree', 'school', 'study'],
    content: portfolioData.education
      .map((entry) => `${entry.institution} | ${entry.degree} | ${entry.period}${entry.details ? ` | ${entry.details}` : ''}`)
      .join('\n'),
  },
  {
    id: 'public-demos',
    title: 'Public Demos',
    topic: 'public-projects',
    tags: ['demo', 'public project', 'live project', 'prompt pavilion', 'product pavilion', 'notora', 'finwise'],
    aliases: ['prompt pavilion', 'product pavilion', 'notora ai', 'finwise ai', 'live demo'],
    content: [
      'Company-related public projects: Prompt Pavilion, Product Pavilion 2025.',
      'Personal live projects: Notora AI, Finwise AI.',
    ].join('\n'),
  },
  ...portfolioData.experience.map(buildExperienceSection),
  ...portfolioData.projects.map(buildProjectSection),
];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function tokenize(text: string) {
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .split(/[^a-z0-9.+#-]+/)
        .map((token) => token.trim())
        .filter((token) => token.length > 1 && !stopWords.has(token))
    )
  );
}

function matchGlob(value: string, pattern: string) {
  const regexPattern = pattern
    .split('*')
    .map((segment) => escapeRegExp(segment))
    .join('.*');
  return new RegExp(`^${regexPattern}$`, 'i').test(value);
}

function countRegexMatches(text: string, pattern: string) {
  const matches = text.match(new RegExp(pattern, 'gi'));
  return matches ? matches.length : 0;
}

function scoreSection(section: ChatbotKnowledgeSection, searchText: string, tokens: string[]) {
  let score = 0;
  const normalizedTitle = section.title.toLowerCase();
  const normalizedTopic = section.topic.toLowerCase();
  const normalizedTags = section.tags.map((tag) => tag.toLowerCase());
  const normalizedAliases = section.aliases.map((alias) => alias.toLowerCase());
  const normalizedContent = section.content.toLowerCase();

  for (const alias of normalizedAliases) {
    const aliasPattern = `\\b${escapeRegExp(alias)}\\b`;
    score += countRegexMatches(searchText, aliasPattern) * 10;
  }

  for (const token of tokens) {
    const tokenPattern = `\\b${escapeRegExp(token)}\\b`;
    score += countRegexMatches(normalizedTitle, tokenPattern) * 8;
    score += countRegexMatches(normalizedTopic, tokenPattern) * 6;
    score += countRegexMatches(normalizedContent, tokenPattern) * 2;

    for (const tag of normalizedTags) {
      if (matchGlob(tag, `*${token}*`) || matchGlob(token, `*${tag}*`)) {
        score += 4;
      }
    }
  }

  if (score === 0 && section.topic === 'profile') {
    score = 1;
  }

  return score;
}

export function retrieveChatbotContext(query: string, chatHistory?: ChatHistoryItem[]) {
  const searchText = [query, ...(chatHistory ?? []).map((item) => item.text)].join(' ').toLowerCase();
  const tokens = tokenize(searchText);

  const rankedSections = chatbotKnowledgeBase
    .map((section) => ({
      section,
      score: scoreSection(section, searchText, tokens),
    }))
    .sort((left, right) => right.score - left.score);

  const selected = rankedSections
    .filter((entry) => entry.score > 0)
    .slice(0, 5)
    .map((entry) => entry.section);

  if (!selected.some((section) => section.id === 'profile-snapshot')) {
    selected.unshift(chatbotKnowledgeBase[0]);
  }

  return selected.slice(0, 5);
}

export function formatChatbotContext(sections: ChatbotKnowledgeSection[]) {
  return sections.map((section) => `[${section.title}]\n${section.content}`).join('\n\n');
}
