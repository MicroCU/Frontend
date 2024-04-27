type onBoardGoalQuestionType = {
  variant: "checkbox" | "radio";
  title: string;
  step: number;
  choices: string[];
};

type onBoardWelcomeFinishType = {
  variant: "welcome" | "finish";
};

export type Answer = Record<string, string | string[]>;

export type Question = (onBoardGoalQuestionType | onBoardWelcomeFinishType)[];

// Python
// DS
// DA
// ML

export const onBoardNoGoalQuestion: Question = [
  {
    variant: "checkbox",
    title: "What kind of projects do you find most exciting ?",
    step: 1,
    choices: [
      "Building applications or tools to solve everyday problems", // 3, 0, 0, 0
      "Working on projects that require statistical analysis", // 0, 3, 2, 1
      "Analyzing historical data to improve business decisions", // 0, 2, 3, 1
      "Designing systems that learn and adapt over time" // 1, 0, 0, 3
    ]
  },
  {
    variant: "checkbox",
    title: "When faced with a problem, do you prefer to",
    step: 2,
    choices: [
      "Write a script to automate the solution?", // 3, 0, 0, 1
      "Analyze the data to understand trends?", // 0, 2, 2, 1
      "Dive deep into the data to find root causes?", // 0, 1, 3, 0
      "Apply algorithms to predict future outcomes?" // 0, 1, 1, 3
    ]
  },
  {
    variant: "radio",
    title: "What is your preferred length of learning?",
    step: 3,
    choices: [
      "Short (less than 20 hours)",
      "Medium (20-60 hours)",
      "Long (more than 60 hours)"
    ]
  }
];

export const onBoardGoalQuestion: Question = [
  {
    variant: "checkbox",
    title: "If you could improve one skill this year, what would it be?",
    step: 1,
    choices: [
      "Learning a programming language like Python", // 3, 0, 0, 0
      "Understanding complex data sets and their implication", // 0, 3, 0, 0
      "Mastering the art of turning data into actionable insights", // 0, 0, 3, 0
      "Developing predictive models from data" // 0, 0, 0, 3
    ]
  },
  {
    variant: "radio",
    title: "What is your experience on this field?",
    step: 2,
    choices: [
      "less than 1 year", // 1, 0, 0, 0
      "1-3 year", // 0, 1, 1, 0
      "more than 3 year" // 0, 0, 0, 1
    ]
  },
  {
    variant: "radio",
    title: "What is your preferred length of learning?",
    step: 3,
    choices: [
      "Short (less than 20 hours)",
      "Medium (20-60 hours)",
      "Long (more than 60 hours)"
    ]
  }
];
