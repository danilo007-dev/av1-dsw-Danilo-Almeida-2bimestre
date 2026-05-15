// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Esta camada é responsável por:
// - Receber as requisições HTTP
// - Validar os dados recebidos
// - Chamar os métodos do Model
// - Retornar as respostas adequadas

import * as TarefaModel from "../models/tarefaModel.js";

// LISTAR

// ATUALIZAR
export async function atualizarController(req, res) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        erro: 'ID inválido'
      });
    }

    const {
      title,
      description,
      completed,
      categoryId
    } = req.body;

    const tarefaAtualizada = await atualizar(id, {
      title,
      description,
      completed,
      categoryId
    });

    if (!tarefaAtualizada) {
      return res.status(404).json({
        erro: 'Tarefa não encontrada'
      });
    }

    return res.json(tarefaAtualizada);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: 'Erro ao atualizar tarefa'
    });
  }
}

// EXCLUIR
export async function excluirController(req, res) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        erro: 'ID inválido'
      });
    }

    const tarefaExcluida = await excluir(id);

    if (!tarefaExcluida) {
      return res.status(404).json({
        erro: 'Tarefa não encontrada'
      });
    }

    return res.json({
      mensagem: 'Tarefa excluída com sucesso'
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: 'Erro ao excluir tarefa'
    });
  }
}
