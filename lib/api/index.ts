// 导入API模块
import { userApi } from './modules/user';
import { statsApi } from './modules/stats';
import { roleApi } from './modules/role';
import { deviceApi } from './modules/device';
import { syncApi } from './modules/sync';
import { logApi } from './modules/log';

// 导出所有API
export const api = {
  user: userApi,
  stats: statsApi,
  role: roleApi,
  device: deviceApi,
  sync: syncApi,
  log: logApi,
};

// 导出类型
export * from './types';
export * from './modules/user';
export * from './modules/stats';
export * from './modules/role';
export * from './modules/device';
export * from './modules/sync';
export * from './modules/log';

export default api; 