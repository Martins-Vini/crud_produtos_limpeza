const {conexao} = require('../conexao.js')

async function editarIntegralmenteProduto(infos, codigo){

    const sql = `UPDATE tbl_produtos SET id_categoria = ?, nome = ?, preco = ? WHERE codigo = ${codigo} ;`
    
    const conn = await conexao()
    
    try {
        // Executar a consulta
        const [results] = await conn.query(sql,[...infos]);

        await conn.end()
        return results
      } catch (err) {
        return err.message
      }
}

module.exports = {editarIntegralmenteProduto}