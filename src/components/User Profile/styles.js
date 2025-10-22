import { css } from "@emotion/react";

export const paper = css`
  width: 95%;
  height: 100%;
  padding: 16px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;



export const avatar = css`
  width: 100px;
  height: 100px;
`

export const avatarIcon = css`
  position: relative;
  display: inline-block;
`

export const editButton = css`
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: white;
    padding: 4px;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
`

export const profile = css`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`

export const topBar = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const profileInfo = css`
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const buttons = css`
  display: flex;
  gap: 8px;
`