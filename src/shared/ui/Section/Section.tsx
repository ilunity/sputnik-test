import React from 'react';
import { ActionContainer, SectionContainer, SectionHeading, SectionTitle } from './Section.styles';
import { SectionProps } from './Section.types';


export const Section: React.FC<SectionProps> = ({ title, children, action, level = 2 }) => (
  <SectionContainer>
    <SectionHeading>
      {title &&
        <SectionTitle level={level}>
          {title}
        </SectionTitle>
      }
      <ActionContainer
        size={4}
        wrap
      >
        {action}
      </ActionContainer>
    </SectionHeading>
    <div>
      {children}
    </div>
  </SectionContainer>
);
