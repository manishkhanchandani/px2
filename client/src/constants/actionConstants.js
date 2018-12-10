
export const SEARCH_RESULT = 'SEARCH_RESULT';
export const DETAILS = 'DETAILS';
export const SEARCH_TERM = 'SEARCH_TERM';
export const KEY = '5PlA7gmXyIm31AcNfINKMA';
export const API_URL = (process.env.NODE_ENV === 'development') ? '/' : '/';

console.log('env: ', process.env.NODE_ENV);
console.log('API_URL: ', API_URL);