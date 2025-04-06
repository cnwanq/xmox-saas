import httpClient from '../../http-client';
import { ApiResponse } from '../types';

// 仪表盘统计数据类型
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  monthlyRevenue: number;
  conversionRate: number;
}

// 统计API
export const statsApi = {
  // 获取仪表盘统计数据
  getDashboardStats: () => {
    return httpClient.get<ApiResponse<DashboardStats>>('/admin/stats/dashboard');
  },
}; 