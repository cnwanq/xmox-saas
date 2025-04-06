'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Device } from '@/lib/api/modules/device';
import { Plus, Search, Edit, Trash2, RefreshCw, FileText } from 'lucide-react';

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceType, setDeviceType] = useState<string>('');
  const [deviceStatus, setDeviceStatus] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [deviceLogs, setDeviceLogs] = useState<{ id: number; message: string; timestamp: string }[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    type: '',
    ipAddress: '',
    status: 'offline' as 'online' | 'offline' | 'maintenance',
  });

  // 获取设备列表
  const fetchDevices = async () => {
    try {
      setLoading(true);
      const response = await api.device.getDevices({ 
        search: searchTerm,
        type: deviceType || undefined,
        status: deviceStatus || undefined
      });
      setDevices(response.data.data.items);
    } catch (error) {
      console.error('获取设备列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 创建设备
  const handleCreateDevice = async () => {
    try {
      await api.device.createDevice(newDevice);
      setShowAddModal(false);
      setNewDevice({ name: '', type: '', ipAddress: '', status: 'offline' });
      fetchDevices();
    } catch (error) {
      console.error('创建设备失败:', error);
    }
  };

  // 更新设备
  const handleUpdateDevice = async () => {
    if (!selectedDevice) return;
    
    try {
      await api.device.updateDevice(selectedDevice.id, {
        name: selectedDevice.name,
        type: selectedDevice.type,
        ipAddress: selectedDevice.ipAddress,
      });
      setShowEditModal(false);
      setSelectedDevice(null);
      fetchDevices();
    } catch (error) {
      console.error('更新设备失败:', error);
    }
  };

  // 删除设备
  const handleDeleteDevice = async (id: number) => {
    if (!confirm('确定要删除这个设备吗？')) return;
    
    try {
      await api.device.deleteDevice(id);
      fetchDevices();
    } catch (error) {
      console.error('删除设备失败:', error);
    }
  };

  // 重启设备
  const handleRestartDevice = async (id: number) => {
    if (!confirm('确定要重启这个设备吗？')) return;
    
    try {
      await api.device.restartDevice(id);
      fetchDevices();
    } catch (error) {
      console.error('重启设备失败:', error);
    }
  };

  // 查看设备日志
  const handleViewLogs = async (device: Device) => {
    setSelectedDevice(device);
    setShowLogsModal(true);
    setLogsLoading(true);
    
    try {
      const response = await api.device.getDeviceLogs(device.id);
      setDeviceLogs(response.data.data.items);
    } catch (error) {
      console.error('获取设备日志失败:', error);
    } finally {
      setLogsLoading(false);
    }
  };

  // 编辑设备
  const handleEditDevice = (device: Device) => {
    setSelectedDevice({ ...device });
    setShowEditModal(true);
  };

  // 获取状态标签样式
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'offline':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // 获取状态中文名称
  const getStatusName = (status: string) => {
    switch (status) {
      case 'online':
        return '在线';
      case 'offline':
        return '离线';
      case 'maintenance':
        return '维护中';
      default:
        return status;
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [searchTerm, deviceType, deviceStatus]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">设备管理</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加设备
        </button>
      </div>

      {/* 搜索和筛选 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="搜索设备..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <select
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">所有类型</option>
            <option value="server">服务器</option>
            <option value="router">路由器</option>
            <option value="switch">交换机</option>
            <option value="sensor">传感器</option>
          </select>
        </div>
        <div>
          <select
            value={deviceStatus}
            onChange={(e) => setDeviceStatus(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">所有状态</option>
            <option value="online">在线</option>
            <option value="offline">离线</option>
            <option value="maintenance">维护中</option>
          </select>
        </div>
      </div>

      {/* 设备列表 */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-md">
        {loading ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">加载中...</div>
        ) : devices.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">没有找到设备</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  设备名称
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  类型
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  IP地址
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  最后在线时间
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {devices.map((device) => (
                <tr key={device.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {device.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {device.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(device.status)}`}>
                      {getStatusName(device.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {device.ipAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {device.lastSeen ? new Date(device.lastSeen).toLocaleString() : '从未在线'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewLogs(device)}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 mr-4"
                      title="查看日志"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRestartDevice(device.id)}
                      className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 mr-4"
                      title="重启设备"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditDevice(device)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                      title="编辑设备"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDevice(device.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      title="删除设备"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 添加设备模态框 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">添加设备</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  设备名称
                </label>
                <input
                  type="text"
                  value={newDevice.name}
                  onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  设备类型
                </label>
                <select
                  value={newDevice.type}
                  onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">选择类型</option>
                  <option value="server">服务器</option>
                  <option value="router">路由器</option>
                  <option value="switch">交换机</option>
                  <option value="sensor">传感器</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  IP地址
                </label>
                <input
                  type="text"
                  value={newDevice.ipAddress}
                  onChange={(e) => setNewDevice({ ...newDevice, ipAddress: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  取消
                </button>
                <button
                  onClick={handleCreateDevice}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  创建
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 编辑设备模态框 */}
      {showEditModal && selectedDevice && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">编辑设备</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  设备名称
                </label>
                <input
                  type="text"
                  value={selectedDevice.name}
                  onChange={(e) => setSelectedDevice({ ...selectedDevice, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  设备类型
                </label>
                <select
                  value={selectedDevice.type}
                  onChange={(e) => setSelectedDevice({ ...selectedDevice, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">选择类型</option>
                  <option value="server">服务器</option>
                  <option value="router">路由器</option>
                  <option value="switch">交换机</option>
                  <option value="sensor">传感器</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  IP地址
                </label>
                <input
                  type="text"
                  value={selectedDevice.ipAddress}
                  onChange={(e) => setSelectedDevice({ ...selectedDevice, ipAddress: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  取消
                </button>
                <button
                  onClick={handleUpdateDevice}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 设备日志模态框 */}
      {showLogsModal && selectedDevice && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {selectedDevice.name} 的设备日志
            </h2>
            <div className="max-h-96 overflow-y-auto">
              {logsLoading ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">加载中...</div>
              ) : deviceLogs.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">没有日志记录</div>
              ) : (
                <div className="space-y-2">
                  {deviceLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md text-sm"
                    >
                      <div className="flex justify-between">
                        <span className="text-gray-900 dark:text-white">{log.message}</span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowLogsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 