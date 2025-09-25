const {conexao} = require('../conexao.js')

async function deletarPedido(numero){
    const sql = `DELETE FROM tbl_cliente WHERE codigo = ?`
    const conn = await conexao()
    
    try {
        // Executar a consulta
        const [results] = await conn.query(sql,[numero]);

        await conn.end()
        return results
      } catch (err) {
        return err.message
      }
}

module.exports = {deletarPedido}