import { createContext, ReactNode, useState } from "react"
import { login } from "../services/Service"
import Login from "../model/Login"

interface AuthContextProps {
    usuario: Login
    handleLogout(): void
    handleLogin(usuario: Login): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<Login>({
        id: 0,
        tipo_user: "",
        nome: "",
        data_aniversario: "",
        genero: "",
        usuario: "",
        senha: "",
        foto: "",
        avaliacao: "",
        token: ""
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleLogin(usuarioLogin: Login) {
        setIsLoading(true)
        try {
            await login(`/usuarios/login`, usuarioLogin, setUsuario)
            alert("O Usuário foi autenticado com sucesso!")
        } catch (error) {
            alert("Os Dados do usuário estão inconsistentes!")
        }
        setIsLoading(false)
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            tipo_user: "",
            nome: "",
            data_aniversario: "",
            genero: "",
            usuario: "",
            senha: "",
            foto: "",
            avaliacao: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}