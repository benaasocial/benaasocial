import { ApiOk } from "./../types/types";
import apiCall from "./apiCall";


type User = {
  id: string;
  username: string;
  email: string;
  role: "owner" | "user";
  createdAt: string;
  updatedAt: string;
}

/**
 * HttpServices class
 *
 * This class is used to make API requests
 * for a specific endpoint.
 *
 * Example:
 * const usersService = new HttpServices("users");
 */
class HttpServices {
  /**
   * API endpoint name
   * Example: users, posts, connect
   */
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Get current logged-in user
   * GET /endpoint/me
   */
  async getMe() {
    const res = await apiCall.get<ApiOk<{ user: User }>>(`/${this.endpoint}/me`);
    return res.data;
  }

  /**
   * Get all items
   * GET /endpoint
   */
  async getAll<T>() {
    const res = await apiCall.get<ApiOk<T>>(`/${this.endpoint}`);
    return res.data;
  }

  /**
   * Get paginated items
   * GET /endpoint?page=1&limit=10
   */
  async getAllWithQuery<T>(page: number, limit: number) {
    const res = await apiCall.get<ApiOk<T>>(`/${this.endpoint}`, {
      params: {
        page,
        limit,
      },
    });

    return res.data;
  }

  /**
   * Get one item by id
   * GET /endpoint/:id
   */
  async getById<T>(id: string) {
    const res = await apiCall.get<ApiOk<T>>(`/${this.endpoint}/${id}`);
    return res.data;
  }

  /**
   * Create a new item
   * POST /endpoint
   */
  async post<T>(data: unknown) {
    const res = await apiCall.post<ApiOk<T>>(`/${this.endpoint}`, data);
    return res.data;
  }

  /**
   * Delete one item by id
   * DELETE /endpoint/:id
   */
  async delete<T>(id: string) {
    const res = await apiCall.delete<ApiOk<T>>(`/${this.endpoint}/${id}`);
    return res.data;
  }

  /**
   * Update one item by id
   * PUT /endpoint/:id
   */
  async put<T>(info: unknown, id: string) {
    const res = await apiCall.put<ApiOk<T>>(`/${this.endpoint}/${id}`, {
      info,
    });

    return res.data;
  }

  /**
   * Update part of data
   * PATCH /endpoint/:platform
   */
  async patch<T>(info: unknown, platform: string) {
    const res = await apiCall.patch<ApiOk<T>>(`/${this.endpoint}/${platform}`, {
      info,
    });

    return res.data;
  }
}

export default HttpServices;