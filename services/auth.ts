import type { UseFetchOptions } from 'nuxt/app';

type Methods = 'GET' | 'POST' | 'DELETE' | 'PUT';

interface ExtendedOptions<T> extends UseFetchOptions<T> {
  skipTokenRefresh?: boolean;
}

class AuthHttpRequest {
  private getToken() {
    const { getLocalStorage } = useStorage();

    return getLocalStorage('accessToken');
  }

  private getDefaultHeaders(token?: string) {
    return {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private handleError(error: any, response?: Response) {
    const { notify } = useNotify();
    const { clearAuth } = useAuth();

    if (response?.status === 401) {
      notify('登入閒置逾期，請重新登入', 'error');

      clearAuth();
    } else notify(`${response?.status} ${response?.statusText}`, 'error');
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

    const skipTokenRefresh = options?.skipTokenRefresh;

    if (!skipTokenRefresh) {
      await auth.checkTokenAndRefresh();
    }

    const requestOptions: UseFetchOptions<T> = {
      baseURL: config.public.apiAuthBaseUrl,
      method,
      headers: this.getDefaultHeaders(token ?? undefined),
      ...options,
    };

    if (method === 'GET') requestOptions.params = data;
    else requestOptions.body = data;

    const res = await useFetch(url, {
      ...requestOptions,
      onRequestError: ({ error }) => this.handleError(error),
      onResponseError: ({ response }) => this.handleError(null, response),
    });

    if (res.error.value) return res.error.value.data;

    return res.data.value;
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

const authHttpRequest = new AuthHttpRequest();

export default authHttpRequest;
