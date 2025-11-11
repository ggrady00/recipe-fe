import { css } from "@emotion/react";

export const ratingsBox = css`
    cursor: pointer;
    margin: 8px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 500px;

    &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
`

export const ratingsBoxContent = css`
    display: flex;
    justify-content: space-between;
`

export const grid = css`
    display: flex;
    justify-content: space-between;
`