const {conexao} = require('../conexao.js')


async function buscarEnderecos(){
  console.log('DAO de ENDEREÇO')
    const sql = `SELECT * FROM tbl_endereco;`
    
    const conn = await conexao()
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}

async function buscarEnderecosPorId(id){
    const sql = `SELECT * FROM tbl_endereco WHERE id = ${id}`
    
    const conn = await conexao()
    
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql, [id]);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}


module.exports = {buscarEnderecos, buscarEnderecosPorId}