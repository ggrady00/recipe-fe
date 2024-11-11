
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

export const mainContainer = css`

  @media (max-width: 600px) {
    flex-direction: column-reverse;
  }
`