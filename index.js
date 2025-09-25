const express = require('express');
const env = require('dotenv');

// Conexão
const { conexao, testarConexao } = require('./src/DAO/conexao.js');

// Funções de CRUD
// Clientes
const { buscarClientes, buscarClientesPorStatus } = require('./src/DAO/cliente/buscar_cliente.js');
const { incluirCliente } = require('./src/DAO/cliente/inserir_cliente.js');
const { deletarCliente } = require('./src/DAO/cliente/deletar_cliente.js');
const { editarParcialmenteCliente } = require('./src/DAO/cliente/editar_parcialmente_cliente.js');
const { editarIntegralmenteCliente } = require('./src/DAO/cliente/editar_integralmente_cliente.js');

// Categorias
const { buscarCategorias, buscarCategoriaPorId } = require('./src/DAO/categoria/buscar_categoria.js');
const { deletarCategoria } = require('./src/DAO/categoria/deletar_categoria.js');
const { incluirCategoria } = require('./src/DAO/categoria/inserir_categoria.js');
const { editarIntegralmenteCategoria } = require('./src/DAO/categoria/editar_integralmente_categoria.js');
const { editarParcialmenteCategoria } = require('./src/DAO/categoria/editar_parcialmente_categoria.js');

// Endereços
const { buscarEnderecos, buscarEnderecosPorId } = require('./src/DAO/endereco/buscar_endereco.js');
const { incluirEndereco } = require('./src/DAO/endereco/incluir_endereco.js');
const { deletarEndereco } = require('./src/DAO/endereco/deletar_endereco.js');
const { editarIntegralmenteEndereco } = require('./src/DAO/endereco/editar_integralmente_endereco.js');
const { editarParcialmenteEndereco } = require('./src/DAO/endereco/editar_parcialmente_endereco.js');

// Itens
const { buscarItens, buscarItensPorId } = require('./src/DAO/item/buscar_item.js');
const { incluirItem } = require('./src/DAO/item/inserir_item.js');
const { deletarItem } = require('./src/DAO/item/deletar_item.js');
const { editarIntegralmenteItem } = require('./src/DAO/item/editar_integralmente_item.js');
const { editarParcialmenteItem } = require('./src/DAO/item/editar_parcialmente_item.js');

// Pedido
const { buscarPedido, buscarPedidoPeloNumero } = require('./src/DAO/pedido/buscar_pedido.js');
const { incluirPedido } = require('./src/DAO/pedido/inserir_pedido.js');
const { deletarPedido } = require('./src/DAO/pedido/deletar_pedido.js');
const { editarIntegralmentePedido } = require('./src/DAO/pedido/editar_integralmente_pedido.js');
const { editarParcialmentePedido } = require('./src/DAO/pedido/editar_parcialmente_pedido.js');

// Status
const { buscarStatus, buscarStatusPeloId } = require('./src/DAO/status/buscar_status.js');
const { incluirStatus } = require('./src/DAO/status/inserir_status.js');
const { deletarStatus } = require('./src/DAO/status/deletar_status.js');
const { editarIntegralmenteStatus } = require('./src/DAO/status/editar_integralmente_status.js');
const { editarParcialmenteStatus } = require('./src/DAO/status/editar_parcialmente_status.js');

// Produtos
const { incluirProduto } = require('./src/DAO/produto/inserir_produto.js');
const { buscarProdutos, buscarProdutoPorCodigo } = require('./src/DAO/produto/buscar_produto.js');
const { deletarProduto } = require('./src/DAO/produto/deletar_produto.js');
const { editarIntegralmenteProduto } = require('./src/DAO/produto/editar_integralmente_produto.js');
const { editarParcialmenteProduto } = require('./src/DAO/produto/editar_parcialmente_produto.js');

const app = express();
env.config();

