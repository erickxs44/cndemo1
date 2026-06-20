export const getStoreId = () => process.env.NUVEMSHOP_STORE_ID;
export const getAccessToken = () => process.env.NUVEMSHOP_ACCESS_TOKEN;

const getApiBaseUrl = () => {
  const storeId = getStoreId();
  if (!storeId) throw new Error('NUVEMSHOP_STORE_ID is not configured.');
  return `https://api.nuvemshop.com.br/v1/${storeId}`;
};

export async function nuvemshopFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('Nuvemshop credentials are not configured in environment variables.');
  }

  const url = `${getApiBaseUrl()}${endpoint}`;
  
  const headers = new Headers(options.headers);
  headers.set('Authentication', `bearer ${accessToken}`);
  headers.set('User-Agent', 'HeadlessEcommerce (developer@example.com)');
  
  if (!headers.has('Content-Type') && options.method && options.method !== 'GET' && options.method !== 'HEAD') {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[Nuvemshop API Error] ${response.status} ${response.statusText} - ${errorText}`);
    throw new Error(`Nuvemshop API Error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
