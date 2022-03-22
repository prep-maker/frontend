import React from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }: { children: React.ReactNode }) => {
  let portalRoot = document.getElementById('modal') as HTMLElement;

  if (!portalRoot) {
    portalRoot = document.createElement('div') as HTMLElement;
    portalRoot.setAttribute('id', 'portal');
    document.body.appendChild(portalRoot);
  }

  return ReactDOM.createPortal(children, portalRoot);
};

export default Portal;
