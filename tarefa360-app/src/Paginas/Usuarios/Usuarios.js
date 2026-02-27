import { MdDelete, MdEdit } from "react-icons/md";
import { Sidebar } from "../../componentes/Sidebar/Sidebar.js";
import { Topbar } from "../../componentes/Topbar/Topbar.js";
import styles from "./Usuarios.module.css";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import UsuarioApi from "../../services/usuarioApi.js";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { GrAdd } from "react-icons/gr";




export function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

    const handleClickDeletar = (usuario) => {
        setUsuarioSelecionado(usuario)
        setMostrarModal(true);
    };

    const handleDeletar = async () => {
        try {
            await UsuarioApi.deletarAsync(usuarioSelecionado.userId);
            setUsuarios(usuarios.filter(u => u.userId !== usuarioSelecionado.userId));
        } catch (error) {
            console.error("Erro ao deletar usuário", error)
        } finally {
            handleFecharModal()
        }
    };

    const handleFecharModal = () => {
        setMostrarModal(false);
        setUsuarioSelecionado(null);
    };



    async function carregarUsuarios() {
        try {
            const listaUsuarios = await UsuarioApi.ListarAsync(true);
            setUsuarios(listaUsuarios);

        } catch (error) {
            console.error("Erro ao carregar usuários:", error);
        }

    }
    useEffect(() => {
        carregarUsuarios();
    }, []);



    return (
        <Sidebar>
            <Topbar>
                <div className={styles.pagina_conteudo}>
                    <div className={styles.pagina_cabecalho}>
                        <h3>Usuários</h3>
                        <Link to="/usuario/novo" className={styles.botao_novo_usuario}>
                            <GrAdd className={styles.botao_novo_usuario} title="Novo usuário" />
                        </Link>
                    </div>

                    <div classname={styles.tabela}>
                        <Table responsive>
                            <thead className={styles.tabela_cabecalho}>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Ações</th>
                                </tr>


                            </thead>
                            <tbody className={styles.tabela_corpo}>
                                {usuarios.map((usuario) => (

                                    <tr key={usuario.userId}>
                                        <td>{usuario.userId}</td>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.email}</td>

                                        <td>


                                            <Link to='/usuario/editar' state={usuario.userId} className={styles.botao_editar}>
                                                <MdEdit title="Editar" />

                                            </Link>
                                            <button onClick={() => handleClickDeletar(usuario)} className={styles.botao_deletar}>
                                                <MdDelete title="Deletar" />

                                            </button>

                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </div>

                    <Modal show={mostrarModal} onHide={handleFecharModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmar</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            Tem certeza que deseja deletar o usuário {usuarioSelecionado?.nome}?
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleFecharModal}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDeletar}>
                                Deletar!!
                            </Button>
                        </Modal.Footer>

                    </Modal>
                </div>
            </Topbar>
        </Sidebar>
    )
}
