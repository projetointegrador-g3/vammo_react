import { createContext, ReactNode, useState } from "react"
import { login } from "../services/Service"
import UsuarioLogin from "../model/UsuarioLogin"
import { ToastAlert } from "../utils/ToastAlert"

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        tipo_user: "",
        nome: "",
        data_aniversario: "",
        genero: "",
        usuario: "",
        senha: "",
        foto: "",
        avaliacao: 0,
        token: ""
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await login(`/usuarios/login`, usuarioLogin, setUsuario)
            ToastAlert("O Usuário foi autenticado com sucesso!", "sucesso")
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            ToastAlert("Os dados do usuário estão inconsistentes!", "erro")
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
            avaliacao: 0,
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}