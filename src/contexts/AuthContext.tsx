import { ReactNode, createContext, useEffect, useState } from 'react';
import api from '../services/api';
import history from '../history';

interface LoginInput {
    email: string,
    password: string,
}

interface AuthProviderProps {
    children: ReactNode,
}

interface AuthContextData {
    authenticated: boolean,
    loading: boolean,
    handleLogin: (login: LoginInput) => Promise<void>,
    handleLogout: () => void,
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

export function AuthProvider({ children }: AuthProviderProps) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem('@mgtrafos/token');

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    async function handleLogin(loginInput: LoginInput) {
        setLoading(true);
        await api.post('/authenticate', {
            email: loginInput.email,
            password: loginInput.password,
        }).then(response => {
            const { data } = response;
            if (data) {
                console.log(data);
                sessionStorage.setItem('@mgtrafos/group_administrativo', JSON.stringify(data.user.group_administrativo));
                sessionStorage.setItem('@mgtrafos/group_contratos', JSON.stringify(data.user.group_contratos));
                sessionStorage.setItem('@mgtrafos/group_comercial', JSON.stringify(data.user.group_comercial));
                sessionStorage.setItem('@mgtrafos/group_financeiro', JSON.stringify(data.user.group_financeiro));
                sessionStorage.setItem('@mgtrafos/group_meioAmbiente', JSON.stringify(data.user.group_meioAmbiente));
                sessionStorage.setItem('@mgtrafos/group_tecnico', JSON.stringify(data.user.group_tecnico));
                sessionStorage.setItem('@mgtrafos/group_seguranca', JSON.stringify(data.user.group_seguranca));
                sessionStorage.setItem('@mgtrafos/group_pedreira', JSON.stringify(data.user.group_pedreira));
                sessionStorage.setItem('@mgtrafos/group_fotos', JSON.stringify(data.user.group_fotos));
                sessionStorage.setItem('@mgtrafos/isAdmin', JSON.stringify(data.user.isAdmin));

                sessionStorage.setItem('@mgtrafos/token', JSON.stringify(data.token));
                sessionStorage.setItem('@mgtrafos/user_name', JSON.stringify(data.user.name));
                sessionStorage.setItem('@mgtrafos/user_id', JSON.stringify(data.user._id));
                sessionStorage.setItem('@mgtrafos/user_email', JSON.stringify(data.user.email));
                api.defaults.headers.Authorization = `Bearer ${data.token}`;
                setAuthenticated(true);
                setLoading(false);
                history.push('/');
                window.location.reload();
            }
        }).catch(error => {
            const msgError = error.response.data.error;
            alert(msgError);
            setLoading(false);
        });
    }

    function handleLogout() {
        setAuthenticated(false);
        sessionStorage.removeItem('@mgtrafos/token');
        api.defaults.headers.Authorization = undefined;
        history.push('/login');
    }

    return (
        <AuthContext.Provider value={{ authenticated, handleLogin, handleLogout, loading }}>
            {children}
        </AuthContext.Provider>
    )

}

