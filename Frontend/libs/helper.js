import fetch from 'isomorphic-unfetch';
import { API_URL } from '../configs/app';

export async function fetchAsync(url, opts) {
  if (opts.body) {
    opts.headers = {
      'content-type': 'application/json',
    };
    opts.body = JSON.stringify(opts.body);
  }
  opts.credentials = 'include';
  try {
    const response = await fetch(API_URL + url, opts);
    const data = await response.json();
    return {
      status: response.status,
      data,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchAsyncForm(url, formData, method = 'POST') {
  const opts = {
    method,
    body: formData,
    credentials: 'include',
  };
  try {
    const response = await fetch(API_URL + url, opts);
    const data = await response.json();
    return {
      status: response.status,
      data,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
