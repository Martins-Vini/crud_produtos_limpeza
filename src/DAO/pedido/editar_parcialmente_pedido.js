const {conexao} = require('../conexao.js')

async function editarParcialmentePedido(numero, campo, valor){
    const data = [valor, numero]
    
    const colunasPermitidas = ['numero', 'data_elaboracao', 'cliente_id']; // Adicione as colunas permitidas
    if (!colunasPermitidas.includes(campo)) {
        throw new Error('Coluna inválida');
    }

    const sql = `UPDATE tbl_pedido set ${campo} = ? WHERE numero = ?;`
    const conn = await conexao()
    
    try {
        // Executar a consulta
        const [results] = await conn.query(sql, data);

        await conn.end()
        return results
      } catch (err) {
        return err.message
      }
}

module.exports = {editarParcialmentePedido}