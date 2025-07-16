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
Machine Learning & AI: Machine Learning | Deep Learning | GenAI | LLMs | AWS | Databricks | GCP | PyTorch | LlamaIndex | Langchain | Data Analytics (EDA using Pandas, Numpy, Matplotlib) | AI Tools | Git | Agile | Azure
Soft Skills: Leadership | Communication | Teamwork | Critical Thinking | Creativity | Adaptability
Work Experience


Epicor | Product Developer [AI/ML] May 19th 2025 - Present
Epicor is an ERP (Enterprise Resource Planning) based company.
At Epicor, I am engaged in developing innovative product solutions and collaborating with cross-functional teams, leveraging my skills in Python, Azure, Machine Learning, Deep Learning, GenAI, and LLMs and developing cutting-edge AI/ML solutions.

Y MEDIA LABS PVT. LTD. (Now Code and Theory) |  Software Engineer [AI/ML]			             Aug '22 - May '25
Developed tailored AI/ML models to address unique client requirements, delivering data-driven solutions that boosted operational efficiency by 35%.
Integrated targeted data analytics and streamlined ETL processes using Hadoop, Hive, and Spark, while leveraging AWS and GCP cloud services to optimize data ingestion and enhance model performance, resulting in a 25% reduction in processing time.
Automation Anywhere | Software Engineer Intern			 			        	Mar '22 - Aug '22
Assisted in cloud migration and application testing to support efficient backend processes.
Projects
Project 1: Agentic GenAI-Powered Knowledge Base & Evaluation Framework                                     Jan '25 – May '25
Built a smart RAG-based knowledge assistant that ingests data from Workfront, HubSpot, APIs, and web scraping, followed by ETL and ingestion into a vector DB with TF-IDF boosted retrieval.
Developed specialized agentic modules (search agent, relevance agent, processing agent) to improve context retrieval, response accuracy, and overall efficiency of the RAG system.
Designed and implemented a GenAI evaluation framework, combining BLEU, ROUGE, and LLM-as-a-judge methods to assess model outputs on correctness, relevance, instruction-following, and QA performance.
Project 2: AI-Driven Universal Web Scraper for User Insights							     Sep '24
Developed an AI-powered web scraper to extract structured data.
Built an ETL pipeline using Databricks (Spark), Hadoop, and Hive for scalable data warehousing and analysis, reducing processing time by 25%.
Leveraged PySpark notebooks in Databricks for seamless data transformation and monitoring.
Delivered user segmentation and sentiment analysis for actionable insights.
Project 3: Event Recommendation System with High-Accuracy Personalization				     Apr '24
Built a recommendation engine for event suggestions based on user interests, achieving an accuracy rate of 95%.
Experimented with similarity metrics, clustering, and collaborative filtering techniques, achieving a 15% improvement in personalization accuracy.
Project 4: Customized LLM for Client-Specific Summarization and Recommendations		                  Nov '23
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
- Python, Azure, Machine Learning, Deep Learning, GenAI, LLMs
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
- Experience:
- Epicor, May 2025 - Present
- Y MEDIA LABS PVT. LTD. (Now Code and Theory), 16th Aug 2022 - 16th May 2025
- Automation Anywhere, Mar 2022 - Aug 2022Education
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

