const SyncService = require('../services/syncService');
require('dotenv').config();

async function syncData() {
  try {
    console.log('Manual sync initiated...');
    const result = await SyncService.syncInstances();
    console.log('Sync result:', result);
    process.exit(0);
  } catch (error) {
    console.error('Sync failed:', error);
    process.exit(1);
  }
}

syncData();
