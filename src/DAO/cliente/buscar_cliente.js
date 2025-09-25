const {conexao} = require('../conexao.js')


async function buscarClientes(){
  console.log('DAO de CLIENTE')
    const sql = `SELECT * FROM tbl_cliente;`
    
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

async function buscarClientesPorStatus(status){
  console.log('DAO de CLIENTE')
    const sql = `SELECT * FROM tbl_cliente WHERE id_status = ${status};`;
    
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



module.exports = {buscarClientes,buscarClientesPorStatus}