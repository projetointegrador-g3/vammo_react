import { Facebook, Instagram, Linkedin } from "lucide-react"
import Footer from "../../components/footer/Footer"
import { Input } from "../../components/ui/input"


function Contact(){
    return(
        <>
        <section className='flex flex-col gap-10 items-center justify-center pl-20 p-10 '>
                        <div className='text-center'>
                            <h1 className='text-3xl font-bold'>Contato</h1>
                            <p>Precisa de ajuda, suporte ou gostaria de deixar um comentário?<br />
                                Entre em contato com o nosso time </p>
                        </div>
                        <form action="">
                            <label htmlFor="nome" className="ml-2">Nome</label>
                            <br />
                            <Input type="text" name="nome" placeholder="Informe o seu nome" className="w-80 mb-2"/>

                            <label htmlFor="email" className="ml-2">Email</label>
                            <br />
                            <Input type="email" name="email" placeholder="Informe um email válido" className="w-80 mb-2"/>

                            <label htmlFor="mensagem" className="ml-2">Mensagem</label>
                            <br />
                            <textarea name="message" id="mensagem" placeholder="Digite aqui a sua mensagem" className="border border-zinc-400 rounded-4xl w-80 p-3"></textarea>
                            <br />
                            <button className="border rounded-full bg-[var(--black)] text-[var(--white)] p-2 px-3 w-80 cursor-pointer transition duration-0.3 hover:scale-105 mb-4">Enviar</button>
                        </form>
        
                        
                        
        </section>
        <Footer />

        </>
        
        

    )
}
export default Contact