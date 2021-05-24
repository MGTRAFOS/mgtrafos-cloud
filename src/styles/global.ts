import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    ::-webkit-scrollbar {
        width: 0px;
    }

    :root {        
        --shape: rgba(245,245,245,1);
        --background: #FFF;
        --blue: #4B88FF;

        --gray-300: #A8A8B3;
        --gray-900: #121214;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%;
        }

        @media (max-width: 720px) {
            font-size: 87.5%;
        }
    }

    body {
        background: var(--background);
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
    }

    body, input, textarea, button {
        font-family: 'Inter', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    @-webkit-keyframes slide-right {
        0% {
            -webkit-transform: translateX(0);
                    transform: translateX(0);
        }
        100% {
            -webkit-transform: translateX(100px);
                    transform: translateX(100px);
        }
        }
    @keyframes slide-right {
        0% {
            -webkit-transform: translateX(0);
                    transform: translateX(0);
        }
        100% {
            -webkit-transform: translateX(100px);
                    transform: translateX(100px);
        }
    }

    button {
        cursor: pointer;

        :focus {
            outline: none;
        }
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .react-modal-overlay {
        background: rgba(0,0,0,0.5);

        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .react-modal-content {
        width: 100%;
        max-width: 70vw;
        max-height: 70vh;
        background: var(--background);
        padding: 3rem;
        position: relative;
        border-radius: 0.25rem;
        overflow: auto;
    }

    .react-modal-content-users {
        width: 100%;
        max-width: 70vw;
        max-height: 70vh;
        background: var(--background);
        padding: 3rem;
        position: relative;
        border-radius: 0.25rem;
        overflow: auto;
    }

    .react-modal-close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 0;
        background: transparent;

        transition: transform 0.2s;

        &:hover {
            transform: scale(1.2);
        }
    }

    .arrowImg {
        width: 1px;
        height: 1px;
    }

    .navbar {
        height: 4rem;
        margin: 1rem 2rem;
    }

    .navbar-nav {
        max-width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
    }

    .nav-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon-button {
        width: auto;
        font-size: 1px;
        padding: 0;
        border: none; 
        background: transparent;

        img {
            width: 12px;
            height: 12px;
        }       
    }

    .dropdown {
        position: absolute;
        top: 5.25rem;
        width: 200px;
        right: 4rem;
        background: var(--background);  
        padding: 1rem 0;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 2px 0px;
        border-radius: 0.5rem;
        z-index: 2;
    }

    .profileDropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 3rem;
    }

    .profileDropdown img {
        width: 50px;
        height: 50px;
    }

    .profileDropdown span:last-child {
        font-size: 0.85rem;
    }

    .menu-item {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        padding: 0.5rem;
        background: transparent;
        border: 0;

        transition: filter 0.2s;

        img {
            width: 24px;
            height: 24px;
        }

        span {
            margin-left: 1rem;
        }

        :hover {
            background: var(--shape);
        }
    }

    .menu-item:hover{
        filter: brightness(0.8);
    }

    .btn_upload {
        padding: 0.5rem 3rem;
        border: 1px solid black;
        background: transparent;
        border-radius: 0.25rem;
        margin-right: 2rem;
        width: 11rem;

        transition: border 0.2s;

        &:hover {
            border: 1px solid silver; 
        }
    }

    .containerModalFolderCreate {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;

        .containerInput {
            padding: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            border: 1px solid #A8A8B3;
            width: 100%;
            background-color: var(--shape);
            border-radius: 4px;
            margin-bottom: 1rem;

            input {               
                margin-left: 0.5rem;
                border: none;
                outline: none;
                width: 100%;
                background-color: var(--shape);
            }
        }

        .containerButton {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 100%;

            button {
                padding: 0.5rem 2rem;
                margin-left: 0.5rem;
                border-radius: 4px;
                border: 0.5px solid #A8A8B3;
                background: #ffff;
                transition: filter 0.2s;

                &:hover {
                    filter: brightness(0.8);    
                }
            }
        }

        .containerFoldersDelete{
            display: flex;
            align-items: center;
            justify-content: space-between;

            width:100%;
            margin-top: 1rem;
            background: var(--shape);
            padding: 1rem;

            img {
                margin-right: 1rem;                
            }

            span {
                margin-right: 2rem;
            }
        }

        
    }
`;