// Middleware para processar o corpo da requisição (JSON e URL-encoded)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Rotas das Categorias
app.get('/firma/1.0.0/categoria', async (req, res) => {
    try {
        let categoria = await buscarCategorias();
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/firma/1.0.0/categoria/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let categoria = await buscarCategoriaPorId(id);
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/firma/1.0.0/categoria', async (req, res) => {
    try {
        let { id, nome, name } = req.body;
        const nomeFinal = nome || name;
        if (!id || !nomeFinal) {
            return res.status(400).json({ error: 'Campos id e nome são obrigatórios' });
        }
        const infos = [id, nomeFinal];
        let result = await incluirCategoria(infos);
        if (typeof result === 'string' && result.includes('Error')) {
            return res.status(500).json({ error: result });
        }
        res.status(201).json({ message: 'Categoria inserida com sucesso', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/firma/1.0.0/categoria', async (req, res) => {
    try {
        let { id, nome } = req.body;
        const infos = [nome];
        let result = await editarIntegralmenteCategoria(infos, id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/firma/1.0.0/categoria', async (req, res) => {
    try {
        let { codigo, campo, valor } = req.body;
        let result = await editarParcialmenteCategoria(codigo, campo, valor);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/firma/1.0.0/categoria/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let result = await deletarCategoria(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rotas dos Clientes
app.get('/firma/1.0.0/clientes', async (req, res) => {
    try {
        let clientes = await buscarClientes();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/firma/1.0.0/cliente/:status', async (req, res) => {
    try {
        let status = parseInt(req.params.status);
        let cliente = await buscarClientesPorStatus(status);
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/firma/1.0.0/cliente', async (req, res) => {
    try {
        let { codigo, nome, limite, telefone, id_endereco, id_status } = req.body;
        const infos = [codigo, nome, telefone, limite, id_endereco, id_status];
        let result = await incluirCliente(infos);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/firma/1.0.0/cliente', async (req, res) => {
    try {
        let { codigo, nome, limite, telefone, id_endereco, id_status } = req.body;
        const infos = [telefone, nome, limite, id_endereco, id_status];
        let result = await editarIntegralmenteCliente(infos, codigo);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/firma/1.0.0/cliente', async (req, res) => {
    try {
        let { codigo, campo, valor } = req.body;
        let result = await editarParcialmenteCliente(codigo, campo, valor);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/firma/1.0.0/cliente/:codigo', async (req, res) => {
    try {
        let codigo = parseInt(req.params.codigo);
        let result = await deletarCliente(codigo);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rotas de Endereço
app.get('/firma/1.0.0/endereco', async (req, res) => {
    try {
        let endereco = await buscarEnderecos();
        res.json(endereco);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/firma/1.0.0/endereco/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let endereco = await buscarEnderecosPorId(id);
        res.json(endereco);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/firma/1.0.0/endereco', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Body da requisição está vazio' });
        }
        let { id, logradouro, cep, numero, bairro, cidade } = req.body;
        if (!id || !logradouro || !cep || !numero || !bairro || !cidade) {
            return res.status(400).json({
                error: 'Todos os campos são obrigatórios',
                campos_recebidos: req.body
            });
        }
        const infos = [id, logradouro, cep, numero, bairro, cidade];
        let result = await incluirEndereco(infos);
        if (typeof result === 'string' && result.includes('Error')) {
            return res.status(500).json({ error: result });
        }
        res.status(201).json({ message: 'Endereço inserido com sucesso', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/firma/1.0.0/endereco', async (req, res) => {
    try {
        let { id, logradouro, cep, numero, bairro, cidade } = req.body;
        const infos = [logradouro, cep, numero, bairro, cidade];
        let result = await editarIntegralmenteEndereco(infos, id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/firma/1.0.0/endereco', async (req, res) => {
    try {
        let { codigo, campo, valor } = req.body;
        let result = await editarParcialmenteEndereco(codigo, campo, valor);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/firma/1.0.0/endereco/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let result = await deletarEndereco(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rotas dos itens
app.get('/firma/1.0.0/item', async (req, res) => {
    try {
        let item = await buscarItens();
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/firma/1.0.0/item/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let item = await buscarItensPorId(id);
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/firma/1.0.0/item', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Body da requisição está vazio' });
        }
        let { id, id_pedido, id_produto, qnt } = req.body;
        if (!id || !id_pedido || !id_produto || !qnt) {
            return res.status(400).json({
                error: 'Todos os campos são obrigatórios',
                campos_recebidos: req.body
            });
        }
        const infos = [id, id_pedido, id_produto, qnt];
        let result = await incluirItem(infos);
        if (typeof result === 'string' && result.includes('Error')) {
            return res.status(500).json({ error: result });
        }
        res.status(201).json({ message: 'Item inserido com sucesso', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/firma/1.0.0/item', async (req, res) => {
    try {
        let { id, id_pedido, id_produto, qnt } = req.body;
        const infos = [id_pedido, id_produto, qnt];
        let result = await editarIntegralmenteItem(infos, id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/firma/1.0.0/item', async (req, res) => {
    try {
        let { id, campo, valor } = req.body;
        let result = await editarParcialmenteItem(id, campo, valor);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.delete('/firma/1.0.0/item/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let result = await deletarItem(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rotas de Pedidos
app.get('/firma/1.0.0/pedido', async (req, res) => {
    try {
        let pedido = await buscarPedido();
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/firma/1.0.0/pedido/:numero', async (req, res) => {
    try {
        let numero = parseInt(req.params.numero);
        let pedido = await buscarPedidoPeloNumero(numero);
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/firma/1.0.0/pedido', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Body da requisição está vazio' });
        }
        let { numero, data_elaboracao, cliente_id } = req.body;
        if (!numero || !data_elaboracao || !cliente_id) {
            return res.status(400).json({
                error: 'Todos os campos são obrigatórios',
                campos_recebidos: req.body
            });
        }
        const infos = [numero, data_elaboracao, cliente_id];
        let result = await incluirPedido(infos);
        if (typeof result === 'string' && result.includes('Error')) {
            return res.status(500).json({ error: result });
        }
        res.status(201).json({ message: 'Pedido inserido com sucesso', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/firma/1.0.0/pedido', async (req, res) => {
    try {
        let { numero, data_elaboracao, cliente_id } = req.body;
        const infos = [data_elaboracao, cliente_id];
        let result = await editarIntegralmentePedido(infos, numero);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/firma/1.0.0/pedido', async (req, res) => {
    try {
        let { numero, campo, valor } = req.body;
        let result = await editarParcialmentePedido(numero, campo, valor);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/firma/1.0.0/pedido/:numero', async (req, res) => {
    try {
        let numero = parseInt(req.params.numero);
        let result = await deletarPedido(numero);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rotas dos produtos
app.get('/firma/1.0.0/produto', async (req, res) => {
    try {
        let produto = await buscarProdutos();
        res.json(produto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/firma/1.0.0/produto/:codigo', async (req, res) => {
    try {
        let codigo = parseInt(req.params.codigo);
        let produto = await buscarProdutoPorCodigo(codigo);
        res.json(produto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/firma/1.0.0/produto', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Body da requisição está vazio' });
        }
        let { codigo, nome, id_categoria, preco } = req.body;
        if (!codigo || !nome || !id_categoria || !preco) {
            return res.status(400).json({
                error: 'Todos os campos são obrigatórios',
                campos_recebidos: req.body
            });
        }
        const infos = [codigo, nome, id_categoria, preco];
        let result = await incluirProduto(infos);
        if (typeof result === 'string' && result.includes('Error')) {
            return res.status(500).json({ error: result });
        }
        res.status(201).json({ message: 'Produto inserido com sucesso', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/firma/1.0.0/produto', async (req, res) => {
    try {
        let { codigo, campo, valor } = req.body;
        let result = await editarParcialmenteProduto(codigo, campo, valor);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/firma/1.0.0/produto', async (req, res) => {
    try {
        let { codigo, id_categoria, nome, preco } = req.body;
        const infos = [id_categoria, nome, preco];
        let result = await editarIntegralmenteProduto(infos, codigo);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/firma/1.0.0/produto/:codigo', async (req, res) => {
    try {
        let codigo = parseInt(req.params.codigo);
        let result = await deletarProduto(codigo);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rotas do status
app.get('/firma/1.0.0/status', async (req, res) => {
    try {
        let status = await buscarStatus();
        res.json(status);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/firma/1.0.0/status/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let status = await buscarStatusPeloId(id);
        res.json(status);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/firma/1.0.0/status', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Body da requisição está vazio' });
        }
        let { id, nome } = req.body;
        if (!id || !nome) {
            return res.status(400).json({
                error: 'Todos os campos são obrigatórios',
                campos_recebidos: req.body
            });
        }
        const infos = [id, nome];
        let result = await incluirStatus(infos);
        if (typeof result === 'string' && result.includes('Error')) {
            return res.status(500).json({ error: result });
        }
        res.status(201).json({ message: 'Status inserido com sucesso', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/firma/1.0.0/status', async (req, res) => {
    try {
        let { id, nome } = req.body;
        const infos = [nome];
        let result = await editarIntegralmenteStatus(infos, id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/firma/1.0.0/status', async (req, res) => {
    try {
        let { id, campo, valor } = req.body;
        let result = await editarParcialmenteStatus(id, campo, valor);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/firma/1.0.0/status/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let result = await deletarStatus(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(process.env.PORTA, () => {
    console.log(`Operando na porta ${process.env.PORTA}`);
    testarConexao(conexao());
});