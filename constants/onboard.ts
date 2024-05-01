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
    variant: "radio",
    title:
      "How interested are you in creating tools to solve everyday problems, like a program to calculate GPA ?",
    step: 1,
    choices: [
      "Not interested", // 3, 0, 0, 0
      "Somewhat interested", // 0, 3, 2, 1
      "Very interested" // 0, 2, 3, 1
    ]
  },
  {
    variant: "radio",
    title:
      "How interested are you in visualizing data, analyzing data, and presenting ?",
    step: 2,
    choices: [
      "Not interested", // 3, 0, 0, 0
      "Somewhat interested", // 0, 3, 2, 1
      "Very interested" // 0, 2, 3, 1
    ]
  },
  {
    variant: "radio",
    title:
      "The statement, 'When there is a problem, you like to analyze and find the root cause of the issue,' how well does this describe you ?",
    step: 3,
    choices: [
      "Not interested", // 3, 0, 0, 0
      "Somewhat interested", // 0, 3, 2, 1
      "Very interested" // 0, 2, 3, 1
    ]
  },
  {
    variant: "radio",
    title:
      "When you encounter a problem, do you prefer to develop and design systems that can learn on their own to help predict future occurrences and be used in the future when the same or similar problems arise? How accurate is this statement for you?",
    step: 4,
    choices: [
      "Not interested", // 3, 0, 0, 0
      "Somewhat interested", // 0, 3, 2, 1
      "Very interested" // 0, 2, 3, 1
    ]
  }
];

export const onBoardGoalQuestion: Question = [
  {
    variant: "checkbox",
    title: "What do you want to learn ?",
    step: 1,
    choices: [
      "Python", // 3, 0, 0, 0
      "Data Analysis", // 0, 3, 0, 0
      "Data Science", // 0, 0, 3, 0
      "Machine Learning" // 0, 0, 0, 3
    ]
  },
  {
    variant: "radio",
    title: "How much experience do you have with Python?",
    step: 2,
    choices: [
      "No experience at all", // 1, 0, 0, 0
      "Some basic knowledge, but not fluent", // 0, 1, 1, 0
      "Fluent in programming" // 0, 0, 0, 1
    ]
  },
  {
    variant: "radio",
    title: "How much experience do you have with data visualization?",
    step: 3,
    choices: [
      "No experience at all", // 1, 0, 0, 0
      "Some basic knowledge, but not fluent", // 0, 1, 1, 0
      "Fluent" // 0, 0, 0, 1
    ]
  }
];
