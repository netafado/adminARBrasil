/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteProduto = /* GraphQL */ `
  mutation DeleteProduto($pk: String!) {
    deleteProduto(pk: $pk) {
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
export const createProduto = /* GraphQL */ `
  mutation CreateProduto($input: ProdutoInputCreate) {
    createProduto(input: $input) {
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
export const updateProduto = /* GraphQL */ `
  mutation UpdateProduto($input: ProdutoInputUpdate) {
    updateProduto(input: $input) {
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
