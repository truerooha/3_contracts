import axios from 'axios';

axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

axios.interceptors.response.use(
(response) => {
    return response;
},
(error) => {
    if (error.response && error.response.status === 401) {
    // Обработка ошибки аутентификации (например, перенаправление на страницу входа)
    // Можно также реализовать обновление токена и повторный запрос
    }
    return Promise.reject(error);
}
);

export default axios;