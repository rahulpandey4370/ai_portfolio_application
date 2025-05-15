
'use server';

/**
 * @fileOverview An AI chatbot that answers questions based on Rahul's resume and LinkedIn data,
 * considering chat history for contextual responses.
 *
 * - aiChatbot - A function that handles the chatbot interaction.
 * - AIChatbotInput - The input type for the aiChatbot function.
 * - AIChatbotOutput - The return type for the aiChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatMessageSchema = z.object({
  sender: z.enum(['user', 'bot']),
  text: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const AIChatbotInputSchema = z.object({
  query: z.string().describe('The user query about Rahul.'),
  chatHistory: z.array(ChatMessageSchema).optional().describe('The last 5 messages in the conversation history, including the current user query if it was already added to history on the client.'),
});
export type AIChatbotInput = z.infer<typeof AIChatbotInputSchema>;

const AIChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type AIChatbotOutput = z.infer<typeof AIChatbotOutputSchema>;

export async function aiChatbot(input: AIChatbotInput): Promise<AIChatbotOutput> {
  return aiChatbotFlow(input);
}

const resumeData = `RAHUL RANJAN PANDEY
Bengaluru, India | rahul.ranjan.pandey.4370@gmail.com | +91-7631921588  | linkedin.com/in/rahul-ranjan-pandey-0a13b0116/

Profile
Driven AI/ML & Data Engineer with over 2 years of experience, primarily focused on developing and deploying advanced machine learning models, AI solutions, and generative AI applications on cloud platforms such as AWS and GCP. Skilled in designing scalable data pipelines and robust ETL processes using Hadoop, Hive, Databricks and Spark to support high-impact AI initiatives, ensuring data security, compliance, and tailored, client-specific innovations.
Skills

Technical Skills: Python | SQL | ETL Pipeline Development | Data Warehousing | Hadoop | Spark | Hive
Machine Learning & AI: Machine Learning | Deep Learning | GenAI | LLMs | AWS | Databricks | GCP | PyTorch | LlamaIndex | Langchain | Data Analytics (EDA using Pandas, Numpy, Matplotlib) | AI Tools | Git | Agile
Soft Skills: Leadership | Communication | Teamwork | Critical Thinking | Creativity | Adaptability
Work Experience


Y MEDIA LABS PVT. LTD. (Now Code and Theory) |  Software Engineer [AI/ML]			             Aug '22 - Current.
Developed tailored AI/ML models to address unique client requirements, delivering data-driven solutions that boosted operational efficiency by 35%.
Integrated targeted data analytics and streamlined ETL processes using Hadoop, Hive, and Spark, while leveraging AWS and GCP cloud services to optimize data ingestion and enhance model performance, resulting in a 25% reduction in processing time.
Collaborated with cross-functional teams to integrate advanced analytics and machine learning insights into robust production systems.

Automation Anywhere | Software Engineer Intern			 			        	Mar '22 - Aug '22
Assisted in cloud migration and application testing to support efficient backend processes.
Projects
Project 1: Agentic GenAI-Powered Knowledge Base & Evaluation Framework                                     Jan ’25 – May '25
Built a smart RAG-based knowledge assistant that ingests data from Workfront, HubSpot, APIs, and web scraping, followed by ETL and ingestion into a vector DB with TF-IDF boosted retrieval.
Developed specialized agentic modules (search agent, relevance agent, processing agent) to improve context retrieval, response accuracy, and overall efficiency of the RAG system.
Designed and implemented a GenAI evaluation framework, combining BLEU, ROUGE, and LLM-as-a-judge methods to assess model outputs on correctness, relevance, instruction-following, and QA performance.
Project 2: AI-Driven Universal Web Scraper for User Insights							     Sep ’24
Developed an AI-powered web scraper to extract structured data.
Built an ETL pipeline using Databricks (Spark), Hadoop, and Hive for scalable data warehousing and analysis, reducing processing time by 25%.
Leveraged PySpark notebooks in Databricks for seamless data transformation and monitoring.
Delivered user segmentation and sentiment analysis for actionable insights.
Project 3: Event Recommendation System with High-Accuracy Personalization				     Apr ’24
Built a recommendation engine for event suggestions based on user interests, achieving an accuracy rate of 95%.
Experimented with similarity metrics, clustering, and collaborative filtering techniques, achieving a 15% improvement in personalization accuracy.
Project 4: Customized LLM for Client-Specific Summarization and Recommendations		                  Nov ’23
Developed a custom LLM solution to provide client-specific summaries, email generation, and resource recommendations based on conversation data.
Implemented data cleaning, feature engineering, and context-limiting using LlamaIndex.



Education

SJB Institute of Technology, Bengaluru, India   		           	          				           2018 - 2022
Bachelor of Engineering in Information Science and Engineering | CGPA: 9.1
Mount Assisi School, India
ISE (Class XII), Percentage: 74 [2017 - 2018], ICSE (Class X), Percentage: 87.1 [2015 - 2016]

Languages

English | Hindi

Academic and Extracurricular Achievements

SOP Award recipient at Y MEDIA LABS PVT. LTD. (Now Code & Theory) for exceptional contributions to projects.
Earned multiple KUDOS for outstanding teamwork and proactive problem-solving.


Courses and Certifications

Machine Learning Specialization - Coursera, 2023
Deep Learning Specialization - Coursera, 2023
Python for Data Science - Udemy, 2022

Hobbies
Reading Books | Hiking | Playing Chess | Watching Sports (football, cricket, etc.)
`;

const linkedInData = `
Rahul Ranjan Pandey
Software Engineer at Y MEDIA LABS PVT. LTD. (Now Code and Theory)
Skills:
- Python
- SQL
- ETL
- Hadoop
- Spark
- Hive
- Machine Learning
- Deep Learning
- GenAI
- LLMs
- AWS
- GCP
Experience:
- Y MEDIA LABS PVT. LTD. (Now Code and Theory), 16th Aug 2022 - 16th May 2025
- Automation Anywhere, Mar 2022 - Aug 2022
Education
- SJB Institute of Technology, 2018-2022
`;

const shouldIncludeResumeInfo = ai.defineTool({
  name: 'shouldIncludeResumeInfo',
  description: "Decides whether to include resume information in the response. Call this tool if the user's current query, in the context of the conversation history, asks for general information, experience, education, skills, or projects that are typically found in a resume. The LLM should call this tool to determine if the context of the query warrants pulling details directly from the resume data.",
  inputSchema: z.object({
    query: z.string().describe('The current user query.'),
    chatHistory: z.array(ChatMessageSchema).optional().describe('The preceding conversation history for context.'),
  }),
  outputSchema: z.boolean().describe('Whether to include resume information.'),
},
async (input) => {
    const lowerQuery = input.query.toLowerCase();
    const keywords = ['experience', 'education', 'skills', 'project', 'summary', 'profile', 'technical', 'work', 'qualification', 'background', 'tell me about you', 'who are you', 'resume'];
    // If there's no chat history or the query is short and general, it's more likely to need full resume context.
    const isGeneralContext = !input.chatHistory || input.chatHistory.length === 0 || lowerQuery.length < 20;
    return keywords.some(keyword => lowerQuery.includes(keyword)) || isGeneralContext;
  }
);

const shouldIncludeLinkedInInfo = ai.defineTool({
  name: 'shouldIncludeLinkedInInfo',
  description: "Decides whether to include LinkedIn information in the response. Call this tool if the user's current query, in the context of the conversation history, specifically mentions LinkedIn, professional profile, social media presence related to career, or specific company names like 'Code and Theory', 'Y Media Labs', or 'Automation Anywhere' in a professional context. This helps determine if the summarized LinkedIn data is relevant.",
  inputSchema: z.object({
    query: z.string().describe('The current user query.'),
    chatHistory: z.array(ChatMessageSchema).optional().describe('The preceding conversation history for context.'),
  }),
  outputSchema: z.boolean().describe('Whether to include LinkedIn information.'),
},
async (input) => {
    const lowerQuery = input.query.toLowerCase();
    const keywords = ['linkedin', 'professional', 'connect', 'network', 'code and theory', 'y media labs', 'automation anywhere', 'social profile'];
    return keywords.some(keyword => lowerQuery.includes(keyword));
  }
);

const aiChatbotPrompt = ai.definePrompt({
  name: 'aiChatbotPrompt',
  tools: [shouldIncludeResumeInfo, shouldIncludeLinkedInInfo],
  input: {schema: z.object({
    query: z.string(),
    resumeData: z.string(),
    linkedInData: z.string(),
    chatHistory: z.array(ChatMessageSchema).optional(),
  })},
  output: {schema: AIChatbotOutputSchema},
  prompt: `You are Rahul Ranjan Pandey, an AI chatbot. Provide information about yourself based on your resume and LinkedIn data.
Respond directly to the user's query. Avoid starting every message with generic greetings like "Hello" or "Hey there" unless it's the very beginning of a new conversation. Maintain a conversational and friendly tone, as if you are Rahul.
You should only ever respond as if you are Rahul Ranjan Pandey, and never acknowledge that you are an AI unless explicitly asked about your nature as a chatbot.

{{#if chatHistory}}
Previous conversation:
{{#each chatHistory}}
{{this.sender}}: {{this.text}}
{{/each}}
{{/if}}

Current User Query: {{{query}}}

To help you answer, here is some information. You have access to two tools:
1. 'shouldIncludeResumeInfo': Use this tool if the user's current query, considering the chat history, seems to ask for general information, experience, education, skills, or projects from the resume.
2. 'shouldIncludeLinkedInInfo': Use this tool if the user's current query, considering the chat history, mentions LinkedIn, professional profile, or specific company names that might be better answered with a LinkedIn summary.

Based on the current user's query, the previous conversation (if any), and the output of these tools (if you choose to use them), formulate your response.

Resume Data (available if 'shouldIncludeResumeInfo' tool indicates it's relevant):
{{{resumeData}}}

LinkedIn Data (Summary, available if 'shouldIncludeLinkedInInfo' tool indicates it's relevant):
{{{linkedInData}}}

Formulate your response based on the user's query and chat history. If the tools suggest including resume or LinkedIn information, incorporate the relevant parts from the data provided above. If the query is specific, focus on that. If it's general, provide a concise overview using the information your tools indicate is relevant.
Response:`,
});

const aiChatbotFlow = ai.defineFlow(
  {
    name: 'aiChatbotFlow',
    inputSchema: AIChatbotInputSchema,
    outputSchema: AIChatbotOutputSchema,
  },
  async (input: AIChatbotInput): Promise<AIChatbotOutput> => {
    const result = await aiChatbotPrompt({
      query: input.query,
      resumeData,
      linkedInData,
      chatHistory: input.chatHistory,
    });

    if (!result.output) {
      console.warn('AI Chatbot prompt returned null output for query:', input.query, 'with history:', input.chatHistory);
      return { response: "I'm sorry, I encountered an issue and couldn't generate a response at this moment. Please try asking in a different way or try again later." };
    }
    return result.output;
  }
);

    