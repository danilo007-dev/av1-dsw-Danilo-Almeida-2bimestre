export default function TarefaTabela({ tarefas, excluirTarefa, editarTarefa }) {
  return (
    <div className="w-full mx-auto overflow-hidden rounded-xl shadow-sm border border-gray-200">
      <table className="min-w-full text-left whitespace-no-wrap bg-white">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-4 title-font tracking-wider font-semibold text-gray-700 text-sm w-20">
              ID
            </th>
            <th className="px-6 py-4 title-font tracking-wider font-semibold text-gray-700 text-sm">
              Descrição da Tarefa
            </th>
            <th className="px-6 py-4 title-font tracking-wider font-semibold text-gray-700 text-sm text-center w-48">
              Ações
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {tarefas.length > 0 ? (
            tarefas.map((tarefa) => (
              <tr key={tarefa.id} className="transition-colors hover:bg-blue-50/50 group">
                <td className="px-6 py-4 text-gray-500 font-mono text-sm">
                  #{tarefa.id}
                </td>

                <td className="px-6 py-4 text-gray-800 font-medium">
                  {tarefa.title}
                </td>
                
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => editarTarefa(tarefa)}
                      className="text-blue-600 hover:text-white font-medium px-4 py-2 bg-blue-50 hover:bg-blue-500 rounded-lg transition-all duration-200 ease-in-out focus:ring-4 ring-blue-200 outline-none"
                      title="Editar tarefa"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => excluirTarefa(tarefa.id)}
                      className="text-red-500 hover:text-white font-medium px-4 py-2 bg-red-50 hover:bg-red-500 rounded-lg transition-all duration-200 ease-in-out focus:ring-4 ring-red-200 outline-none"
                      title="Remover tarefa"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-6 py-12 text-center">
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <svg className="w-12 h-12 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                  <span className="text-lg">Tudo limpo por aqui!</span>
                  <span className="text-sm mt-1">Adicione uma tarefa no campo acima.</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}