import md5 from "md5";

const baseURL = "https://gateway.marvel.com/v1/public/";

const publicKey = "39ae8072f88505a3fb805787b91d3048";
const privateKey = "17c9ea75d5991befac3a4d05d6d057cd3acac24f";

const time = Number(new Date());
const hash = md5(time + privateKey + publicKey);

export { publicKey, privateKey, time, hash};


