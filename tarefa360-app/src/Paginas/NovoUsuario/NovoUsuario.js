import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import styles from "./NovoUsuario.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UsuarioApi from "../../services/usuarioApi.js";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export function NovoUsuario() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [TiposUsuarios, setTiposUsuarios] = useState([])


    const navigate = useNavigate();

    useEffect(() => {
        const fetchTiposUsuario = async () => {
            try {
                const tipos = await UsuarioApi.ListarTipoUsuarioAsync();

                setTiposUsuarios(tipos); // <-- FALTAVA ISSO
                console.log(tipos)

                if (tipos.length > 0) {
                    setTipoUsuario(tipos[0].id);
                }

            } catch (error) {
                console.error("Erro ao carregar tipos de usuário:", error);
            }
        };

        fetchTiposUsuario();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid()) {

            console.log("Enviando usuário:", {
                Nome: nome,
                Email: email,
                Senha: senha,
                TipoUsuario: tipoUsuario
            });


            await UsuarioApi.criarAsync(nome, email, senha, tipoUsuario);
            navigate("/usuarios");
        }
    }



    const isFormValid = () => {
        return nome && email && senha && tipoUsuario;
    };

    return (


        <Sidebar>
            <Topbar>
                <div className={styles.pagina_conteudo}>
                    <h3>Novo Usuário</h3>

                    <Form onSubmit={handleSubmit} className={styles.formulario}>
                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Digite o email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formSenha" className="mb-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="*******"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTipoUsuario" className="mb-3">
                            <Form.Label>Tipo de Usuario</Form.Label>
                            <Form.Control
                                as="select"
                                value={tipoUsuario}
                                onChange={(e) => setTipoUsuario(Number(e.target.value))}
                            >
                                <option value="">Selecione o tipo de usuário</option>
                                {TiposUsuarios.map(tipo => (
                                    <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                                ))}
                            </Form.Control>

                        </Form.Group>
                        <Button variant="primary" type="submit" disable={!isFormValid()}>
                            Salvar
                        </Button>



                    </Form>

                </div>
            </Topbar>

        </Sidebar>
    );
}
