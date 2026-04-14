import axios from 'axios'

/**
 * Instância do Axios configurada para fazer requisições HTTP
 * 
 * O que é Axios?
 * - Biblioteca JavaScript para fazer requisições HTTP (GET, POST, PUT, DELETE, etc)
 * - Similar ao fetch() do navegador, mas mais simples e com mais recursos
 * - Suporta Promises e async/await
 * - Intercepta automaticamente dados JSON
 * 
 * Vantagens:
 * - Sintaxe mais limpa que fetch()
 * - Cancelamento automático de requisições
 * - Transformação automática de dados JSON
 * - Timeout configurável
 * - Melhor tratamento de erros
 */

// Cria uma instância do axios com configurações padrão
export const api = axios.create({
  baseURL: 'https://api.github.com', // URL base para todas as requisições
  timeout: 10000, // Tempo máximo de espera (10 segundos)
})

/**
 * Exemplos de como usar o axios:
 * 
 * 1. GET (buscar dados)
 *    const response = await api.get('/users/eduardavieira-dev')
 *    console.log(response.data) // dados retornados
 * 
 * 2. POST (enviar dados)
 *    const response = await api.post('/endpoint', { nome: 'João' })
 * 
 * 3. PUT (atualizar dados)
 *    const response = await api.put('/endpoint/1', { nome: 'Maria' })
 * 
 * 4. DELETE (deletar dados)
 *    const response = await api.delete('/endpoint/1')
 * 
 * Tratamento de erros:
 *    try {
 *      const response = await api.get('/users/usuario-inexistente')
 *    } catch (error) {
 *      console.error('Erro na requisição:', error.message)
 *      console.error('Status:', error.response?.status) // 404, 500, etc
 *    }
 */
