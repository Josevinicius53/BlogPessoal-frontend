import Usuario from './Usuario';
import Tema from './Tema';

interface PostagemDTO {
    id: number;
    titulo?: string| null;
    descricao?: string| null;
    foto?: string| null;
    criador?: Usuario| null;
    tema?: Tema| null;
}

export default PostagemDTO;