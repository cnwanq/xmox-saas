import httpClient from '../../http-client';
import { ApiResponse, PaginationParams, PaginatedData } from '../types';

// 设备类型定义
export interface Device {
  id: number;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  ipAddress: string;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
}

// 设备查询参数
export interface DeviceQueryParams extends PaginationParams {
  search?: string;
  type?: string;
  status?: string;
}

// 设备API
export const deviceApi = {
  // 获取设备列表
  getDevices: (params?: DeviceQueryParams) => {
    return httpClient.get<ApiResponse<PaginatedData<Device>>>('/admin/devices', { params });
  },
  
  // 获取设备详情
  getDevice: (id: number) => {
    return httpClient.get<ApiResponse<Device>>(`/admin/devices/${id}`);
  },
  
  // 创建设备
  createDevice: (data: Omit<Device, 'id' | 'lastSeen' | 'createdAt' | 'updatedAt'>) => {
    return httpClient.post<ApiResponse<Device>>('/admin/devices', data);
  },
  
  // 更新设备
  updateDevice: (id: number, data: Partial<Device>) => {
    return httpClient.put<ApiResponse<Device>>(`/admin/devices/${id}`, data);
  },
  
  // 删除设备
  deleteDevice: (id: number) => {
    return httpClient.delete<ApiResponse<null>>(`/admin/devices/${id}`);
  },
  
  // 重启设备
  restartDevice: (id: number) => {
    return httpClient.post<ApiResponse<null>>(`/admin/devices/${id}/restart`);
  },
  
  // 获取设备日志
  getDeviceLogs: (id: number, params?: PaginationParams) => {
    return httpClient.get<ApiResponse<PaginatedData<{ id: number; message: string; timestamp: string }>>>(`/admin/devices/${id}/logs`, { params });
  },
}; 