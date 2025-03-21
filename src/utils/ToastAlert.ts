import { toast } from 'react-toastify';

export function ToastAlert(mensagem: string, tipo: string, response?: any) {
    switch (tipo) {
            
        case 'sucesso':
            toast.success(mensagem, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'dark',
                progress: undefined,
            });
            break;

        case 'erro':
            toast.error(mensagem, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'dark',
                progress: undefined,
            });
            break;

            case 'info':
            default:
            toast.info(mensagem, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'dark',
                progress: undefined,
            });
            break;
    }
}