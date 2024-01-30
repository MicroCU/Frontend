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

type Question = (onBoardGoalQuestionType | onBoardWelcomeFinishType)[];

const onBoardNoGoalQuestion: Question = [
  {
    variant: "checkbox",
    title: "What is your favorite subject?",
    step: 1,
    choices: [
      "Programming",
      "Math",
      "Physics",
      "Social",
      "Bio",
      "Chemistry",
      "English",
      "History",
      "Geography",
      "Economics",
      "Law",
      "Health",
      "Art",
      "Music",
      "Sport",
      "Other"
    ]
  },
  {
    variant: "radio",
    title: "What do you do in free time ?",
    step: 2,
    choices: [
      "Reading",
      "Playing games",
      "Watching movies",
      "Listening to music",
      "Other"
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

const onBoardGoalQuestion: Question = [
  {
    variant: "checkbox",
    title: "Choose your favorite Journey",
    step: 1,
    choices: ["Programming", "Health", "Law"]
  },
  {
    variant: "radio",
    title: "What is your knowledge level?",
    step: 2,
    choices: ["Secondary school", "Undergraduate", "Graduate"]
  }
];

export { onBoardNoGoalQuestion, onBoardGoalQuestion };
