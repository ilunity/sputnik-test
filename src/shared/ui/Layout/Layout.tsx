import React from 'react';
import { StyledContent, StyledHeader, StyledLayout } from './Layout.styles';
import { LayoutProps } from './Layout.types';


export const Layout: React.FC<LayoutProps> = ({ children, header }) => (
  <StyledLayout>
    {header && <StyledHeader>{header}</StyledHeader>}
    <StyledContent>
      {children}
    </StyledContent>
  </StyledLayout>
);
