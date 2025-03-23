"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Função para enviar a pergunta ao backend Flask
  const sendQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("https://5faf-177-18-17-29.ngrok-free.app/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Erro ao conectar com o servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6">
      {/* LOGO */}
      <Image src="/logo.png" alt="Chatbot Logo" width={120} height={120} />
      
      {/* TÍTULO */}
      <h1 className="text-3xl sm:text-5xl font-bold mt-4 text-center">EducBot - Assistente Escolar</h1>
      <p className="text-lg sm:text-xl text-center mt-2 opacity-90">
        Tire suas dúvidas sobre a escola, horários, regras e muito mais.
      </p>

      {/* ORIENTAÇÃO SIMPLES */}
      <p className="mt-4 text-center text-sm sm:text-lg opacity-80">
        Digite sua pergunta sobre o horário das aulas, matrícula, atividades ou qualquer outra dúvida escolar.
      </p>

      {/* CAMPO DE PERGUNTA */}
      <div className="w-full max-w-xl mt-6 flex flex-col items-center">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Exemplo: 'Qual o horário das aulas?'"
          className="w-full p-3 rounded-xl text-black text-lg focus:outline-none bg-gradient-to-r from from-transparent to-transparent border-2 border-gray-400 focus:border-yellow-500 transition"
        />

        
        <button
          onClick={sendQuestion}
          className="mt-3 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 transition rounded-xl font-bold"
        >
          Perguntar
        </button>
      </div>

      {/* ÁREA DE RESPOSTA */}
      <div className="w-full max-w-xl mt-6 p-4 bg-white/20 rounded-lg shadow-md">
        {loading ? (
          <p className="text-center text-xl font-semibold">Pensando... ⏳</p>
        ) : response ? (
          <p className="text-lg font-medium">{response}</p>
        ) : (
          <p className="text-center text-lg opacity-70">Aguardando pergunta...</p>
        )}
      </div>

      {/* BOTÃO DE AJUDA/ORIENTAÇÃO DETALHADA */}
      <div className="mt-6">
        <button
          onClick={() => alert('Para interagir com o EducBot, basta digitar uma pergunta. Por exemplo, você pode perguntar sobre os horários de aula, a política de uso de celular, ou sobre eventos escolares. Se você tiver dificuldades, estamos aqui para ajudar!')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl font-bold"
        >
          Como usar o EducBot?
        </button>
      </div>

      {/* RODAPÉ */}
      <footer className="mt-8 text-sm opacity-80">© {new Date().getFullYear()} EducBot - Colégio do Sol</footer>
    </div>
  );
}
