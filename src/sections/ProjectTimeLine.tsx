import styled from "styled-components";
import { Card } from "../components/Card";
import { _Text } from "../components/common/Text";
import { useScroll } from "../hooks/useScroll";
import { ScrollType } from "../App";
import { projects } from "../Text/Project";
import { useTimeLine } from "../hooks/useTimeLine";
import { Arrow } from "../assets/svg/Arrow";
import { _SectionWrapper } from "../components/common/SectionWrapper";

const DateTextList = Array(15)
  .fill(2022)
  .map((date, idx) => {
    const month = idx + 5;
    const monthOver = month >= 12 ? 1 : 0;
    const year = date + monthOver;
    return (
      <div>
        {year}.{month % 12 < 10 && 0}
        {(month % 12) + monthOver}
      </div>
    );
  });

export const ProjectTimeLine = ({ setScroll }: ScrollType) => {
  const ref = useScroll(setScroll, 3);
  const [projectNumber, next, currentDate] = useTimeLine([
    "2022.05",
    "2022.08",
    "2023.04",
    "2023.07",
  ]);
  return (
    <_Wrapper ref={ref}>
      <_Content>
        <_DateWrapper>
          <Arrow onClick={() => next(projectNumber - 1)} />
          <_DateTextWrapper>
            <_DateTextList weight="bold" currentDate={currentDate}>
              {DateTextList}
            </_DateTextList>
          </_DateTextWrapper>
          <Arrow direction="right" onClick={() => next(projectNumber + 1)} />
        </_DateWrapper>
        <_ProjectWrapper>
          <_ProjectList projectNumber={projectNumber}>
            {projects.map(Card)}
          </_ProjectList>
        </_ProjectWrapper>
      </_Content>
    </_Wrapper>
  );
};

const _Wrapper = styled(_SectionWrapper)`
  padding: 30px 0;
`;

const _Content = styled.div`
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const _ProjectWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const _ProjectList = styled.div<{ projectNumber: number }>`
  position: absolute;
  height: 100%;
  display: flex;
  gap: 100px;
  transition: 1s;
  left: ${({ projectNumber }) => -projectNumber * 600}px;
`;

const _DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 30px 0;
`;

const _DateTextWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 26px;
  overflow: hidden;
`;

const _DateTextList = styled(_Text)<{ currentDate: number }>`
  position: absolute;
  top: ${({ currentDate }) => -currentDate * 30}px;
  transition: 0.5s;
  width: 80px;
  > div {
    height: 30px;
    text-align: center;
  }
`;
