import React, { PropsWithChildren } from 'react';
import styles from './Section.module.scss';

/** !!!!
 * bg 타입 확보 하기
 */
interface SectionProps {
  children: React.ReactNode;
  bg?: 'gray' | 'white' | 'lightgray';
}

const SectionRoot = ({ children, bg = 'white' }: SectionProps) => {
  return (
    <section
      className={styles.sectionContainer}
      style={{ backgroundColor: bg }}
    >
      <div>{children}</div>
    </section>
  );
};

const Title = ({ children }: PropsWithChildren) => {
  return <p className={styles.sectionTitle}>{children}</p>;
};
Title.displayName = 'Section.Title';

const Section = Object.assign(SectionRoot, {
  Title,
});

export default Section;
