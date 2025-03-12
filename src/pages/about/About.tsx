import { Github, Instagram, Linkedin } from 'lucide-react';
import Footer from '../../components/footer/Footer';
import './About.css'

function Sobre() {
    return (
        <>
            <section className='flex flex-col gap-10 items-center justify-center pl-25 p-10 resp-about'>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold'>Conheça nosso talentoso time</h1>
                    <p>Esse é o grupo de pessoas que transformou o Vammo em realidade, um time de <br />
                        desenvolvedores altamente capacitados com o para trazer benefícios para você e o seu negócio!</p>
                </div>

                <div className='grid grid-cols-2 gap-12'>
                    {[
                        { nome: 'Andressa Ferreira', emoji: '💻', img: 'Andressa.png', desc: 'Desenvolvedora FullStack e estudante de Segurança da Informação.' },
                        { nome: 'Beatriz Rodrigues', emoji: '🚀', img: 'Beatriz.png', desc: 'Jornalista em transição para a área de tecnologia e atualmente estudo Desenvolvimento FullStack.' },
                        { nome: 'Bruno Lima', emoji: '🎯', img: 'Bruno.png', desc: 'Como alguém que veio da área acadêmica e está migrando para a tecnologia, uso meu TDAH como um superpoder.' },
                        { nome: 'Emily Cristiny', emoji: '🔧', img: 'Emily.png', desc: 'Estudante de Engenharia de Software e desenvolvedora FullStack em mais de 3 linguagens de programação.' },
                        { nome: 'Fernanda Ribeiro', emoji: '🎨', img: 'Fernanda.png', desc: 'Formada em Adm, com expertise na área de design, e fazendo transição para tecnologia.' },
                        { nome: 'Josadaque Ferreira', emoji: '🛠️', img: 'Josadaque.png', desc: 'Como ex-ajudante de obra, migrei para a tecnologia e sou apaixonado por back-end.' },
                        { nome: 'Victor Pestana', emoji: '🌍', img: 'Victor.png', desc: 'Vivendo anos na Europa, adquiri inglês fluente e estudo sistemas da informação.' },
                        
                    ].map((dev, index) => (

                        <section key={index} className='flex gap-5 items-start resp-dev'>
                            <img src={`https://ik.imagekit.io/grupo03/perfis/${dev.img}`} alt={`Foto de ${dev.nome}`} className='w-40 h-40 object-cover rounded-4xl' />
                            <div className='w-full'>
                                <h3 className='text-xl font-semibold'>{dev.nome}</h3>
                                <p className='text-md font-medium'>{dev.emoji} Desenvolvedor(a) Full Stack JS/TS</p>
                                <p className='text-sm'>{dev.desc}</p>
                                <div className='flex gap-2 mt-3 resp-icons-about'>
                                    <Linkedin className='hover:text-[#7524f3] size-6 cursor-pointer' />
                                    <Instagram className='hover:text-[#7524f3] size-6 cursor-pointer' />
                                    <Github className='hover:text-[#7524f3] size-6 cursor-pointer' />
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </section>
        <Footer />
        </>
    );
}

export default Sobre;
