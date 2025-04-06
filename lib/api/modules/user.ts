import httpClient from '../../http-client';
import { ApiResponse, PaginationParams, PaginatedData } from '../types';

// 用户类型定义
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
}

// 登录参数
export interface LoginParams {
  email: string;
  password: string;
}

// 注册参数
export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

// 用户查询参数
export interface UserQueryParams extends PaginationParams {
  search?: string;
  role?: string;
  status?: string;
}

// 用户API
export const userApi = {
  // 登录
  login: (params: LoginParams) => {
    return httpClient.post<ApiResponse<{ token: string; user: User }>>('/auth/login', params);
  },
  
  // 注册
  register: (params: RegisterParams) => {
    return httpClient.post<ApiResponse<User>>('/auth/register', params);
  },
  
  // 获取用户信息
  getProfile: () => {
    return httpClient.get<ApiResponse<User>>('/user/profile');
  },
  
  // 获取用户列表
  getUsers: (params?: UserQueryParams) => {
    return httpClient.get<ApiResponse<PaginatedData<User>>>('/admin/users', { params });
  },
  
  // 创建用户
  createUser: (data: Omit<User, 'id' | 'joinDate'>) => {
    return httpClient.post<ApiResponse<User>>('/admin/users', data);
  },
  
  // 更新用户
  updateUser: (id: number, data: Partial<User>) => {
    return httpClient.put<ApiResponse<User>>(`/admin/users/${id}`, data);
  },
  
  // 删除用户
  deleteUser: (id: number) => {
    return httpClient.delete<ApiResponse<null>>(`/admin/users/${id}`);
  },
}; 