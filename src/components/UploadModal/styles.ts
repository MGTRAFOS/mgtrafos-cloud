import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 400px;
    margin: 2rem;
    background: #FFF;
    border-radius: 0.25rem;
    padding: 1.5rem;    
`;

const dragActive = css`
    border-color: #78e5d5;
`;

const dragReject = css`
    border-color: #e57878;
`;

type IDropContainer = {
    isDragActive?: boolean;
    isDragReject?: boolean;
};

export const DropContainer = styled.div<IDropContainer>`
    border: 1px dashed #ddd;
    border-radius: 0.25rem;
    cursor: pointer;

    transition: height 0.2s ease;

    ${(props: any) => props.isDragActive && dragActive};
    ${(props: any) => props.isDragReject && dragReject};
`;

const messageColors = {
    default: "#999",
    error: "#e57878",
    success: "#78e5d5",
};

interface ITypeMessageColor {
    type?: "default" | "error" | "success";
}

export const UploadMessage = styled.p<ITypeMessageColor>`
    display: flex;
    color: ${(props) => messageColors[props.type || "default"]};
    justify-content: center;
    align-items: center;
    padding: 15px 0;
`;