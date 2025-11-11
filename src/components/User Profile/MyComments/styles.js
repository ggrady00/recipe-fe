import { css } from "@emotion/react";

export const commentBox = css`
cursor: pointer;
margin: 8px;
padding: 8px;
border: 1px solid #ccc;
border-radius: 8px;


&:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
`

export const commentInfo = css`
display: flex;
align-items: center;
gap: 8px;
`

export const commentBoxContent = css`

`