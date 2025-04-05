"use client";

import { useState } from "react";
import Image from "next/image";

// Lista de FAQs
const faqs = [
  {
    category: "geral",
    question: "Horário das aulas",
    answer: "A escola adota horários diferenciados para cada etapa de ensino, visando o melhor aproveitamento do tempo para cada faixa etária:\n\n- Educação Infantil: O horário matutino vai das 7h30 às 11h50, e o vespertino das 13h30 às 17h50. \n- Ensino Fundamental I: O matutino é das 7h30 às 12h, e o vespertino das 13h30 às 18h. \n- Ensino Fundamental II (6º ao 8º ano): Aulas das 7h30 às 12h. \n- Ensino Fundamental II (9º ano) e Ensino Médio: Das 7h30 às 12h50. Esses horários podem variar em caso de eventos escolares ou atividades especiais, por isso, consulte o calendário acadêmico no início de cada semestre."
  },
  {
    category: "geral",
    question: "Eventos escolares",
    answer: "Nossa escola organiza diversos eventos ao longo do ano para promover o envolvimento dos alunos em atividades culturais, científicas e sociais. Alguns dos principais eventos incluem: \n\n- Feira de Ciências (15 de maio): Uma exposição onde os alunos apresentam projetos científicos criados ao longo do semestre.\n- Semana Cultural (20 a 25 de junho): Uma semana dedicada à arte, cultura e apresentações interdisciplinares dos alunos.\n- Festa Junina (10 de julho): Uma tradicional festa junina, com barracas, danças e apresentações culturais.\n- Formatura (15 de dezembro): Celebração do fim do ano letivo com a cerimônia de formatura dos alunos do Ensino Médio.\n\nFique atento ao calendário escolar para mais detalhes sobre cada evento."
  },
  {
    category: "geral",
    question: "Boletim escolar",
    answer: "Os boletins escolares estão disponíveis no portal do aluno e podem ser acessados a qualquer momento pelos pais e responsáveis. Os boletins são atualizados periodicamente com as notas e comentários dos professores sobre o desempenho dos alunos. Caso precise de esclarecimentos sobre o boletim ou queira discutir a performance acadêmica de seu filho, entre em contato com a coordenação pedagógica ou agende uma reunião com os professores."
  },
  {
    category: "geral",
    question: "Matrícula",
    answer: "As matrículas para o ano letivo estão abertas de janeiro a março, e para garantir o melhor atendimento, é necessário agendar a matrícula antecipadamente. Para completar o processo, os seguintes documentos são exigidos: \n\n- RG e CPF dos responsáveis e do aluno.\n- Certidão de Nascimento do aluno.\n- Comprovante de residência atualizado.\n- Histórico escolar, caso o aluno tenha estudado em outra instituição.\n\nAlém disso, novos alunos devem passar por uma entrevista pedagógica para entender suas necessidades e garantir a melhor integração com o nosso ambiente educacional."
  },
  {
    category: "geral",
    question: "Uso de celular",
    answer: "O uso de celulares é estritamente proibido durante as aulas, recreios e intervalos, conforme a Lei 4.932/2024, para garantir que os alunos se concentrem nas atividades pedagógicas. Cada sala de aula possui um compartimento trancado onde os celulares devem ser guardados no início de cada aula e só serão devolvidos ao final do período letivo. Exceções a essa regra são feitas apenas quando os celulares são utilizados para fins pedagógicos, com autorização dos professores, ou em casos de emergência."
  },
  {
    category: "geral",
    question: "Contato com professores",
    answer: "Os professores da nossa escola estão sempre disponíveis para apoiar o desenvolvimento dos alunos. O contato com os professores pode ser feito por e-mail institucional, que é fornecido a cada aluno, ou através do agendamento de reuniões via o aplicativo ClassApp, que também oferece a possibilidade de comunicação direta. Para questões mais urgentes ou questões que exigem uma reunião mais detalhada, recomendamos que entre em contato com a coordenação pedagógica, que pode ajudar a agendar a melhor hora para conversar com o professor."
  },
  {
    category: "geral",
    question: "Declaração de frequência",
    answer: "Caso precise de uma declaração de frequência escolar, você pode solicitá-la diretamente na secretaria ou pelo portal do aluno. O processo é simples e rápido, e a declaração será emitida em até 3 dias úteis. Essa declaração pode ser necessária para justificar faltas ao trabalho ou para a solicitação de benefícios, entre outras situações."
  },
  {
    category: "geral",
    question: "Refeitório e alimentação",
    answer: "Nossa escola oferece refeições saudáveis e balanceadas em nosso refeitório, seguindo as diretrizes da Lei Distrital nº 5.146/2013, com o objetivo de promover a saúde e bem-estar dos alunos. Além disso, é permitido que os alunos tragam lanche de casa, mas pedimos que tragam opções saudáveis, evitando bebidas açucaradas e industrializadas. A equipe do refeitório sempre prioriza alimentos frescos e nutritivos para garantir que todos os alunos tenham uma alimentação adequada durante o dia escolar."
  },
  {
    category: "geral",
    question: "Atividades extracurriculares",
    answer: "A escola oferece uma ampla gama de atividades extracurriculares, projetadas para enriquecer a experiência educacional e desenvolver talentos e habilidades fora da sala de aula. Dentre as opções estão: \n\n- Oficinas de teatro, música, robótica, esportes e clubes acadêmicos. \n- Aulas de arte e cultura. \n- Programas de voluntariado e de integração comunitária. \n\nAs inscrições para essas atividades são realizadas no início de cada semestre. Incentivamos os alunos a participarem para desenvolver novas habilidades e interagir com outros estudantes de diferentes turmas e idades."
  },
  {
    category: "geral",
    question: "Suporte psicológico",
    answer: "Nosso colégio oferece apoio psicológico aos alunos que necessitam de orientação emocional ou que estão passando por dificuldades no seu processo de aprendizagem ou convivência escolar. A equipe de profissionais especialistas está disponível para atendimentos individuais ou em grupo, buscando oferecer suporte adequado e orientar os alunos para um melhor desenvolvimento emocional. Para agendar uma consulta, os responsáveis ou o próprio aluno podem entrar em contato com a coordenação ou diretamente com o SOE (Serviço de Orientação Educacional)"
  }
];

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<string | null>(null);

  // Função para enviar a pergunta ao backend Flask
  const sendQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse(null);

    try {
        const res = await fetch("https://a897-2804-1b2-11c0-5e9d-7c07-c6-5968-27f.ngrok-free.app/chatbot", {
        // const res = await fetch("http://localhost:5001/chatbot", {
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
      {/* LISTA DE FAQs */}
      <div className="w-full max-w-xl mt-6 p-4 bg-white/20 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Perguntas Frequentes</h2>
        <ul className="space-y-2">
          {faqs.map((faq, index) => (
            <li
              key={index}
              className="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition"
              onClick={() => setSelectedFaq(faq.question === selectedFaq ? null : faq.question)}
            >
              <p className="font-semibold">{faq.question}</p>
              {selectedFaq === faq.question && <p className="mt-2 text-sm text-gray-300">{faq.answer}</p>}
            </li>
          ))}
        </ul>
      </div>
      {/* RODAPÉ */}
      <footer className="mt-8 text-sm opacity-80">© {new Date().getFullYear()} EducBot - Colégio do Sol</footer>
    </div>
  );
}
