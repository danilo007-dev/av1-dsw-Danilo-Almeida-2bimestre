// ========================================
// MODEL - CAMADA DE DADOS COM PRISMA
// ========================================
// Esta camada é responsável por:
// - Realizar operações CRUD no banco de dados usando Prisma
// - Implementar a lógica de negócio

import prisma from '../config/prisma.js';

// LISTAR TODOS
export async function listar() {
  return await prisma.task.findMany();
}

// BUSCAR POR ID
export async function buscarPorId(id) {
  try {
    return await prisma.task.findUnique({
      where: {
        id: Number(id)
      }
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return null;
    }

    throw error;
  }
}

// CRIAR
export async function criar(dados) {
  return await prisma.task.create({
    data: {
      title: dados.title,
      description: dados.description,
      completed: dados.completed,
      categoryId: dados.categoryId
    }
  });
}

// ATUALIZAR
export async function atualizar(id, dados) {
  try {
    return await prisma.task.update({
      where: {
        id: Number(id)
      },
      data: {
        ...(dados.title !== undefined && { title: dados.title }),
        ...(dados.description !== undefined && {
          description: dados.description
        }),
        ...(dados.completed !== undefined && {
          completed: dados.completed
        }),
        ...(dados.categoryId !== undefined && {
          categoryId: dados.categoryId
        })
      }
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return null;
    }

    throw error;
  }
}

// EXCLUIR
export async function excluir(id) {
  try {
    return await prisma.task.delete({
      where: {
        id: Number(id)
      }
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return null;
    }

    throw error;
  }
}