const {conexao} = require('../conexao.js')

async function deletarEndereco(id){
    const sql = `DELETE FROM tbl_endereco WHERE codigo = ?`
    const conn = await conexao()
    
    try {
        // Executar a consulta
        const [results] = await conn.query(sql,[id]);

        await conn.end()
        return results
      } catch (err) {
        return err.message
      }
}

module.exports = {deletarEndereco}