const express = require('express')

const app = express()

app.use(express.json())

const usuarios = [
    {
        name:'Karien',
        email:'karien@gmail.com',
        idade:34,
        sexo:'Feminino'
    },
]

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.get('/usuarios/:name', (req, res) => {
    const { name } = req.params;
    const usuarios = usuarios.find(v => v.name === name);
    if (usuarios) {
        res.json(usuarios);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado'})
    }
});

app.post('/usuarios', (req, res) => {
    const { name, email, idade, sexo } = req.body;
    const usuarios = { name, email, idade, sexo };
    usuarios.push(usuarios);
    res.status(201).json({ message:'Usuário cadastrado com sucesso' })
})

app.put('/usuarios/:name', (req, res) => {
    const {name} = req.params; 
    const {email, idade, sexo} = req.body; 
    const usuarios = usuarios.find(v => v.name === name); 
    if (usuarios) {
        usuarios.email = email || usuarios.email; 
        usuarios.idade = idade || usuarios.idade; 
        usuarios.sexo = sexo || usuarios.sexo; 

        res.json({message : 'informações do usuarios atualizadas'}) } else{
            res.status(404).json({message: 'Usuario não encontrado. '})
        }
        } )
    
app.delete('/ usuarios /:name', (req, res) => {
    const {name} = req.params;
    const usuariosIndex = usuarios.findIndex(v => v.name === name)
    if (usuariosIndex !== 1){
        usuarios.splice(usuariosIndex, 1); 
        res.json({message: 'Usuário excluido com sucesso'});
    }else{
                res.status(404).json({message: 'Usuario nao encontrado. '});

    }
})

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});