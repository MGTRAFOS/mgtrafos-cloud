import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: space-between;

    background: var(--shape);

    padding: 1rem 0rem;

    span {
        width: 100%;
        font-weight: 600;
    }

`;

export const Folder = styled.div`
    width: 100%;
    height: 2rem;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    margin-top: 0.5rem;

    cursor: pointer;

    opacity: 60%;

    span {
        font-weight: 400;
    }

    img {
        margin-right: 1rem;
    }

    &:hover {
        opacity: 100%;
        background: #ffff;
    }
`;

export const ButtonPlus = styled.button`
    width: 100%;
    height: 2.5rem;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    background: var(--blue);
    color: #FFF;

    border: 0;
    border-radius: 0.5rem;

    font-weight: 700;

    padding: 0 1.5rem;
    letter-spacing: 1px;

    margin-bottom: 2rem;
    margin-top: 3rem;

    img {
        width: 16px;
        height: 16px;
    }

    span {
        margin-left: 1rem;
    }
`;

export const ButtonInvisible = styled.button`
    width: 100%;
    height: 2.5rem;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    background: transparent;

    border: 0;
    border-radius: 0.5rem;


    padding: 0 1.5rem;
    letter-spacing: 1px;

    margin-bottom: 2rem;
    margin-top: 3rem;
`;

export const StorageCount = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: flex-start;
    padding: 0 0.75rem;
    margin-top: 4rem;
    
    width: 100%;

    span:first-child {
        opacity: 50%;
        margin-bottom: 0.75rem;
    }

    span:last-child{
        font-size: 0.75rem;
        opacity: 0.5;
    }

    div {
        width: 100%;
        height: 2px;
        border-radius: 4px;
        background-color: #dcdde0;
        position: relative;
        margin-bottom: 0.75rem;


        div {
            width: 10%;
            height: 2px;
            border-radius: 4px;
            background-color: var(--blue);
        }
    }
`;

export const Menu = styled.div`
    margin-top: 2.5rem;
`;

export const NewFolderForm = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    background: var(--background);
    margin-top: -1rem;
    width: 12.75rem;
    height: 4rem;
    justify-content: center;
    align-items: center;

    input {
        height: 2rem;
        background: #fff;
        padding: 1rem;
        margin-bottom: 1rem;
    }

    button:last-child {
        background: var(--blue);
        border: none;
        font-size: 1rem;
        padding: 0.3rem;
    }
`;

export const TableContainer = styled.div`
    width: 100%;

    table {
        width: 100%;
        border-spacing: 0;
        text-align: center;
    }

    th {
            color: rgba(0,0,0,0.40);            
            font-weight: 400;
            line-height: 1.5rem;
            padding: 2rem 0;

            &:nth-child(2) {
                text-align: left;
            }
        }

        tr{
            &:hover {
                background: rgba(0,0,0,0.015);
            }
        }

        td {
            border-bottom: 1px solid var(--shape);
            border-top: 1px solid var(--shape);
            color: var(--text-body);

            &:first-child {
                text-align: center;
                padding: 1rem 0rem;
            }

            &:nth-child(2) {
                text-align: left;
            }

            button {
                border: 0;
                background: transparent;
                font-size: 2rem;
            }
        } 

        img {
            width: 2rem;
            height: 2rem;
            margin-right: 0.5rem;
        }  

        a { 
            text-decoration: none;
            color: rgba(0,0,0,0.75);
        }
`;