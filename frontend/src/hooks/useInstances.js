import { useState, useEffect, useCallback } from 'react';
import { instanceAPI } from '../services/api';

export const useInstances = () => {
  const [instances, setInstances] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRecords: 0,
    totalPages: 0,
  });

  const [filters, setFilters] = useState({
    search: '',
    state: '',
    region: '',
    sortBy: 'launch_time',
    sortOrder: 'DESC',
  });

  const fetchInstances = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };
      const response = await instanceAPI.getAll(params);
      setInstances(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch instances');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await instanceAPI.getStats();
      setStats(response.data.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  const syncInstances = async () => {
    setLoading(true);
    setError(null);
    try {
      await instanceAPI.sync();
      await fetchInstances();
      await fetchStats();
      alert('Instances synced successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sync instances');
      alert('Sync failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstances();
  }, [fetchInstances]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const changePage = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const changeLimit = (newLimit) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
  };

  return {
    instances,
    stats,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    changePage,
    changeLimit,
    syncInstances,
    refetch: fetchInstances,
  };
};
