import React from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }: { children: React.ReactNode }) => {
  const element = document.getElementById('modal') as HTMLElement;

  return ReactDOM.createPortal(children, element);
};

export default Portal;
