import styled from "styled-components";

export const Container = styled.div`
    height: 6rem;
    display: grid;
    align-items: center;
    grid-template-columns: 5fr 1fr;
    padding: 0 2rem; 

`;

export const ProfileContainer = styled.div`
    height: 6rem;
    padding: 1rem 0;

    display: flex;
    align-items: center;
    flex-direction: row;


    button {
        padding: 0.5rem 2rem;
        border: 1px solid black;
        background: transparent;
        border-radius: 0.25rem;
        margin-right: 2rem;
        width: 185px;

        transition: transform 0.2s;

        &:hover {
            transform: scale(1.01); 
        }
    }

    button:last-child {
        width: auto;
        font-size: 1px;
        padding: 0;
        border: none;
    }
`;

export const ProfileImage = styled.div`
    img {
        border-radius: 1.5rem;
        width: 50px;
        height: 50px;
        margin-left: auto;
        margin-right: 0.5rem;
    }

`;

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction:column;
    align-itens: center;
    justify-content: center;
    text-align: right;
    margin-right: 1rem;
    padding: 0.01rem 0rem;
    padding-left: 2rem;

    border-left: 2px solid rgba(0,0,0,0.5);

    span: first-child {
        font-size: 0.95rem;
        margin-bottom: 0.25rem;
    }

    
    span: last-child {
        font-size: .85rem;
        opacity: 0.75;
    }
`;


export const InputContainer = styled.div`
    width: 70%;
    height: 3rem;
    
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    background: var(--shape);
    border-radius: 0.5rem;
    border: 0;
    margin-right: 2rem;

    

    input {
        width: 100%;
        height: 100%;
        letter-spacing: 0.5px;
        border: 0;
        background: transparent;
        margin-left: 2rem;
    }

    input:focus {
        outline: none;
    }

    input::placeholder {
        opacity: 60%;
    }

    img {
        width: 16px;
        height: 16px;
    }
`;