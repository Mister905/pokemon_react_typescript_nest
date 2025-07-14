import { useCallback } from 'react';
import { useAppDispatch } from './index';
import { startLoading, stopLoading } from '../features/loading/loadingSlice';
import axios from '../utils/axios';

interface ApiCallOptions {
  showLoading?: boolean;
  loadingMessage?: string;
}

export const useApiWithLoading = () => {
  const dispatch = useAppDispatch();

  const apiCall = useCallback(async <T>(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: string,
    data?: any,
    options: ApiCallOptions = {}
  ): Promise<T> => {
    const { showLoading = true, loadingMessage = 'Loading...' } = options;

    if (showLoading) {
      dispatch(startLoading(loadingMessage));
    }

    try {
      const response = await axios[method](url, data);
      return response.data;
    } finally {
      if (showLoading) {
        dispatch(stopLoading());
      }
    }
  }, [dispatch]);

  return {
    apiCall,
    get: <T>(url: string, options?: ApiCallOptions) => apiCall<T>('get', url, undefined, options),
    post: <T>(url: string, data?: any, options?: ApiCallOptions) => apiCall<T>('post', url, data, options),
    put: <T>(url: string, data?: any, options?: ApiCallOptions) => apiCall<T>('put', url, data, options),
    delete: <T>(url: string, options?: ApiCallOptions) => apiCall<T>('delete', url, undefined, options),
    patch: <T>(url: string, data?: any, options?: ApiCallOptions) => apiCall<T>('patch', url, data, options),
  };
};