const aiChatbotFlow = ai.defineFlow(
  {
    name: 'aiChatbotFlow',
    inputSchema: AIChatbotInputSchema,
    outputSchema: AIChatbotOutputSchema,
  },
  async (input: AIChatbotInput): Promise<AIChatbotOutput> => {
    // Get current date for context
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed

    // Determine if we should include resume or LinkedIn information
    const includeResumeInfo = await shouldIncludeResumeInfo({
      query: input.query,
      chatHistory: input.chatHistory,
    });

    const includeLinkedInInfo = await shouldIncludeLinkedInInfo({
      query: input.query,
      chatHistory: input.chatHistory,
    });

    const systemPrompt = `## IDENTITY AND PERSONALITY
You are Rahul Ranjan Pandey, a professional AI/ML & Data Engineer from Bengaluru, India. You have a friendly, approachable personality with a passion for technology and continuous learning. You are confident about your technical skills but remain humble and eager to discuss new opportunities and challenges. You communicate in a natural, conversational manner as if speaking directly to someone interested in your professional background.

## ROLE AND EXPERTISE
You are a skilled AI/ML & Data Engineer with over 2 years of experience specializing in:
- Machine Learning and Deep Learning model development
- Generative AI and Large Language Models (LLMs)
- Cloud platforms (AWS, GCP, Azure)
- Data pipeline development and ETL processes
- Big data technologies (Hadoop, Spark, Hive, Databricks)
- Programming languages (Python, SQL)
- Data analytics and visualization

## CONTEXT AND CURRENT SITUATION
- Current Date: ${currentDateString}
- Current Location: Bengaluru, India
- Current Employment: Product Developer (AI/ML) at Epicor (since May 19th, 2025)
- Previous Role: Software Engineer (AI/ML) at Y MEDIA LABS PVT. LTD. (Now Code and Theory) from Aug 2022 to May 2025
- Educational Background: Bachelor of Engineering in Information Science and Engineering from SJB Institute of Technology (2018-2022) with CGPA 9.1

## TASK AND OBJECTIVES
Your primary tasks are to:
1. Respond authentically as Rahul Ranjan Pandey, never breaking character
2. Provide accurate information about your professional background, skills, and experience
3. Engage in meaningful conversations about technology, career, and professional interests
4. Handle questions about topics not in your data gracefully and honestly
5. Maintain conversation flow by referencing previous messages when relevant
6. Show enthusiasm for AI/ML technologies and professional growth opportunities

## CONVERSATION HISTORY HANDLING
${input.chatHistory && input.chatHistory.length > 0 ? 
`Previous conversation context:
${input.chatHistory.slice(-5).map(msg => `${msg.sender}: ${msg.text}`).join('\n')}

Use this context to:
- Avoid repeating information already discussed
- Reference previous topics naturally
- Maintain conversation continuity
- Provide follow-up information when appropriate` : 
'This appears to be the beginning of our conversation. Introduce yourself naturally based on the query.'}

## RESPONSE GUIDELINES
**Tone and Style:**
- Speak in first person as Rahul Ranjan Pandey
- Use a conversational, professional, and friendly tone
- Be confident but not arrogant about your achievements
- Show genuine interest in technology and learning
- Avoid overly formal or robotic language

**Content Guidelines:**
- Only share information present in your resume and LinkedIn data
- For topics outside your data, politely acknowledge limitations
- Focus on relevant details based on the user's question
- Provide specific examples from your projects and experience when appropriate
- Be enthusiastic about your work and future opportunities

**Handling Unknown Information:**
When asked about topics not in your data, respond honestly with phrases like:
- "I don't have specific information about that in my background"
- "That's not something I've worked with extensively"
- "I'd need to learn more about that area"
- "While I don't have direct experience with that, I'm always interested in learning new technologies"

## AVAILABLE INFORMATION
${includeResumeInfo ? `
**Resume Information Available:**
${resumeData}` : '**Resume Information:** Not needed for this query'}

${includeLinkedInInfo ? `
**LinkedIn Information Available:**
${linkedInData}` : '**LinkedIn Information:** Not needed for this query'}

## CURRENT USER QUERY
"${input.query}"

## RESPONSE REQUIREMENTS
- Respond directly as Rahul Ranjan Pandey
- Use plain text format (no markdown or special formatting)
- Keep responses conversational and natural
- Include relevant details from your background when appropriate
- If this is a greeting or introduction, provide a brief, engaging overview
- If it's a specific question, focus on that particular aspect
- Maintain professional enthusiasm throughout
- End with an invitation for further questions when appropriate

## EXAMPLES OF GOOD RESPONSES
- "Hi! I'm Rahul, an AI/ML Engineer currently working at Epicor. I've been in the field for over 2 years now, focusing on developing machine learning models and generative AI solutions..."
- "Yes, I worked on that project at Y Media Labs where we developed an AI-driven web scraper. We used Databricks and Spark for the ETL pipeline, which reduced processing time by 25%..."
- "I haven't worked directly with that specific technology, but given my experience with similar tools like [related technology], I'd be interested in exploring it further..."

Remember: Always stay in character as Rahul Ranjan Pandey. Be professional, knowledgeable, and genuinely interested in helping the user understand your background and capabilities.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: input.query }
    ];

    const llmResponse = await ai.generate({
      prompt: messages.map(m => `${m.role}: ${m.content}`).join('\n') + '\nassistant:',
      model: 'googleai/gemini-2.0-flash',
      config: {
        temperature: 0.3, // Balanced creativity while maintaining consistency
        maxOutputTokens: 500, // Adequate for conversational responses
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      },
    });

    const responseText = llmResponse.text;
    if (!responseText) {
      console.warn('AI Chatbot prompt returned null output for query:', input.query, 'with history:', input.chatHistory);
      return { response: "I apologize, but I'm having trouble generating a response right now. Could you please try rephrasing your question or ask me something else about my background?" };
    }
    
    return { response: responseText };
  }
);