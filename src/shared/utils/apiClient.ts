/**
 * Centralized API client for making authenticated requests to the backend.
 * Automatically adds the Authorization header with Bearer token.
 */

const BASE_URL = 'https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api';

interface FetchOptions extends RequestInit {
  token?: string;
}

/**
 * Makes an authenticated API request with the Authorization header.
 * @param endpoint - The API endpoint (e.g., '/playlists/random')
 * @param token - The Spotify access token
 * @param options - Additional fetch options (method, body, etc.)
 */
export const apiClient = async (
  endpoint: string,
  token: string,
  options: FetchOptions = {}
): Promise<Response> => {
  const { headers = {}, ...restOptions } = options;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  });

  return response;
};

/**
 * Makes an authenticated GET request.
 */
export const apiGet = async (
  endpoint: string,
  token: string,
  queryParams?: Record<string, string>
): Promise<Response> => {
  const url = queryParams
    ? `${endpoint}?${new URLSearchParams(queryParams).toString()}`
    : endpoint;

  return apiClient(url, token, { method: 'GET' });
};

/**
 * Makes an authenticated POST request.
 */
export const apiPost = async (
  endpoint: string,
  token: string,
  body: unknown,
  queryParams?: Record<string, string>
): Promise<Response> => {
  const url = queryParams
    ? `${endpoint}?${new URLSearchParams(queryParams).toString()}`
    : endpoint;

  return apiClient(url, token, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

