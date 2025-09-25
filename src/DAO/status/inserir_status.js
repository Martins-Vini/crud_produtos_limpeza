const {conexao} = require('../conexao.js')

async function incluirStatus(infos){
    const sql = `INSERT INTO tbl_status (id, nome) VALUES (?, ?)`
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

module.exports = {incluirStatus}