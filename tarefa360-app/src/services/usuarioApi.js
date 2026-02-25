import { HTTPClient } from "./client";

const UsuarioApi = {
    async obterAsync(usuarioId) {
        try {
            const response = await HTTPClient.get(`/Usuario/Obter/${usuarioId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter usuário:", error);
            throw error;
        }
    },
    async ListarAsync(ativos) {
        try {
            const response = await HTTPClient.get(`/Usuario/Listar?ativos=${ativos}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            throw error;
        }

    },
    async criarAsync(nome, email, senha, tipoUsuario) {
        try {
            const usuarioCriar = {
                Nome: nome,
                Email: email,
                Senha: senha,
                TipoUsuario: tipoUsuario  
            };
            const response = await HTTPClient.post(`/Usuario/Criar`, usuarioCriar);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            throw error;
        }

    },
    async atualizarAsync(usuarioId, nome, email, tipoUsuarioId) {
    try {
        const usuarioAtualizar = {
            UserId: usuarioId,     // antes estava "Id"
            Nome: nome,
            Email: email,
            TipoId: tipoUsuarioId  // antes estava "TipoUsuarioId"
        };

        const response = await HTTPClient.put(`/Usuario/Atualizar`, usuarioAtualizar);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        throw error;
    }
},

    async deletarAsync(usuarioId) {
        try {
            const response = await HTTPClient.delete(`/Usuario/Deletar/${usuarioId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            throw error;
        }


    },

    async ListarTipoUsuarioAsync() {
        try {
            const response = await HTTPClient.get(`/Usuario/ListarTiposUsuario`);
            return response.data;
        } catch (error) {
            console.error("Erro ao listar tipos de usuário:", error);
            throw error;
        }
    },

    async alterarSenhaAsync(usuarioId, novaSenha, senhaAtual) {
        try {
            const senhaAlterar = {
                Id: usuarioId,
                NovaSenha: novaSenha,
                SenhaAtual: senhaAtual
            };
            const response = await HTTPClient.put(`/Usuario/AlterarSenha`, senhaAlterar);
            return response.data;
        } catch (error) {
            console.error("Erro ao alterar senha do usuário:", error);
            throw error;
        }
    },

    async restaurarAsync(usuarioId) {
        try {
            const response = await HTTPClient.put(`/Usuario/Restaurar/${usuarioId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao restaurar usuário:", error);
            throw error;
        }
    }
}

export default UsuarioApi;
