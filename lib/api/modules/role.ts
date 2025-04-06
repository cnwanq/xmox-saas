import httpClient from '../../http-client';
import { ApiResponse, PaginationParams, PaginatedData } from '../types';

// 角色类型定义
export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

// 角色查询参数
export interface RoleQueryParams extends PaginationParams {
  search?: string;
}

// 角色API
export const roleApi = {
  // 获取角色列表
  getRoles: (params?: RoleQueryParams) => {
    return httpClient.get<ApiResponse<PaginatedData<Role>>>('/admin/roles', { params });
  },
  
  // 获取角色详情
  getRole: (id: number) => {
    return httpClient.get<ApiResponse<Role>>(`/admin/roles/${id}`);
  },
  
  // 创建角色
  createRole: (data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => {
    return httpClient.post<ApiResponse<Role>>('/admin/roles', data);
  },
  
  // 更新角色
  updateRole: (id: number, data: Partial<Role>) => {
    return httpClient.put<ApiResponse<Role>>(`/admin/roles/${id}`, data);
  },
  
  // 删除角色
  deleteRole: (id: number) => {
    return httpClient.delete<ApiResponse<null>>(`/admin/roles/${id}`);
  },
  
  // 获取所有权限
  getPermissions: () => {
    return httpClient.get<ApiResponse<string[]>>('/admin/permissions');
  },
}; 