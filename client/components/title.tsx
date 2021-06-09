import React from 'react';

const Title: React.FC = ({ children }) => (
  <h1 style={{ paddingBottom: '10px' }} className="ui header">
    {children}
  </h1>
);

export default Title;
