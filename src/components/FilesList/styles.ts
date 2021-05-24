import styled from "styled-components";

export const Container = styled.div`
    margin: 0 2rem;

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
            width: 2.5rem;
            height: 2.5rem;
            margin-right: 1rem;
        }  

        a { 
            text-decoration: none;
            color: rgba(0,0,0,0.75);
        }
`;

export const ContainerTable = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 600px;
`;