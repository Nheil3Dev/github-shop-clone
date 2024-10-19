const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export function get(url: string) {
  return fetch(`${STRAPI_HOST}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  }).then((res) => res.json());
}

export function getWithoutCache(url: string) {
  return fetch(`${STRAPI_HOST}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Cache-Control": "no-store",
    },
  }).then((res) => res.json());
}

// CART

export function post(
  url: string,
  data: { cart_id: string; product_variant: string; quantity: number }
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
