
import { css } from '@emotion/react';

export const appBar = css`
  border-radius: 15px;
  margin: 30px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const heading = css`
  color: rgba(0,183,255, 1);
`;

export const image = css`
  margin-left: 15px;
`;

export const button = css`
  margin-left: 15px;
  background-color: rgba(0,183,255, 1);
  &:hover {
    background-color: rgba(0,133,255, 1);
  }
`;

export const toolbar = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const centerToolbar = css`
  display: flex;
  align-items: center;
`;

export const mainContainer = css`

  @media (max-width: 600px) {
    flex-direction: column-reverse;
  }
`