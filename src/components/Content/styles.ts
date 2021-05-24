import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    overflow:auto;

    .modeDisplay {
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin: 1rem 2rem;

        .active {
            background: var(--shape);
        }

        span {
            font-weight: 700;             
        }

        button {
            border-radius: 50%;
            padding: 0.5rem;
            margin-left: 1rem;
            border: none;
            background:transparent;
            align-items: center;
            justify-content: center;
        }

        img {
            width: 16px;
            height: 16px;
        }
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

export const ActionsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;

    img {
        width: 1.25rem;
        height: 1.25rem;
        cursor: pointer;
    }
`;

export const ContainerEditProfile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0rem;

    img {
            width: 5rem;
            height: 5rem;
        }
`;

export const CheckBoxContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    margin-top: 2rem;
    padding: 1rem;

        input {
            margin-right: 1rem;
            margin-left: 0.25rem;
        }

        div {
            display: flex;
            flex-direction: row;
        }
`;

export const HeaderEditProfile = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    width: 100%;

    div {
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
    }

    span {
        opacity: 75%;
        line-height: 1.5rem;
    }
`;

export const FooterEditProfile = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-top: 1rem;

    button {
        margin-left: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        border: 1px solid rgba(0,0,0,0.5);

        img {
            width: 1rem;
            height: 1rem;
            margin-right: 0.5rem;
        }
    }
`;
