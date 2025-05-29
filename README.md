# SEI para Word

Extensão do Chrome para converter deliberações do SEI em formato Word (.docx).

## Descrição

Esta extensão permite converter deliberações do Sistema Eletrônico de Informações (SEI) diretamente para o formato Word (.docx), facilitando o compartilhamento e edição dos documentos.

## Instalação

1. Clone este repositório ou baixe os arquivos
2. Abra o Chrome e acesse `chrome://extensions/`
3. Ative o "Modo do desenvolvedor" no canto superior direito
4. Clique em "Carregar sem compactação"
5. Selecione a pasta do projeto

## Uso

1. Acesse uma página de deliberação no SEI
2. Clique no botão de exportação para Word (ícone do Word) no menu do SEI
3. O arquivo será baixado automaticamente em formato .docx, nomeado como "Documento_SEI_YYYY-MM-DD.docx"

## Requisitos

- Google Chrome versão 88 ou superior
- Acesso ao SEI

## Desenvolvimento

Para contribuir com o desenvolvimento:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -am 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request

## Boas práticas e publicação

- O código segue as recomendações do Manifest V3
- Não utiliza permissões desnecessárias
- Não coleta dados do usuário
- Não utiliza delays ou código duplicado
- O botão de exportação é inserido de forma dinâmica e segura
- O nome do arquivo é sempre seguro para qualquer sistema operacional

## Licença

Este projeto está sob a licença MIT. 