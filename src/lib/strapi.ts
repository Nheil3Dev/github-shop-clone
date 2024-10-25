const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export function get(url: string) {
  return fetch(`${STRAPI_HOST}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  }).then((res) => res.json());
}

export function getWithSignal(url: string, signal: AbortSignal) {
  return fetch(`${STRAPI_HOST}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    signal, // Pasamos la señal de abortar
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }
    return res.json();
  });
}

export function getWithoutCache(url: string) {
  return fetch(`${STRAPI_HOST}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Cache-Control": "no-store",
    },
  }).then((res) => res.json());
}

export function auth(
  url: string,
  data:
    | {
        email: string;
        password: string;
        username: string;
      }
    | {
        identifier: string;
        password: string;
      }
) {
  return fetch(`${STRAPI_HOST}/api/auth/local/${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

// CART & CUSTOMER DATA

export function post(
  url: string,
  data:
    | { cart_id: string; product_variant: string; quantity: number }
    | { firstName: string; lastName: string; users_permissions_user: string }
) {
  return fetch(`${STRAPI_HOST}/api/${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  }).then((res) => res.json());
}

export function del(url: string, product_variant: string) {
  return fetch(`${STRAPI_HOST}/api/${url}/${product_variant}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  });
}

export function put(
  url: string,
  data: { product_variant?: string; quantity?: number }
) {
  return fetch(`${STRAPI_HOST}/api/${url}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  }).then((res) => res.json());
}
