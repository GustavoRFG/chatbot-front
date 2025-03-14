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
      const res = await fetch("https://d277-2804-1b2-11c0-4927-8456-6eb7-1faf-fc90.ngrok-free.app/chatbot", {
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
      <h1 className="text-3xl sm:text-5xl font-bold mt-4 text-center">EduBot - Assistente Escolar</h1>
      <p className="text-lg sm:text-xl text-center mt-2 opacity-90">
        Tire suas dúvidas sobre a escola, horários, regras e muito mais.
      </p>

      {/* CAMPO DE PERGUNTA */}
      <div className="w-full max-w-xl mt-6 flex flex-col items-center">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Digite sua pergunta..."
          className="w-full p-3 rounded-xl text-black text-lg focus:outline-none"
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

      {/* RODAPÉ */}
      <footer className="mt-8 text-sm opacity-80">© {new Date().getFullYear()} EduBot - Colégio do Sol</footer>
    </div>
  );
}
