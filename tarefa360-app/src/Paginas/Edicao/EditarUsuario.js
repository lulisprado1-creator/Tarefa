import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import UsuarioApi from "../../services/usuarioApi";
import style from "./EditarUsuario.module.css"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function EditarUsuario() {


    const location = useLocation();
    const navigate = useNavigate();

    const [id] = useState(location.state)


    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [tipo, setTipoUsuario] = useState('');
    const [TiposUsuarios, setTiposUsuarios] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            await UsuarioApi.atualizarAsync(id, nome, email, tipo)
            console.log("atualizarAsync recebeu:", { id, nome, email, tipo });
            navigate('/usuarios')

        } else {
            alert('Por favore, preencha todos os campos')
        }
    }


    useEffect(() => {

        const buscarTiposUsuarios = async () => {
            try {
                const tipos = await UsuarioApi.ListarTipoUsuarioAsync();
                setTiposUsuarios(tipos);
            } catch (error) {
                console.error('Erro ao buscar tipos de usuarios', error);
            }
        };

        const buscarDadosUsuario = async () => {
            try {

                const usuario = await UsuarioApi.obterAsync(id);
                setNome(usuario.nome);
                setEmail(usuario.email);
                setTipoUsuario(Number(usuario.tipo));
            } catch (error) {
                console.error('Erro ao buscar dado do usuário:', error);
            }
        };


        buscarTiposUsuarios();
        buscarDadosUsuario();
    }, []);




    const isFormValid = () => {
        return nome && email && tipo;
    };

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3>Editar usuário</h3>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="formNome" class="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu nome"
                                name="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" class="mb-3">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Digie seu email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTipoUsuario" class="mb-3">
                            <Form.Label>Tipo Usuário</Form.Label>
                            <Form.Control

                                as="select"
                                name="tipoUsuario"
                                value={tipo}
                                onChange={(e) => setTipoUsuario(Number(e.target.value))}
                                required
                            >
                                <option value="">Selecione o tipo de usuário</option>
                                {TiposUsuarios.map((tipo) => (
                                    <option value={tipo.id}>{tipo.nome}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>



                        <Button variant="primary" type="submit" disabled={!isFormValid()}>
                            Salvar
                        </Button>



                    </Form>

                </div>
            </Topbar>
        </Sidebar>
    )
}