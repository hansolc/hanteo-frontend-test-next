import Section from '@/components/Section/Section';
import Wrapper from '@/components/Wrapper/Wrapper';
import React from 'react';

interface BannerPageProps {
  params: {
    id: string;
  };
}

const BannerPage = ({ params }: BannerPageProps) => {
  const { id } = params;
  return (
    <Wrapper>
      <main>
        <Section bg="primary">
          <Section.Title>{id}번째 배너페이지입니다.</Section.Title>
          <div style={{ height: '200px' }}></div>
        </Section>
        <Section bg="secondary">
          <Section.Title>{id}번째 배너페이지입니다.</Section.Title>
          <div style={{ height: '200px' }}></div>
        </Section>
        <Section bg="tertiary">
          <Section.Title>{id}번째 배너페이지입니다.</Section.Title>
          <div style={{ height: '200px' }}></div>
        </Section>
      </main>
    </Wrapper>
  );
};

export default BannerPage;
