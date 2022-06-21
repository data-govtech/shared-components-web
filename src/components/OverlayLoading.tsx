import { memo } from 'react';
import styled from 'styled-components';

import { LoadingOutlined } from './Icons';

const Overlay = styled.div<{ $absolute?: boolean }>`
  position: ${(p) => (p.$absolute ? 'absolute' : 'fixed')};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 2;
`;

export const OverlayLoading = memo<{ absolute?: boolean }>(({ absolute }) => {
  return (
    <Overlay $absolute={absolute}>
      <LoadingOutlined style={{ fontSize: 30 }} />
    </Overlay>
  );
});
