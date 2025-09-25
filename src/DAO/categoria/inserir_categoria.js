const {conexao} = require('../conexao.js')

async function incluirCategoria(infos){
    const sql = `INSERT INTO tbl_categoria (id, nome) VALUES (?, ?)`
    const conn = await conexao()
    
    try {
        // Executar a consulta diretamente (MySQL com autocommit habilitado por padrão)
        const [results] = await conn.query(sql, infos);
        
        await conn.end()
        return results
      } catch (err) {
        await conn.end()
        return err.message
      }
}

module.exports = {incluirCategoria}