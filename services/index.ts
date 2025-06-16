import type { FetchOptions } from 'ofetch';

type Methods = 'GET' | 'POST' | 'DELETE' | 'PUT';

interface ExtendedOptions<T> extends FetchOptions<'json', T> {
  disableDefaultParams?: boolean;
}

class HttpRequest {
  private getToken() {
    const { getLocalStorage } = useStorage();

    return getLocalStorage('accessToken');
  }

  private getDefaultHeaders(token?: string) {
    return {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private getDefaultParams(disableDefault: boolean): Record<string, any> {
    const { user } = useAuth();

    return disableDefault ? {} : { UUID_Company: user?.id };
  }

  private handleError(error: any, response?: Response) {
    const { notify } = useNotify();
    const { clearAuth } = useAuth();

    if (response?.status === 401) {
      notify('登入閒置逾期，請重新登入', 'error');

      clearAuth();
    } else notify(`${response?.status} ${response?.statusText}`, 'error');
  }

  private buildRequestBody(data: any, method: string, mergedParams: any) {
    if (data instanceof FormData || method === 'DELETE') return data;

    if (Array.isArray(data)) return data.map(item => ({ ...mergedParams, ...item }));

    return [{ ...mergedParams, ...data }];
  }

  public async request<T = any>(
    url: string,
    method: Methods,
    data?: any,
    options: ExtendedOptions<T> = {},
  ) {
    const token = this.getToken();

    const config = useRuntimeConfig();
    const auth = useAuth();

    await auth.checkTokenAndRefresh();

    const defaultParams = this.getDefaultParams(!!options.disableDefaultParams);
    const mergedParams = { ...defaultParams, ...(options.params || {}) };

    try {
      const res = await $fetch<T>(url, {
        baseURL: config.public.apiUrl,
        method,
        headers: this.getDefaultHeaders(token ?? undefined),
        query: mergedParams,
        body: method !== 'GET' ? this.buildRequestBody(data, method, mergedParams) : undefined,
        ...options,
      });

      return res;
    } catch (error: any) {
      this.handleError(error, error?.response);

      return error?.response?._data || null;
    }
  }

  public get<T = any>(url: string, params?: any, options?: ExtendedOptions<T>) {
    return this.request<T>(url, 'GET', params, options);
  }

  public post<T = any>(url: string, data: any, options?: ExtendedOptions<T>) {
    return this.request<T>(url, 'POST', data, options);
  }

  public put<T = any>(url: string, data: any, options?: ExtendedOptions<T>) {
    return this.request<T>(url, 'PUT', data, options);
  }

  public delete<T = any>(url: string, data: any, options?: ExtendedOptions<T>) {
    return this.request<T>(url, 'DELETE', data, options);
  }
}

const httpRequest = new HttpRequest();

export default httpRequest;
