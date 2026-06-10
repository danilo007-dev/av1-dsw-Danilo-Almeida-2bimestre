// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Esta camada é responsável por:
// - Receber as requisições HTTP
// - Validar os dados recebidos
// - Chamar os métodos do Model
// - Retornar as respostas adequadas

import * as TarefaModel from "../models/tarefaModel.js";

// LISTAR TODOS
export async function listarTarefas(req, res) {
  try {
    const tarefas = await TarefaModel.listar();
    return res.json(tarefas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao listar tarefas' });
  }
}

// BUSCAR POR ID
export async function obterTarefa(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ erro: 'ID inválido' });
    }
    const tarefa = await TarefaModel.buscarPorId(id);
    if (!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    return res.json(tarefa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao buscar tarefa' });
  }
}

// CRIAR
export async function criarTarefa(req, res) {
  try {
    const { title, description, completed, categoryId } = req.body;
    
    // Validacão básica (exemplo)
    if (!title) {
        return res.status(400).json({ erro: 'O título é obrigatório.' });
    }

    const novaTarefa = await TarefaModel.criar({ title, description, completed, categoryId });
    return res.status(201).json(novaTarefa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao criar tarefa' });
  }
}

// ATUALIZAR
export async function atualizarTarefa(req, res) {
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

    const tarefaAtualizada = await TarefaModel.atualizar(id, {
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
export async function excluirTarefa(req, res) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        erro: 'ID inválido'
      });
    }

    const tarefaExcluida = await TarefaModel.excluir(id);

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
