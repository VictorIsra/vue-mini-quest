//msgs relativas a conexões:
const connection_failed = "não rolou a conexão com o bd";
const connection_established = "conexão com o banco estabelecida com sucesso";
const sever_listening = "servidor express escutando na porta: ";

//msgs relativas a requisições:
const invalid_request = "requisição contém estrutura/valor inválidos";

//mgs relativas ao CRUD:
const fetch_error = "erro ao tentar pegar itens do bd: "; 
const item_inserted = "item inserido com sucesso: ";
const item_removed = "item removido com sucesso: ";
const documents_dropped = "documentos dropados com sucesso: ";
const item_atualized = "item atualizado com sucesso: ";
const error_404 = "recurso solicitado não existe: ";

module.exports = {
    connection_failed,
    connection_established,
    sever_listening,
    invalid_request,
    fetch_error,
    item_inserted,
    item_removed,
    documents_dropped,
    item_atualized,
    error_404
}