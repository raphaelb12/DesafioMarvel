import md5 from "md5";
import axios from "axios";

//aqui é feita a configuração do axios para a requisição da api da marvel

const publicKey = import.meta.env.VITE_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;

const time = Number(new Date());
const hash = md5(time + privateKey + publicKey);

const config = axios.create({
   baseURL:  'https://gateway.marvel.com/v1/public',
   params: {
    ts: time,
    apikey: publicKey,
    hash: hash, }
})

export default config;