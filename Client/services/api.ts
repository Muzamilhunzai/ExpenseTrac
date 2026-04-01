import type { ApiResponse, ApiError } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.neonledger.io/v1';

// Simulated network delay for mock data
const MOCK_DELAY_MS = 600;

export const simulateDelay = (ms: number = MOCK_DELAY_MS): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${getAuthToken()}`, // Ready for auth
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error: ApiError = {
        message: `Request failed with status ${response.status}`,
        statusCode: response.status,
      };
      throw error;
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T, B = unknown>(endpoint: string, body: B): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T, B = unknown>(endpoint: string, body: B): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
