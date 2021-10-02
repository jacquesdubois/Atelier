import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  vus: 100,
  duration: '10s',
};
export default function () {
  http.get(`http://localhost:5000/products/${Math.floor(Math.random() * 900000)}/styles`);
  sleep(1);
}