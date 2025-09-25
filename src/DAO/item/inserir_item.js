const {conexao} = require('../conexao.js')

async function incluirItem(infos){
    const sql = `INSERT INTO tbl_itempedido (id, id_pedido, id_produto, qnt) VALUES (?, ?, ?, ?)`
    const conn = await conexao()
    
    try {
        // Executar a consulta com parâmetros individuais
        const [results] = await conn.query(sql, infos);

        await conn.end()
        return results
      } catch (err) {
        await conn.end()
        return err.message
      }
}

module.exports = {incluirItem}