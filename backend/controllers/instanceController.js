const EC2Instance = require('../models/ec2Instance');
const SyncService = require('../services/syncService');

class InstanceController {
  static async getAllInstances(req, res, next) {
    try {
      const filters = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        search: req.query.search || '',
        state: req.query.state || '',
        region: req.query.region || '',
        sortBy: req.query.sortBy || 'launch_time',
        sortOrder: req.query.sortOrder || 'DESC',
      };

      const result = await EC2Instance.findAll(filters);

      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getInstanceById(req, res, next) {
    try {
      const { instanceId } = req.params;
      const instance = await EC2Instance.findById(instanceId);

      if (!instance) {
        return res.status(404).json({
          success: false,
          message: 'Instance not found',
        });
      }

      res.json({
        success: true,
        data: instance,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getStats(req, res, next) {
    try {
      const stats = await EC2Instance.getStats();

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }

  static async syncInstances(req, res, next) {
    try {
      const result = await SyncService.syncInstances();

      res.json({
        success: true,
        message: 'EC2 instances synced successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = InstanceController;
