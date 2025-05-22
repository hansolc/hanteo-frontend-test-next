import React, { PropsWithChildren } from 'react';
import { wrapper } from './Wrapper.module.scss';

const Wrapper = ({ children }: PropsWithChildren) => {
  return <div className={wrapper}>{children}</div>;
};

export default Wrapper;
