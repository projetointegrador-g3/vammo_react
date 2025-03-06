import { useEffect, useState } from "react";


const Configuracao = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState("pt");

    // Aplicar classe de dark mode no body
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    // Textos dinâmicos para os idiomas
  const textos = {
    pt: { settings: "Configurações", mode: "Modo de visualização", light: "Modo Claro", dark: "Modo Escuro", lang: "Idioma", select: "Selecione o idioma:" },
    en: { settings: "Settings", mode: "Display Mode", light: "Light Mode", dark: "Dark Mode", lang: "Language", select: "Select a language:" },
    es: { settings: "Configuraciones", mode: "Modo de visualización", light: "Modo Claro", dark: "Modo Oscuro", lang: "Idioma", select: "Seleccionar idioma:" },
    jp: { settings: "設定", mode: "表示モード", light: "ライトモード", dark: "ダークモード", lang: "言語", select: "言語を選択：" },
  };


    return(
            <div className="flex flex-col gap-8 p-20 transition-all ml-15">
                <h1 className="text-3xl font-semibold">
                    {textos[language].settings}
                </h1>

                <p>{textos[language].mode}</p>

                {/* Modo claro/escuro */}
                <div className="flex gap-2 items-center">
                    <input type="radio" className='accent-[var(--yellow)]' 
                    checked={!darkMode} onChange={() => setDarkMode(false)} />
                    <label className="mr-10" htmlFor="">{textos[language].light}</label>
                    <input type="radio" checked={darkMode} onChange={() => setDarkMode(true)}/>
                    <label htmlFor="">{textos[language].dark}</label>
                </div>

                {/* Seleção de idioma */}
                <div>
                    <h1 className="text-3xl font-semibold mb-2 mt-5">{textos[language].lang}</h1>
                    <label>{textos[language].select}</label>

                        <select name="options"
                        className="px-3 py-1 mx-2 rounded-full bg-[#191919] text-white"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}>
                        <option value="pt">Português</option>
                        <option value="en">Inglês</option>
                        <option value="es">Espanhol</option>
                        <option value="jp">Japonês</option>
                        </select>
                </div>            
            </div>
    )
}

export default Configuracao;