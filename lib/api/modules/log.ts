import httpClient from '../../http-client';

// 日志类型定义
export interface Log {
  id: number;
  level: string;
  message: string;
  source: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

// 日志查询参数
export interface LogQueryParams {
  search?: string;
  level?: string;
  source?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}

export interface LogSource {
  id: string;
  name: string;
}

// 日志API
export const logApi = {
  // 获取日志列表
  getLogs: (params?: LogQueryParams) => {
    return httpClient.get<{ items: Log[]; total: number }>('/logs', { params });
  },
  
  // 获取日志详情
  getLog: (id: number) => {
    return httpClient.get<Log>(`/logs/${id}`);
  },
  
  // 删除日志
  deleteLog: (id: number) => {
    return httpClient.delete(`/logs/${id}`);
  },
  
  // 清空日志
  clearLogs: (params?: Omit<LogQueryParams, 'page' | 'pageSize'>) => {
    return httpClient.delete('/logs', { params });
  },
  
  // 导出日志
  exportLogs: (params?: Omit<LogQueryParams, 'page' | 'pageSize'>) => {
    return httpClient.get('/logs/export', { 
      params,
      responseType: 'blob'
    });
  },
  
  // 获取日志来源列表
  getLogSources: () => {
    return httpClient.get<LogSource[]>('/logs/sources');
  },
}; 