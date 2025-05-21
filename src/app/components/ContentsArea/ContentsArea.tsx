import React from 'react';
import { SwipeIndexProps } from '../types';
import Section from '@/components/Section/Section';
import ContentList from './ContentList/ContentList';

interface ContentAreaProps extends SwipeIndexProps {}

const dummyList = Array.from({ length: 30 }, (_, idx) => {
  return {
    id: idx,
    img: 'image',
    ranking: idx + 1,
    title: 'title',
    artist: 'artist',
  };
});

const ContentsArea = ({ currentIndex, setCurrentIndex }: ContentAreaProps) => {
  return (
    <Section bg="lightgray">
      <Section.Title>콘텐츠 큐레이션 제목</Section.Title>
      <ContentList listInfo={dummyList} />
    </Section>
  );
};

export default ContentsArea;
