export default [
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