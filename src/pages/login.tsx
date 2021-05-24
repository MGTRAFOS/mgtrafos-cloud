import React, { FormEvent, useContext, useState } from 'react';

import { Form, Container } from '../styles/login';

import logo from '../assets/logo-black.png';

import { AuthContext } from '../contexts/AuthContext';
import Loader from 'react-loader-spinner';

export default function Login() {
    const { handleLogin, loading } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        await handleLogin({
            email: email,
            password: password,
        });
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <img src={logo} alt="Logo" />

                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                {loading ? (
                    <button type="submit">
                        <Loader
                            type="TailSpin"
                            color="#FFF"
                            height={40}
                            width={40}
                        />
                    </button>
                ) : (
                    <button type="submit">Entrar</button>
                )}
            </Form>
        </Container >

    )
}