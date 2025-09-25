const {conexao} = require('../conexao.js')

async function editarParcialmenteCategoria(id, campo, valor){
    const data = [valor, id]
    
    const colunasPermitidas = ['nome']; // Adicione as colunas permitidas
    if (!colunasPermitidas.includes(campo)) {
        throw new Error('Coluna inválida');
    }

    const sql = `UPDATE tbl_categoria set ${campo} = ? WHERE id = ? ;`
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

module.exports = {editarParcialmenteCategoria}