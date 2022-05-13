import { memo } from 'react';
import styled from 'styled-components';

const Style = styled.span`
  font-size: 0.8rem;
  margin-left: 1rem;
  background-color: #87d068;
  border: 0;
  color: #fff;
  line-height: 1.7;
  border-radius: 2px;
  padding: 2px 8px;
`;

export const BetaTag = memo((props) => <Style {...props}>BETA</Style>);
