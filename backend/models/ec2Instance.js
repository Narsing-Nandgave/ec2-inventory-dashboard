const pool = require('../config/db');

class EC2Instance {
  static async findAll(filters = {}) {
    const {
      page = 1,
      limit = 10,
      search = '',
      state = '',
      region = '',
      sortBy = 'launch_time',
      sortOrder = 'DESC',
    } = filters;

    const offset = (page - 1) * limit;
    const params = [];
    let whereConditions = [];
    let paramCount = 1;

    // Search filter
    if (search) {
      whereConditions.push(
        `(instance_id ILIKE $${paramCount} OR instance_name ILIKE $${paramCount})`
      );
      params.push(`%${search}%`);
      paramCount++;
    }

    // State filter
    if (state) {
      whereConditions.push(`instance_state = $${paramCount}`);
      params.push(state);
      paramCount++;
    }

    // Region filter
    if (region) {
      whereConditions.push(`region = $${paramCount}`);
      params.push(region);
      paramCount++;
    }

    const whereClause =
      whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM ec2_instances ${whereClause}`;
    const countResult = await pool.query(countQuery, params);
    const totalRecords = parseInt(countResult.rows[0].count);

    // Get paginated data
    const validSortBy = ['launch_time', 'instance_type', 'instance_state', 'region'].includes(sortBy)
      ? sortBy
      : 'launch_time';
    const validSortOrder = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const dataQuery = `
      SELECT * FROM ec2_instances
      ${whereClause}
      ORDER BY ${validSortBy} ${validSortOrder}
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    params.push(limit, offset);
    const dataResult = await pool.query(dataQuery, params);

    return {
      data: dataResult.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
      },
    };
  }

  static async findById(instanceId) {
    const query = 'SELECT * FROM ec2_instances WHERE instance_id = $1';
    const result = await pool.query(query, [instanceId]);
    return result.rows[0];
  }

  static async getStats() {
    const query = `
      SELECT 
        instance_state, 
        region, 
        COUNT(*) as count
      FROM ec2_instances
      GROUP BY instance_state, region
      ORDER BY instance_state, region
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async upsert(instanceData) {
    const query = `
      INSERT INTO ec2_instances (
        instance_id, instance_name, instance_type, instance_state, 
        region, availability_zone, public_ip_address, private_ip_address,
        vpc_id, subnet_id, security_groups, tags, launch_time, 
        platform, architecture, monitoring_state, key_name, iam_instance_profile
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      ON CONFLICT (instance_id) 
      DO UPDATE SET
        instance_name = EXCLUDED.instance_name,
        instance_type = EXCLUDED.instance_type,
        instance_state = EXCLUDED.instance_state,
        region = EXCLUDED.region,
        availability_zone = EXCLUDED.availability_zone,
        public_ip_address = EXCLUDED.public_ip_address,
        private_ip_address = EXCLUDED.private_ip_address,
        vpc_id = EXCLUDED.vpc_id,
        subnet_id = EXCLUDED.subnet_id,
        security_groups = EXCLUDED.security_groups,
        tags = EXCLUDED.tags,
        launch_time = EXCLUDED.launch_time,
        platform = EXCLUDED.platform,
        architecture = EXCLUDED.architecture,
        monitoring_state = EXCLUDED.monitoring_state,
        key_name = EXCLUDED.key_name,
        iam_instance_profile = EXCLUDED.iam_instance_profile,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;

    const values = [
      instanceData.instance_id,
      instanceData.instance_name,
      instanceData.instance_type,
      instanceData.instance_state,
      instanceData.region,
      instanceData.availability_zone,
      instanceData.public_ip_address,
      instanceData.private_ip_address,
      instanceData.vpc_id,
      instanceData.subnet_id,
      JSON.stringify(instanceData.security_groups),
      JSON.stringify(instanceData.tags),
      instanceData.launch_time,
      instanceData.platform,
      instanceData.architecture,
      instanceData.monitoring_state,
      instanceData.key_name,
      instanceData.iam_instance_profile,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = EC2Instance;

// module.exports = {
//   async findAll() {
//     return {
//       data: [
//         { id: 1, name: 'Test Instance', state: 'running', region: 'us-east-1' },
//       ],
//       pagination: { page: 1, limit: 10 },
//     };
//   },

//   async findById(id) {
//     if (id === '1') {
//       return { id: 1, name: 'Test Instance', state: 'running' };
//     }
//     return null;
//   },

//   async getStats() {
//     return {
//       total: 1,
//       running: 1,
//       stopped: 0,
//     };
//   },
// };
