const sampleQuestion = [
  {
    hashtag: "범죄와사회",
    createdAt: new Date(),
    question: "Q. 어떤 원칙에 따르면, 가장 강력한 국가부터 가장 작은 국가까지, 모든 국가는 ______, 자기 결정권, 그리고...",
    answer: "주권적 평등성"
  },
  {
    hashtag: "범죄와사회",
    createdAt: new Date(),
    question: "Q. 어떤 원칙에 따르면, 가장 강력한 국가부터 가장 작은 국가까지, 모든 국가는 ______, 자기 결정권, 그리고...",
    answer: "주권적 평등성"
  },
  {
    hashtag: "범죄와사회",
    createdAt: new Date(),
    question: "Q. 어떤 원칙에 따르면, 가장 강력한 국가부터 가장 작은 국가까지, 모든 국가는 ______, 자기 결정권, 그리고...",
    answer: "주권적 평등성"
  },
  {
    hashtag: "범죄와사회",
    createdAt: new Date(),
    question: "Q. 어떤 원칙에 따르면, 가장 강력한 국가부터 가장 작은 국가까지, 모든 국가는 ______, 자기 결정권, 그리고...",
    answer: "주권적 평등성"
  },
  {
    hashtag: "범죄와사회",
    createdAt: new Date(),
    question: "Q. 어떤 원칙에 따르면, 가장 강력한 국가부터 가장 작은 국가까지, 모든 국가는 ______, 자기 결정권, 그리고...",
    answer: "주권적 평등성"
  },
  {
    hashtag: "범죄와사회",
    createdAt: new Date(),
    question: "Q. 어떤 원칙에 따르면, 가장 강력한 국가부터 가장 작은 국가까지, 모든 국가는 ______, 자기 결정권, 그리고...",
    answer: "주권적 평등성"
  },
  {
    hashtag: "범죄와사회",
    createdAt: new Date(),
    question: "Q. 어떤 원칙에 따르면, 가장 강력한 국가부터 가장 작은 국가까지, 모든 국가는 ______, 자기 결정권, 그리고...",
    answer: "주권적 평등성"
  },
];

const sampleResult = [
  {
    hashtag: "범죄와사회",
    createdAt: new Date(),
    question: "Q. 어떤 원칙에 따르면, 가장 강력한 국가부터 가장 작은 국가까지, 모든 국가는 주권적 평등성, 자기 결정권, 그리고...",
    answer: "주권적 평등성",
    userAnswer: "주권적 평등성"
  },
  {
    hashtag: "범죄와사회",
    createdAt: new Date(),
    question: "Q. 어떤 원칙에 따르면, 가장 강력한 국가부터 가장 작은 국가까지, 모든 국가는 주권적 평등성, 자기 결정권, 그리고...",
    answer: "주권적 평등성",
    userAnswer: "주권적 평등성"
  },
  {
    hashtag: "범죄와사회",
    createdAt: new Date(),
    question: "Q. 어떤 원칙에 따르면, 가장 강력한 국가부터 가장 작은 국가까지, 모든 국가는 주권적 평등성, 자기 결정권, 그리고...",
    answer: "주권적 평등성",
    userAnswer: "아몰랑"
  },
  {
    hashtag: "범죄와사회",
    createdAt: new Date(),
    question: "Q. 어떤 원칙에 따르면, 가장 강력한 국가부터 가장 작은 국가까지, 모든 국가는 주권적 평등성, 자기 결정권, 그리고...",
    answer: "주권적 평등성",
    userAnswer: "주권적 평등성"
  },
  {
    hashtag: "범죄와사회",
    createdAt: new Date(),
    question: "Q. 어떤 원칙에 따르면, 가장 강력한 국가부터 가장 작은 국가까지, 모든 국가는 주권적 평등성, 자기 결정권, 그리고...",
    answer: "주권적 평등성",
    userAnswer: "아몰랑"
  },
  {
    hashtag: "범죄와사회",
    createdAt: new Date(),
    question: "Q. 어떤 원칙에 따르면, 가장 강력한 국가부터 가장 작은 국가까지, 모든 국가는 주권적 평등성, 자기 결정권, 그리고...",
    answer: "주권적 평등성",
    userAnswer: "주권적 평등성"
  },
  {
    hashtag: "범죄와사회",
    createdAt: new Date(),
    question: "Q. 어떤 원칙에 따르면, 가장 강력한 국가부터 가장 작은 국가까지, 모든 국가는 주권적 평등성, 자기 결정권, 그리고...",
    answer: "주권적 평등성",
    userAnswer: "주권적 평등성"
  },
];

const userQuestionList = [
    {
        type: "select",
        required: "true",
        title: "문장 당 빈칸 개수",
        placeholder: "",
        description: ""
    },
    {
        type: "text",
        required: "true",
        title: "문제 개수",
        placeholder: "",
        description: ""
    },
    {
        type: "Default",
        required: "false",
        title: "과목명",
        placeholder: "#",
        description: "과목명은 빈칸 문제의 해시태그가 됩니다."
    },
    {
        type: "add",
        required: "false",
        title: "포함어",
        placeholder: "포함어 추가하기",
        description: "프로이트, 아인슈타인"
    },
    {
        type: "add",
        required: "false",
        title: "제외어",
        placeholder: "제외어 추가하기",
        description: "프로이트, 아인슈타인"
    },
]

const blank = "[ __________ ]";

export { sampleQuestion, userQuestionList, sampleResult, blank };