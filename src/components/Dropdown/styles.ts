import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    width: 100%;
    max-width:16.875rem;
    z-index: 100;
    left: -100px;
    top: 0;
    right: 0;
    bottom: 0;
    background: #181B23;
    padding: 1rem 0;    
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 2px 0px;

    display: flex;
    flex-direction: column;
    align-items: center;

    -webkit-animation: slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

    img {
        margin-bottom: 1rem;
        margin-top: 2rem;
    }

    button {
        padding: 0.5rem;
        align-self: flex-end;
        margin-top: -1rem;
    }
`;

export const MenuItem = styled.button`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 1rem;
    background: transparent;
    border: 0;
    margin: 1rem 0;
    
    transition: background 0.2s;

    img {
        width: 20px;
        height: 20px;
        margin: 1rem;

        max-width: 21px;
        max-height: 21px;
    }

    span {
        font-weight: 500;
        color: #FFF;
        margin-left: 1rem;
    }

    :hover {
        background: #353646;
    }

    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        width: 100%;
        outline: none;
    }
`;

export const Titulo = styled.span`  
    color: #FFF;
    width: 100%;
    word-wrap: break-word;    
    padding: 0 1rem; 
    text-align: left; 
`;

export const Subtitulo = styled.span`
    width: 100%;
    color: #FFF;
    word-wrap: break-word;    
    padding: 0 1rem;
    font-size: 0.75rem;
    margin-bottom: 2rem;    
    opacity: 50%;
    text-align: left; 
`;