/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const retornarProduto = /* GraphQL */ `
  query RetornarProduto($pk: String!) {
    retornarProduto(pk: $pk) {
      pk
      nome
      categoria
      fabricante
      descricao
      imagens {
        url
        nome
        descricao
        extensao
      }
      anexos {
        url
        nome
        descricao
        extensao
      }
    }
  }
`;
export const listarProduto = /* GraphQL */ `
  query ListarProduto($limit: Int, $nextToken: String) {
    listarProduto(limit: $limit, nextToken: $nextToken) {
      items {
        pk
        nome
        categoria
        fabricante
        descricao
        imagens {
          url
          nome
          descricao
          extensao
        }
        anexos {
          url
          nome
          descricao
          extensao
        }
      }
      nextToken
    }
  }
`;
