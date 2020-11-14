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
    }
  }
`;
export const retornarCliente = /* GraphQL */ `
  query RetornarCliente($pk: String!) {
    retornarCliente(pk: $pk) {
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
    }
  }
`;
export const retornarUsuario = /* GraphQL */ `
  query RetornarUsuario($pk: String!) {
    retornarUsuario(pk: $pk) {
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
      cliente {
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
        pk_produto
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
      }
      nextToken
    }
  }
`;
export const listarCliente = /* GraphQL */ `
  query ListarCliente($limit: Int, $nextToken: String) {
    listarCliente(limit: $limit, nextToken: $nextToken) {
      items {
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
      }
      nextToken
    }
  }
`;
export const listarUsuario = /* GraphQL */ `
  query ListarUsuario($tipo: String, $limit: Int, $nextToken: String) {
    listarUsuario(tipo: $tipo, limit: $limit, nextToken: $nextToken) {
      items {
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
        cliente {
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
          pk_produto
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
        }
      }
      nextToken
    }
  }
`;
