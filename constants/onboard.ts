type onBoardGoalQuestionType = {
  variant: "checkbox" | "radio";
  title: string;
  step: number;
  choices: string[];
  required: boolean;
};

type onBoardWelcomeFinishType = {
  variant: "welcome" | "finish";
};

export type Answer = Record<number, number[] | number>;

export type Question = (onBoardGoalQuestionType | onBoardWelcomeFinishType)[];

// Python
// DS
// DA
// ML

export const onBoardNoGoalQuestionEN: Question = [
  {
    variant: "radio",
    title:
      "How interested are you in creating tools to solve everyday problems, like a program to calculate GPA ?",
    step: 1,
    choices: ["Not interested", "Somewhat interested", "Very interested"],
    required: true
  },
  {
    variant: "radio",
    title:
      "How interested are you in visualizing data, analyzing data, and presenting ?",
    step: 2,
    choices: ["Not interested", "Somewhat interested", "Very interested"],
    required: true
  },
  {
    variant: "radio",
    title:
      "The statement, 'When there is a problem, you like to analyze and find the root cause of the issue,' how well does this describe you ?",
    step: 3,
    choices: ["Not interested", "Somewhat interested", "Very interested"],
    required: true
  },
  {
    variant: "radio",
    title:
      "When you encounter a problem, do you prefer to develop and design systems that can learn on their own to help predict future occurrences and be used in the future when the same or similar problems arise? How accurate is this statement for you ?",
    step: 4,
    choices: ["Not interested", "Somewhat interested", "Very interested"],
    required: true
  }
];

export const onBoardNoGoalQuestionTH: Question = [
  {
    variant: "radio",
    title:
      "“สร้างเครื่องมือเพื่อแก้ปัญหาในชีวิตประจำวัน เช่น โปรแกรมคำนวณเกรดเฉลี่ย” คุณสนใจงานนี้แค่ไหน ?",
    step: 1,
    choices: ["ไม่สนใจ", "ปานกลาง", "สนใจมาก"],
    required: true
  },
  {
    variant: "radio",
    title:
      "คุณสนใจในการ visualization ข้อมูล, วิเคราะห์ข้อมูล และพรีเซ็นต์งาน มากน้อยแค่ไหน ? ",
    step: 2,
    choices: ["ไม่สนใจ", "ปานกลาง", "สนใจมาก"],
    required: true
  },
  {
    variant: "radio",
    title:
      "“เมื่อมีปัญหา คุณชอบที่จะวิเคราะห์หาสาเหตุที่แท้จริง (Root cause) ของปัญหา” ข้อความนี้ตรงกับคุณมากน้อยแค่ไหน ?",
    step: 3,
    choices: ["ไม่ตรงเลย", "ปานกลาง", "ตรงมาก"],
    required: true
  },
  {
    variant: "radio",
    title:
      "“เมื่อคุณพบปัญหา คุณเลือกที่จะพัฒนาและออกแบบระบบที่สามารถเรียนรู้ได้ด้วยตัวเอง เพื่อใช้ในการช่วยทำนายสิ่งที่จะเกิดขึ้นและเพื่อใช้ในอนาคตเมื่อปัญหานี้หรือปัญหาที่คล้ายกันถูกพบเจออีก” ข้อความนี้ตรงกับคุณมากน้อยแค่ไหน ?",
    step: 4,
    choices: ["ไม่สนใจ", "ปานกลาง", "สนใจมาก"],
    required: true
  }
];

export const onBoardGoalQuestionEN: Question = [
  {
    variant: "checkbox",
    title: "What do you want to learn ?",
    step: 1,
    choices: ["Python", "Data Analysis", "Data Science", "Machine Learning"],
    required: true
  },
  {
    variant: "radio",
    title: "How much experience do you have with Python ?",
    step: 2,
    choices: [
      "No experience at all",
      "Some basic knowledge, but not fluent",
      "Fluent in programming"
    ],
    required: true
  },
  {
    variant: "radio",
    title: "How much experience do you have with data visualization ?",
    step: 3,
    choices: [
      "No experience at all",
      "Some basic knowledge, but not fluent",
      "Fluent"
    ],
    required: true
  }
];

export const onBoardGoalQuestionTH: Question = [
  {
    variant: "checkbox",
    title: "คุณอยากเรียนอะไร ?",
    step: 1,
    choices: ["Python", "Data Analysis", "Data Science", "Machine Learning"],
    required: true
  },
  {
    variant: "radio",
    title: "คุณมีพื้นฐานการเขียน Python มามากน้อยแค่ไหน ?",
    step: 2,
    choices: [
      "ไม่มีพื้นฐานเลย",
      "มีพื้นฐานมาบ้าง แต่ยังไม่คล่อง",
      "เขียนโปรแกรมได้คล่องแล้ว"
    ],
    required: true
  },
  {
    variant: "radio",
    title: "คุณมีพื้นฐานการทำ Visualization มามากน้อยแค่ไหน ?",
    step: 3,
    choices: ["ไม่มีพื้นฐานเลย", "มีพื้นฐานมาบ้าง แต่ยังไม่คล่อง", "คล่องแล้ว"],
    required: true
  }
];
