import type { CareerCategory } from "./career-categories";

export type QuizOption = {
  label: string;
  text: string;
  scores: Partial<Record<CareerCategory, number>>;
};

export type QuizQuestion = {
  question: string;
  options: QuizOption[];
};

export const questions: QuizQuestion[] = [
  {
    question: "What type of school subject do you enjoy the most?",
    options: [
      { label: "A", text: "Biology or Chemistry", scores: { healthcare: 3, engineering: 1 } },
      { label: "B", text: "Math or Economics", scores: { finance: 3, engineering: 1 } },
      { label: "C", text: "Art, Music, or Creative Writing", scores: { "creative-arts": 3, education: 1 } },
      { label: "D", text: "History, Government, or Debate", scores: { law: 3, business: 1 } },
    ],
  },
  {
    question: "How do you prefer to spend a free afternoon?",
    options: [
      { label: "A", text: "Tinkering with gadgets or building something", scores: { engineering: 3, technology: 2 } },
      { label: "B", text: "Drawing, designing, or making videos", scores: { "creative-arts": 3 } },
      { label: "C", text: "Reading about current events or debating with friends", scores: { law: 2, business: 2 } },
      { label: "D", text: "Volunteering or tutoring someone", scores: { education: 3, healthcare: 1 } },
    ],
  },
  {
    question: "What type of work environment do you see yourself thriving in?",
    options: [
      { label: "A", text: "A structured office with clear goals and deadlines", scores: { finance: 2, business: 2 } },
      { label: "B", text: "A creative studio where ideas flow freely", scores: { "creative-arts": 3 } },
      { label: "C", text: "A lab or research setting, solving complex problems", scores: { healthcare: 2, engineering: 2, technology: 1 } },
      { label: "D", text: "Out in the community, working with people face-to-face", scores: { education: 2, law: 1, healthcare: 1 } },
    ],
  },
  {
    question: "Which of these strengths describes you best?",
    options: [
      { label: "A", text: "I'm great at analyzing data and spotting patterns", scores: { finance: 2, technology: 2, engineering: 1 } },
      { label: "B", text: "I'm a natural communicator and persuader", scores: { law: 2, business: 2 } },
      { label: "C", text: "I'm creative and think outside the box", scores: { "creative-arts": 3, technology: 1 } },
      { label: "D", text: "I'm empathetic and good at helping others", scores: { healthcare: 2, education: 2 } },
    ],
  },
  {
    question: "What kind of impact do you want your career to have?",
    options: [
      { label: "A", text: "Save lives or improve people's health", scores: { healthcare: 3 } },
      { label: "B", text: "Build products or systems that millions of people use", scores: { technology: 3, engineering: 1 } },
      { label: "C", text: "Fight for justice and make society fairer", scores: { law: 3, education: 1 } },
      { label: "D", text: "Create something beautiful or inspiring", scores: { "creative-arts": 3 } },
    ],
  },
  {
    question: "How do you feel about working with technology?",
    options: [
      { label: "A", text: "I love coding, apps, and learning new tech", scores: { technology: 3, engineering: 1 } },
      { label: "B", text: "I use it as a tool but it's not my passion", scores: { business: 1, finance: 1, law: 1 } },
      { label: "C", text: "I like using design or creative software", scores: { "creative-arts": 2, technology: 1 } },
      { label: "D", text: "I prefer working with people more than screens", scores: { education: 2, healthcare: 1 } },
    ],
  },
  {
    question: "Which project sounds most interesting to you?",
    options: [
      { label: "A", text: "Designing a marketing campaign for a new product", scores: { business: 3, "creative-arts": 1 } },
      { label: "B", text: "Developing a mobile app that solves a real problem", scores: { technology: 3, engineering: 1 } },
      { label: "C", text: "Organizing a community health awareness event", scores: { healthcare: 2, education: 2 } },
      { label: "D", text: "Writing a persuasive essay on a social issue", scores: { law: 2, "creative-arts": 1, education: 1 } },
    ],
  },
  {
    question: "How do you approach group projects?",
    options: [
      { label: "A", text: "I take charge and delegate tasks", scores: { business: 3, law: 1 } },
      { label: "B", text: "I focus on the research and data", scores: { finance: 2, engineering: 2 } },
      { label: "C", text: "I handle the design and presentation", scores: { "creative-arts": 3 } },
      { label: "D", text: "I make sure everyone is heard and on track", scores: { education: 2, healthcare: 1, business: 1 } },
    ],
  },
  {
    question: "What do you value most in a career?",
    options: [
      { label: "A", text: "Financial stability and growth potential", scores: { finance: 3, business: 1 } },
      { label: "B", text: "Creative freedom and self-expression", scores: { "creative-arts": 3 } },
      { label: "C", text: "Making a direct difference in people's lives", scores: { healthcare: 2, education: 2 } },
      { label: "D", text: "Solving challenging intellectual problems", scores: { engineering: 2, technology: 2, law: 1 } },
    ],
  },
  {
    question: "Which of these roles sounds most appealing?",
    options: [
      { label: "A", text: "Doctor, nurse, or physical therapist", scores: { healthcare: 3 } },
      { label: "B", text: "Software engineer or data scientist", scores: { technology: 3 } },
      { label: "C", text: "Lawyer, judge, or policy advisor", scores: { law: 3 } },
      { label: "D", text: "Teacher, counselor, or mentor", scores: { education: 3 } },
    ],
  },
  {
    question: "How do you handle stressful situations?",
    options: [
      { label: "A", text: "I stay calm and think logically through the problem", scores: { engineering: 2, healthcare: 2 } },
      { label: "B", text: "I talk it out with someone and brainstorm solutions", scores: { education: 2, business: 1 } },
      { label: "C", text: "I channel the stress into something creative", scores: { "creative-arts": 3 } },
      { label: "D", text: "I research the situation and prepare a plan", scores: { finance: 2, law: 1, technology: 1 } },
    ],
  },
  {
    question: "What kind of content do you consume online the most?",
    options: [
      { label: "A", text: "Science, health, or nature documentaries", scores: { healthcare: 2, engineering: 1 } },
      { label: "B", text: "Business, finance, or investing content", scores: { finance: 3, business: 1 } },
      { label: "C", text: "Design inspiration, art, or music", scores: { "creative-arts": 3 } },
      { label: "D", text: "Tech reviews, coding tutorials, or gadgets", scores: { technology: 3 } },
    ],
  },
  {
    question: "If you could start a club at school, what would it be?",
    options: [
      { label: "A", text: "Robotics or science olympiad", scores: { engineering: 3, technology: 1 } },
      { label: "B", text: "Mock trial or debate", scores: { law: 3, business: 1 } },
      { label: "C", text: "Art, film, or creative writing club", scores: { "creative-arts": 3 } },
      { label: "D", text: "Peer tutoring or mentoring program", scores: { education: 3 } },
    ],
  },
  {
    question: "What's your approach to learning something new?",
    options: [
      { label: "A", text: "Watch tutorials and try it hands-on immediately", scores: { technology: 2, engineering: 2 } },
      { label: "B", text: "Read about it thoroughly before starting", scores: { law: 2, finance: 1 } },
      { label: "C", text: "Learn by teaching it to someone else", scores: { education: 3 } },
      { label: "D", text: "Experiment creatively until something clicks", scores: { "creative-arts": 2, business: 1 } },
    ],
  },
  {
    question: "Where do you see yourself in 10 years?",
    options: [
      { label: "A", text: "Running my own company or leading a team", scores: { business: 3, technology: 1 } },
      { label: "B", text: "Working in a hospital, clinic, or research lab", scores: { healthcare: 3 } },
      { label: "C", text: "Creating art, designs, or media that inspires people", scores: { "creative-arts": 3 } },
      { label: "D", text: "Working in government, law, or education to drive change", scores: { law: 2, education: 2 } },
    ],
  },
];
