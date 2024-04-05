"use client"

import Icon from "@/presentation/assets/image/icon";
import Button from "@/presentation/components/button";
import FixedButton from "@/presentation/components/fixed_button";
import Header from "@/presentation/components/header";
import InputField from "@/presentation/components/input_field";
import ProgressBar from "@/presentation/components/progress_bar";
import Question from "@/presentation/components/question";
import Result from "@/presentation/components/result";
import SampleQuestion from "@/presentation/components/sample_question";
import Score from "@/presentation/components/score";
import SegmentedControl from "@/presentation/components/segmented_control";

export default function Home() {
  return (
    <main>
      <Button
        type="mini"
        text="미니 버튼"
        onClick={() => console.log("Main button clicked")}
        icon={<Icon type="trash" />}
      />
      <Button
        type="main"
        text="미니 버튼"
        onClick={() => console.log("Main button clicked")}
        icon={<Icon type="trash" />}
      />
      <InputField
        type="select"
        // placeholder="텍스트를 입력하세요."
        title="텍스트"
        required={false}
        toParent={(value) => console.log(value)}
      />
      <InputField
        type="textarea"
        title="this is file"
        required={false}
        toParent={(value) => console.log(value)}
      />
      <InputField
        type="file"
        title="this is file"
        required={false}
        toParent={(value) => console.log(value)}
      />
      <FixedButton
        color="gray"
        text="고정 버튼"
        onClick={() => console.log("Fixed button clicked")}
        disabled={true}
        subButtonText="서브 버튼"
        subButtonOnClick={() => console.log("Sub button clicked")}
      />
      <Result result="wrong" userAnswer="adsaf" />
      <Question
        toParent={(value) => console.log(value)}
        type="result"
        index={1}
        answer="Homeostasis"
        question="Homeostasis는 신체가 일정 수준을 유지할 수 있도록 해주는 시스템이다."
      />
      <Question
        toParent={(value) => console.log(value)}
        type="result"
        index={1}
        answer="Homeostasis"
        question="Homeostasis는 신체가 일정 수준을 유지할 수 있도록 해주는 시스템이다."
      />
      <Question
        toParent={(value) => console.log(value)}
        type="result"
        index={1}
        answer="Homeostasis"
        question="Homeostasis는 신체가 일정 수준을 유지할 수 있도록 해주는 시스템이다."
      />
      <Question
        toParent={(value) => console.log(value)}
        type="result"
        index={1}
        answer="Homeostasis"
        question="Homeostasis는 신체가 일정 수준을 유지할 수 있도록 해주는 시스템이다."
      />
      <Question
        toParent={(value) => console.log(value)}
        type="result"
        index={1}
        answer="Homeostasis"
        question="Homeostasis는 신체가 일정 수준을 유지할 수 있도록 해주는 시스템이다."
      />
      <Score correct={4} wrong={11} />
      <ProgressBar state={3} />
      <SegmentedControl contents={["텍스트", "이미지 / PDF"]} defaultIndex={1} onSelect={() => { }} />
      <SampleQuestion
        question="Homeostasis는 신체가 일정 수준을 유지할 수 있도록 해주는 시스템이다."
        hashtag="생물학입문"
        createdAt={new Date()}
        answer="Homeostasis"
      />
      <Header type="progress" state={3} />
    </main>
  );
}
