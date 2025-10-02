/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const media = css`
  height: 0;
  padding-top: 56.25%;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;
`;

export const fullscreenMedia = css`
  height: 0;
  padding-top: 25%;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;
`;

export const border = css`
  border: solid;
`;


export const card = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  height: 100%;
  position: relative;
  width: 350px;
`;

export const fullscreenCard = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow-y: auto;
`;

export const overlay = css`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
`;

export const overlay2 = css`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
`;

export const grid = css`
  display: flex;
`;

export const details = css`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

export const title = css`
  padding: 0 16px;
`;

export const cardActions = css`
  padding: 0 8px 4px 8px;
  display: flex;
  justify-content: space-between;
`;

export const fullscreenCardActions = css`
  padding: 0 16px 8px 16px;
  display: flex;
  justify-content: flex-start;
  gap: 16px;
`;

export const allComments = css`
  display: flex;
  gap: 8px;
  
`

export const commentSection = css`
  padding-bottom: 20px;
`