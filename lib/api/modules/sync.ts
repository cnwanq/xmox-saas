import httpClient from '../../http-client';
import { ApiResponse, PaginationParams, PaginatedData } from '../types';

// 同步任务类型定义
export interface SyncTask {
  id: number;
  name: string;
  source: string;
  destination: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  startedAt: string | null;
  completedAt: string | null;
  error: string | null;
  createdAt: string;
  updatedAt: string;
}

// 同步任务查询参数
export interface SyncTaskQueryParams extends PaginationParams {
  search?: string;
  status?: string;
}

// 同步API
export const syncApi = {
  // 获取同步任务列表
  getTasks: (params?: SyncTaskQueryParams) => {
    return httpClient.get<ApiResponse<PaginatedData<SyncTask>>>('/admin/sync/tasks', { params });
  },
  
  // 获取同步任务详情
  getTask: (id: number) => {
    return httpClient.get<ApiResponse<SyncTask>>(`/admin/sync/tasks/${id}`);
  },
  
  // 创建同步任务
  createTask: (data: Omit<SyncTask, 'id' | 'status' | 'progress' | 'startedAt' | 'completedAt' | 'error' | 'createdAt' | 'updatedAt'>) => {
    return httpClient.post<ApiResponse<SyncTask>>('/admin/sync/tasks', data);
  },
  
  // 更新同步任务
  updateTask: (id: number, data: Partial<SyncTask>) => {
    return httpClient.put<ApiResponse<SyncTask>>(`/admin/sync/tasks/${id}`, data);
  },
  
  // 删除同步任务
  deleteTask: (id: number) => {
    return httpClient.delete<ApiResponse<null>>(`/admin/sync/tasks/${id}`);
  },
  
  // 启动同步任务
  startTask: (id: number) => {
    return httpClient.post<ApiResponse<SyncTask>>(`/admin/sync/tasks/${id}/start`);
  },
  
  // 停止同步任务
  stopTask: (id: number) => {
    return httpClient.post<ApiResponse<SyncTask>>(`/admin/sync/tasks/${id}/stop`);
  },
  
  // 获取可用的数据源
  getSources: () => {
    return httpClient.get<ApiResponse<string[]>>('/admin/sync/sources');
  },
  
  // 获取可用的目标
  getDestinations: () => {
    return httpClient.get<ApiResponse<string[]>>('/admin/sync/destinations');
  },
}; 