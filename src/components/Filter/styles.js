
import { css } from '@emotion/react';

export const filterBar = css`
  border-radius: 15px;
  margin: 30px 0;
  display: flex;
  align-items: center;
  gap: 1rem
`;

export const filterFields = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  
  & > .filter-autocomplete {
    flex: 1;
  }
`;

export const button = css`
  margin-left: 15px;
  background-color: rgba(0,183,255, 1);
  &:hover {
    background-color: rgba(0,133,255, 1);
  }
`;