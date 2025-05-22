import React from 'react';
import { SwipeIndexProps } from '../types';
import Section from '@/components/Section/Section';
import ContentList from './ContentList/ContentList';
import { ContentsListResponse } from '@/schema/contents';

interface ContentAreaProps {
  listInfo: ContentsListResponse['contents'];
}

const ContentsArea = ({ listInfo }: ContentAreaProps) => {
  return (
    <Section bg="lightgray">
      <Section.Title>콘텐츠 큐레이션 제목</Section.Title>
      <ContentList listInfo={listInfo} />
    </Section>
  );
};

export default ContentsArea;
