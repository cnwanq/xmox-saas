import { useState, useCallback } from 'react';
import { ApiResponse } from '../api';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFunction(...args);
        setData(response.data);
        options.onSuccess?.(response.data);
        return response.data;
      } catch (err) {
        setError(err);
        options.onError?.(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, options]
  );

  return {
    data,
    loading,
    error,
    execute,
  };
}

// 使用示例
/*
import { useApi } from '@/lib/hooks/useApi';
import { api } from '@/lib/api';

function UserList() {
  const { data, loading, error, execute: fetchUsers } = useApi(api.user.getUsers, {
    onSuccess: (data) => {
      console.log('获取用户列表成功:', data);
    },
    onError: (error) => {
      console.error('获取用户列表失败:', error);
    },
  });

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      {data.users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
*/ 