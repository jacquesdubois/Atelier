import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  vus: 10,
  duration: '10s',
};
export default function () {
  http.get(`http://localhost:5000/products/${Math.floor(Math.random() * 1000011)}/styles`);
  sleep(1);
}