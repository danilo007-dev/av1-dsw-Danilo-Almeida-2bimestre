export default function TarefaForm({
  descricao,
  setDescricao,
  cadastrarTarefa,
  tarefaEditando,
  cancelarEdicao
}) {
  return (
    <form
      onSubmit={cadastrarTarefa}
      className="lg:w-2/3 w-full mx-auto mb-10 flex flex-col sm:flex-row gap-4 px-4 sm:px-0 items-center"
    >
      <input
        type="text"
        value={descricao}
        onChange={(event) => setDescricao(event.target.value)}
        placeholder="O que você precisa fazer hoje?"
        className="w-full bg-white rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-base outline-none text-gray-700 py-3 px-4 leading-8 transition-all duration-200 shadow-sm"
      />

      <div className="flex gap-2 w-full sm:w-auto">
        <button className="flex-1 text-white bg-blue-600 font-semibold border-0 py-3 px-8 focus:outline-none hover:bg-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 whitespace-nowrap">
          {tarefaEditando ? "Atualizar" : "+ Adicionar"}
        </button>
        
        {tarefaEditando && (
          <button
            type="button"
            onClick={cancelarEdicao}
            className="flex-1 text-gray-700 bg-gray-200 font-semibold border-0 py-3 px-8 focus:outline-none hover:bg-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}