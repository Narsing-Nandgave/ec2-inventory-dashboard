const AWSService = require('./awsService');
const EC2Instance = require('../models/ec2Instance');

class SyncService {
  static async syncInstances() {
    try {
      console.log('Starting EC2 instance synchronization...');

      // Fetch instances from AWS
      const awsInstances = await AWSService.fetchEC2Instances();
      console.log(`Fetched ${awsInstances.length} instances from AWS`);

      let inserted = 0;
      let updated = 0;

      // Upsert each instance
      for (const instanceData of awsInstances) {
        const existing = await EC2Instance.findById(instanceData.instance_id);
        await EC2Instance.upsert(instanceData);

        if (existing) {
          updated++;
        } else {
          inserted++;
        }
      }

      console.log(`Sync completed: ${inserted} inserted, ${updated} updated`);

      return {
        inserted,
        updated,
        total: awsInstances.length,
      };
    } catch (error) {
      console.error('Sync error:', error);
      throw error;
    }
  }
}

module.exports = SyncService;
