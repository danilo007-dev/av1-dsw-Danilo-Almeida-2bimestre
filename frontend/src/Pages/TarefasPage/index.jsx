import { useEffect, useState } from "react";
import api from "../../services/api";
import TarefaForm from "../../components/TarefaForm";
import TarefaTabela from "../../components/TarefaTabela";

export default function TarefasPage() {
  const [tarefas, setTarefas] = useState([]);
  const [descricao, setDescricao] = useState("");
  // Adicionando estados obrigatórios da Parte 2:
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [tarefaEditando, setTarefaEditando] = useState(null);

  async function buscarTarefas() {
    setLoading(true);
    setErro(null);
    try {
      // Ajustado o endpoint para /tarefas, conforme o route do backend
      const resposta = await api.get("/tarefas");
      setTarefas(resposta.data);
    } catch (error) {
      console.error(error);
      setErro("Erro ao carregar as tarefas. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  async function cadastrarTarefa(event) {
    event.preventDefault();

    if (descricao.trim() === "") {
      alert("digite uma tarefa");
      return;
    }

    try {
      if (tarefaEditando) {
        await api.patch(`/tarefas/${tarefaEditando.id}`, {
          title: descricao
        });
        setTarefaEditando(null);
      } else {
        await api.post("/tarefas", {
          title: descricao
        });
      }

      setDescricao("");
      buscarTarefas();
    } catch (error) {
      console.error(error);
      alert(tarefaEditando ? "Erro ao atualizar tarefa." : "Erro ao cadastrar tarefa.");
    }
  }

  async function excluirTarefa(id) {
    if (!window.confirm("Deseja realmente excluir esta tarefa?")) return;
    
    try {
      await api.delete(`/tarefas/${id}`);
      buscarTarefas(); // recarrega a lista
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir tarefa.");
    }
  }

  function editarTarefa(tarefa) {
    setTarefaEditando(tarefa);
    setDescricao(tarefa.title);
  }

  function cancelarEdicao() {
    setTarefaEditando(null);
    setDescricao("");
  }

  useEffect(() => {
    buscarTarefas();
  }, []);

  return (
    <section className="text-gray-800 body-font max-w-5xl mx-auto px-4 md:px-0">
      <div className="container py-12 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="sm:text-4xl text-3xl font-extrabold title-font mb-4 text-gray-900 tracking-tight">
            Minhas Tarefas
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-lg text-gray-500">
            Cadastre, veja e gerencie suas tarefas do dia a dia!
          </p>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full">
          <TarefaForm
            descricao={descricao}
            setDescricao={setDescricao}
            cadastrarTarefa={cadastrarTarefa}
            tarefaEditando={tarefaEditando}
            cancelarEdicao={cancelarEdicao}
          />

          {/* Exibe mensagem de erro */}
          {erro && (
            <div className="w-full bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 shadow-sm rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm">{erro}</p>
                </div>
              </div>
            </div>
          )}

          {/* Exibe o estado de loading ou a tabela */}
          {loading ? (
            <div className="flex flex-col justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
              <span className="text-xl font-medium text-blue-600">Carregando tarefas...</span>
            </div>
          ) : (
            <TarefaTabela tarefas={tarefas} excluirTarefa={excluirTarefa} editarTarefa={editarTarefa} />
          )}
        </div>
      </div>
    </section>
  );
}