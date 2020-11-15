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
      informacaoAdicional
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
      status
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
      informacaoAdicional
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
      status
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
      informacaoAdicional
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
      status
    }
  }
`;
export const createCliente = /* GraphQL */ `
  mutation CreateCliente($input: ClienteInputCreate) {
    createCliente(input: $input) {
      pk
      razaoSocial
      cnpj
      telefone
      email
      cep
      rua
      bairro
      cidade
      uf
      pk_produto {
        pk_produto
        setup
      }
      produto {
        pk
        nome
        categoria
        fabricante
        descricao
        informacaoAdicional
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
        status
      }
      logo {
        url
        nome
        descricao
        extensao
      }
      contrato {
        dataInicio
        dataFim
        anexo {
          url
          nome
          descricao
          extensao
        }
      }
      membros {
        pk
        nome
        cpf
        telefone
        email
        cep
        rua
        bairro
        cidade
        uf
        foto {
          url
          nome
          descricao
          extensao
        }
        tipo
        pk_cliente
      }
    }
  }
`;
export const updateCliente = /* GraphQL */ `
  mutation UpdateCliente($input: ClienteInputUpdate) {
    updateCliente(input: $input) {
      pk
      razaoSocial
      cnpj
      telefone
      email
      cep
      rua
      bairro
      cidade
      uf
      pk_produto {
        pk_produto
        setup
      }
      produto {
        pk
        nome
        categoria
        fabricante
        descricao
        informacaoAdicional
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
        status
      }
      logo {
        url
        nome
        descricao
        extensao
      }
      contrato {
        dataInicio
        dataFim
        anexo {
          url
          nome
          descricao
          extensao
        }
      }
      membros {
        pk
        nome
        cpf
        telefone
        email
        cep
        rua
        bairro
        cidade
        uf
        foto {
          url
          nome
          descricao
          extensao
        }
        tipo
        pk_cliente
      }
    }
  }
`;
export const deleteCliente = /* GraphQL */ `
  mutation DeleteCliente($pk: String!) {
    deleteCliente(pk: $pk) {
      pk
      razaoSocial
      cnpj
      telefone
      email
      cep
      rua
      bairro
      cidade
      uf
      pk_produto {
        pk_produto
        setup
      }
      produto {
        pk
        nome
        categoria
        fabricante
        descricao
        informacaoAdicional
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
        status
      }
      logo {
        url
        nome
        descricao
        extensao
      }
      contrato {
        dataInicio
        dataFim
        anexo {
          url
          nome
          descricao
          extensao
        }
      }
      membros {
        pk
        nome
        cpf
        telefone
        email
        cep
        rua
        bairro
        cidade
        uf
        foto {
          url
          nome
          descricao
          extensao
        }
        tipo
        pk_cliente
      }
    }
  }
`;
export const createUsuario = /* GraphQL */ `
  mutation CreateUsuario($input: UsuarioInputCreate) {
    createUsuario(input: $input) {
      pk
      nome
      cpf
      telefone
      email
      cep
      rua
      bairro
      cidade
      uf
      foto {
        url
        nome
        descricao
        extensao
      }
      tipo
      pk_cliente
    }
  }
`;
export const updateUsuario = /* GraphQL */ `
  mutation UpdateUsuario($input: UsuarioInputUpdate) {
    updateUsuario(input: $input) {
      pk
      nome
      cpf
      telefone
      email
      cep
      rua
      bairro
      cidade
      uf
      foto {
        url
        nome
        descricao
        extensao
      }
      tipo
      pk_cliente
    }
  }
`;
export const deleteUsuario = /* GraphQL */ `
  mutation DeleteUsuario($pk: String!) {
    deleteUsuario(pk: $pk) {
      pk
      nome
      cpf
      telefone
      email
      cep
      rua
      bairro
      cidade
      uf
      foto {
        url
        nome
        descricao
        extensao
      }
      tipo
      pk_cliente
    }
  }
`;
