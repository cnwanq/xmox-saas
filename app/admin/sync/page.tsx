'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { SyncTask } from '@/lib/api/modules/sync';
import { Plus, Search, Edit, Trash2, Play, Pause, RefreshCw } from 'lucide-react';

export default function SyncPage() {
  const [tasks, setTasks] = useState<SyncTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [taskStatus, setTaskStatus] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<SyncTask | null>(null);
  const [sources, setSources] = useState<{ id: string; name: string }[]>([]);
  const [destinations, setDestinations] = useState<{ id: string; name: string }[]>([]);
  const [newTask, setNewTask] = useState({
    name: '',
    sourceId: '',
    destinationId: '',
    schedule: '',
    enabled: true,
  });

  // 获取同步任务列表
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.sync.getTasks({ 
        search: searchTerm,
        status: taskStatus || undefined
      });
      setTasks(response.data.data.items);
    } catch (error) {
      console.error('获取同步任务列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 获取数据源列表
  const fetchSources = async () => {
    try {
      const response = await api.sync.getSources();
      setSources(response.data.data.items);
    } catch (error) {
      console.error('获取数据源列表失败:', error);
    }
  };

  // 获取目标列表
  const fetchDestinations = async () => {
    try {
      const response = await api.sync.getDestinations();
      setDestinations(response.data.data.items);
    } catch (error) {
      console.error('获取目标列表失败:', error);
    }
  };

  // 创建同步任务
  const handleCreateTask = async () => {
    try {
      await api.sync.createTask(newTask);
      setShowAddModal(false);
      setNewTask({ name: '', sourceId: '', destinationId: '', schedule: '', enabled: true });
      fetchTasks();
    } catch (error) {
      console.error('创建同步任务失败:', error);
    }
  };

  // 更新同步任务
  const handleUpdateTask = async () => {
    if (!selectedTask) return;
    
    try {
      await api.sync.updateTask(selectedTask.id, {
        name: selectedTask.name,
        sourceId: selectedTask.sourceId,
        destinationId: selectedTask.destinationId,
        schedule: selectedTask.schedule,
        enabled: selectedTask.enabled,
      });
      setShowEditModal(false);
      setSelectedTask(null);
      fetchTasks();
    } catch (error) {
      console.error('更新同步任务失败:', error);
    }
  };

  // 删除同步任务
  const handleDeleteTask = async (id: number) => {
    if (!confirm('确定要删除这个同步任务吗？')) return;
    
    try {
      await api.sync.deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('删除同步任务失败:', error);
    }
  };

  // 启动同步任务
  const handleStartTask = async (id: number) => {
    if (!confirm('确定要启动这个同步任务吗？')) return;
    
    try {
      await api.sync.startTask(id);
      fetchTasks();
    } catch (error) {
      console.error('启动同步任务失败:', error);
    }
  };

  // 停止同步任务
  const handleStopTask = async (id: number) => {
    if (!confirm('确定要停止这个同步任务吗？')) return;
    
    try {
      await api.sync.stopTask(id);
      fetchTasks();
    } catch (error) {
      console.error('停止同步任务失败:', error);
    }
  };

  // 编辑同步任务
  const handleEditTask = (task: SyncTask) => {
    setSelectedTask({ ...task });
    setShowEditModal(true);
  };

  // 获取状态标签样式
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'stopped':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'failed':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // 获取状态中文名称
  const getStatusName = (status: string) => {
    switch (status) {
      case 'running':
        return '运行中';
      case 'stopped':
        return '已停止';
      case 'scheduled':
        return '已计划';
      case 'failed':
        return '失败';
      default:
        return status;
    }
  };

  // 获取数据源名称
  const getSourceName = (sourceId: string) => {
    const source = sources.find(s => s.id === sourceId);
    return source ? source.name : sourceId;
  };

  // 获取目标名称
  const getDestinationName = (destinationId: string) => {
    const destination = destinations.find(d => d.id === destinationId);
    return destination ? destination.name : destinationId;
  };

  useEffect(() => {
    fetchTasks();
    fetchSources();
    fetchDestinations();
  }, [searchTerm, taskStatus]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">数据同步</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加同步任务
        </button>
      </div>

      {/* 搜索和筛选 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="搜索同步任务..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">所有状态</option>
            <option value="running">运行中</option>
            <option value="stopped">已停止</option>
            <option value="scheduled">已计划</option>
            <option value="failed">失败</option>
          </select>
        </div>
      </div>

      {/* 同步任务列表 */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-md">
        {loading ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">加载中...</div>
        ) : tasks.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">没有找到同步任务</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  任务名称
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  数据源
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  目标
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  计划
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  上次同步
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {task.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {getSourceName(task.sourceId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {getDestinationName(task.destinationId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(task.status)}`}>
                      {getStatusName(task.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {task.schedule}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {task.lastSync ? new Date(task.lastSync).toLocaleString() : '从未同步'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {task.status === 'running' ? (
                      <button
                        onClick={() => handleStopTask(task.id)}
                        className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 mr-4"
                        title="停止任务"
                      >
                        <Pause className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartTask(task.id)}
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-4"
                        title="启动任务"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleEditTask(task)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                      title="编辑任务"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      title="删除任务"
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

      {/* 添加同步任务模态框 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">添加同步任务</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  任务名称
                </label>
                <input
                  type="text"
                  value={newTask.name}
                  onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  数据源
                </label>
                <select
                  value={newTask.sourceId}
                  onChange={(e) => setNewTask({ ...newTask, sourceId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">选择数据源</option>
                  {sources.map((source) => (
                    <option key={source.id} value={source.id}>
                      {source.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  目标
                </label>
                <select
                  value={newTask.destinationId}
                  onChange={(e) => setNewTask({ ...newTask, destinationId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">选择目标</option>
                  {destinations.map((destination) => (
                    <option key={destination.id} value={destination.id}>
                      {destination.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  计划 (Cron 表达式)
                </label>
                <input
                  type="text"
                  value={newTask.schedule}
                  onChange={(e) => setNewTask({ ...newTask, schedule: e.target.value })}
                  placeholder="例如: 0 0 * * * (每天午夜)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enabled"
                  checked={newTask.enabled}
                  onChange={(e) => setNewTask({ ...newTask, enabled: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  启用任务
                </label>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  取消
                </button>
                <button
                  onClick={handleCreateTask}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  创建
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 编辑同步任务模态框 */}
      {showEditModal && selectedTask && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">编辑同步任务</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  任务名称
                </label>
                <input
                  type="text"
                  value={selectedTask.name}
                  onChange={(e) => setSelectedTask({ ...selectedTask, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  数据源
                </label>
                <select
                  value={selectedTask.sourceId}
                  onChange={(e) => setSelectedTask({ ...selectedTask, sourceId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">选择数据源</option>
                  {sources.map((source) => (
                    <option key={source.id} value={source.id}>
                      {source.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  目标
                </label>
                <select
                  value={selectedTask.destinationId}
                  onChange={(e) => setSelectedTask({ ...selectedTask, destinationId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">选择目标</option>
                  {destinations.map((destination) => (
                    <option key={destination.id} value={destination.id}>
                      {destination.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  计划 (Cron 表达式)
                </label>
                <input
                  type="text"
                  value={selectedTask.schedule}
                  onChange={(e) => setSelectedTask({ ...selectedTask, schedule: e.target.value })}
                  placeholder="例如: 0 0 * * * (每天午夜)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="edit-enabled"
                  checked={selectedTask.enabled}
                  onChange={(e) => setSelectedTask({ ...selectedTask, enabled: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="edit-enabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  启用任务
                </label>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  取消
                </button>
                <button
                  onClick={handleUpdateTask}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 