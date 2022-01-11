import styled from '@emotion/styled';
import { css } from '@emotion/react';

const flex = css`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const FetchWrapperContainer = styled.div``;

export const FetchWrapperHeader = styled.div`
  ${flex};
  height: ${({ height }) => height}px;
  visibility: ${({ height }) => height ? 'visible' : 'hidden'};
  opacity: min(${({ height, maxHeight }) => height / maxHeight}, 1);
  transition: all 0.5s ease-out;
`;

export const FetchWrapperBody = styled.div``;

export const FetchWrapperFooter = styled.div`
  ${flex};
  height: 80px;
  margin-top: 10px;
  padding-bottom: calc(${({ theme }) => theme.mixins.toolbar.minHeight}px + env(safe-area-inset-bottom, 0) + 10px);
`;
