import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 1rem 2rem;
    justify-content:center;
    row-gap: 1.5rem;
    column-gap: 1.5rem;

    @media (max-width: 1600px) { 
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const FileCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;

    width: 12rem;
    height: 12rem;

    background: var(--shape);

    transition: transform 0.3s;

    span {
        font-size: 0.85rem;
        margin-bottom: 0.5rem;

        &:last-child {
            margin-bottom: -0.5rem;
            font-size: 0.75rem;
            opacity: 70%;
        }
    }

    img {
        width: 75px;
        height: 75px;
        margin-bottom: 2rem;
    }

    &:hover {
        transform: translateY(-3%);
        filter: brightness(0.98);
    }
`;

