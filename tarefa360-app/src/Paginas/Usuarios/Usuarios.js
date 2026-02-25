import { MdDelete, MdEdit } from "react-icons/md";
import { Sidebar } from "../../componentes/Sidebar/Sidebar.js";
import { Topbar } from "../../componentes/Topbar/Topbar.js";
import styles from "./Usuarios.module.css";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import UsuarioApi from "../../services/usuarioApi.js";



export function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);

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
                        <Link to="/usuario/novo" className={styles.botao_novo_usuario}>Novo Usuário</Link>
                    </div>

                    <div classname={styles.tabela}>
                        <Table responsive>
                            <thead className={styles.tabela_cabecalho}>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Ações</th>
                                </tr>


                            </thead>
                            <tbody className={styles.tabela_corpo}>
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.email}</td>
                                        <td>
                                            <Link to='/usuario/editar' state={usuario.id} className={styles.botao_editar}>
                                                <MdEdit />

                                            </Link>
                                            <Link to='/usuario/deletar' state={usuario.id} className={styles.botao_deletar}>
                                                <MdDelete />
                                            </Link>

                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </div>

                </div>
            </Topbar>
        </Sidebar>
    )
}
