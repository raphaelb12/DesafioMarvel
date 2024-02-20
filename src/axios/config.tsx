import md5 from "md5";
import axios from "axios";

const publicKey = "39ae8072f88505a3fb805787b91d3048";
const privateKey = "17c9ea75d5991befac3a4d05d6d057cd3acac24f";

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


