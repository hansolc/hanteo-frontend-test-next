import React, { PropsWithChildren } from 'react';
import styles from './Section.module.scss';

interface SectionProps {
  children: React.ReactNode;
  bg?: 'primary' | 'secondary' | 'tertiary';
}

const BG_CLASS_MAP = {
  primary: styles.bgPrimary,
  secondary: styles.bgSecondary,
  tertiary: styles.bgTertiary,
} as const;

const SectionRoot = ({ children, bg = 'primary' }: SectionProps) => {
  return (
    <section className={`${styles.sectionContainer} ${BG_CLASS_MAP[bg]}`}>
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
