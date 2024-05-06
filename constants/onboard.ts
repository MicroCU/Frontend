type onBoardGoalQuestionType = {
  variant: "checkbox" | "radio";
  title_en: string;
  title_th: string;
  choices_en: string[];
  choices_th: string[];
  step: number;
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

export const onBoardNoGoalQuestion: Question = [
  {
    variant: "radio",
    title_en:
      "How interested are you in creating tools to solve everyday problems, like a program to calculate GPA ?",
    title_th:
      "“สร้างเครื่องมือเพื่อแก้ปัญหาในชีวิตประจำวัน เช่น โปรแกรมคำนวณเกรดเฉลี่ย” คุณสนใจงานนี้แค่ไหน ?",
    step: 1,
    choices_en: ["Not interested", "Somewhat interested", "Very interested"],
    choices_th: ["ไม่สนใจ", "ปานกลาง", "สนใจมาก"],
    required: true
  },
  {
    variant: "radio",
    title_en:
      "How interested are you in visualizing data, analyzing data, and presenting ?",
    title_th:
      "คุณสนใจในการ visualization ข้อมูล, วิเคราะห์ข้อมูล และพรีเซ็นต์งาน มากน้อยแค่ไหน ? ",
    step: 2,
    choices_en: ["Not interested", "Somewhat interested", "Very interested"],
    choices_th: ["ไม่สนใจ", "ปานกลาง", "สนใจมาก"],
    required: true
  },
  {
    variant: "radio",
    title_en:
      "The statement, 'When there is a problem, you like to analyze and find the root cause of the issue,' how well does this describe you ?",
    title_th:
      "“เมื่อมีปัญหา คุณชอบที่จะวิเคราะห์หาสาเหตุที่แท้จริง (Root cause) ของปัญหา” ข้อความนี้ตรงกับคุณมากน้อยแค่ไหน ?",
    step: 3,
    choices_en: ["Not interested", "Somewhat interested", "Very interested"],
    choices_th: ["ไม่ตรงเลย", "ปานกลาง", "ตรงมาก"],
    required: true
  },
  {
    variant: "radio",
    title_en:
      "When you encounter a problem, do you prefer to develop and design systems that can learn on their own to help predict future occurrences and be used in the future when the same or similar problems arise? How accurate is this statement for you ?",
    title_th:
      "“เมื่อคุณพบปัญหา คุณเลือกที่จะพัฒนาและออกแบบระบบที่สามารถเรียนรู้ได้ด้วยตัวเอง เพื่อใช้ในการช่วยทำนายสิ่งที่จะเกิดขึ้นและเพื่อใช้ในอนาคตเมื่อปัญหานี้หรือปัญหาที่คล้ายกันถูกพบเจออีก” ข้อความนี้ตรงกับคุณมากน้อยแค่ไหน ?",
    step: 4,
    choices_en: ["Not interested", "Somewhat interested", "Very interested"],
    choices_th: ["ไม่สนใจ", "ปานกลาง", "สนใจมาก"],
    required: true
  }
];

export const onBoardGoalQuestion: Question = [
  {
    variant: "checkbox",
    title_en: "What do you want to learn ?",
    title_th: "คุณอยากเรียนอะไร ?",
    step: 1,
    choices_en: ["Python", "Data Analysis", "Data Science", "Machine Learning"],
    choices_th: ["Python", "Data Analysis", "Data Science", "Machine Learning"],
    required: true
  },
  {
    variant: "radio",
    title_en: "How much experience do you have with Python ?",
    title_th: "คุณมีพื้นฐานการเขียน Python มามากน้อยแค่ไหน ?",
    step: 2,
    choices_en: [
      "No experience at all",
      "Some basic knowledge, but not fluent",
      "Fluent in programming"
    ],
    choices_th: [
      "ไม่มีพื้นฐานเลย",
      "มีพื้นฐานมาบ้าง แต่ยังไม่คล่อง",
      "เขียนโปรแกรมได้คล่องแล้ว"
    ],
    required: true
  },
  {
    variant: "radio",
    title_en: "How much experience do you have with data visualization ?",
    title_th: "คุณมีพื้นฐานการทำ Visualization มามากน้อยแค่ไหน ?",
    step: 3,
    choices_en: [
      "No experience at all",
      "Some basic knowledge, but not fluent",
      "Fluent"
    ],
    choices_th: [
      "ไม่มีพื้นฐานเลย",
      "มีพื้นฐานมาบ้าง แต่ยังไม่คล่อง",
      "คล่องแล้ว"
    ],
    required: true
  }
];
