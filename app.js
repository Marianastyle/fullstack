const express = require('express');
const mysql = require('mysql2/promise'); // Usamos a versão com Promise
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração da conexão com o MySQL
const dbConfig = {
    host: 'localhost',
    user: 'root',      // Usuário padrão do XAMPP/Wamp
    password: '',      // Senha padrão do XAMPP (em branco)
    database: 'revisao'
};

// Criar conexão global (ou pool)
let db;
async function connectDB() {
    try {
        db = await mysql.createConnection(dbConfig);
        console.log('✅ MySQL Conectado!');
    } catch (err) {
        console.error('❌ Erro ao conectar no MySQL:', err.message);
    }
}
connectDB();

// --- ROTAS ---

// Listar todas as tarefas
app.get('/tarefas', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM tarefas');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Criar tarefa
app.post('/tarefas', async (req, res) => {
    try {
        const {formulario} = req.body;
        const [result] = await db.execute('INSERT INTO tarefas (formulario) VALUES (id, titulo,  nome, email, telefone, login, senha, concluida)', [formulario]);
        res.json({ id: result.insertId, titulo,  nome, email, telefone, login, senha, concluida: false });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Atualizar tarefa
app.put('/tarefas/:id', async (req, res) => {
    try {
        const { titulo, nome, email, telefone, login, senha, concluida } = req.body;
        const { id } = req.params;
        await db.execute('UPDATE tarefas SET formulario = ?, concluida = ? WHERE id = ?', [titulo, nome, email, telefone, login, senha, concluida, id]);
        res.json({ titulo, nome, email, telefone, login, senha, concluida });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Deletar tarefa
app.delete('/tarefas/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM tarefas WHERE id = ?', [req.params.id]);
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

app.listen(3000, () => console.log('🚀 Servidor MySQL rodando na porta 3000'));