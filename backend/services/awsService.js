const { DescribeInstancesCommand } = require('@aws-sdk/client-ec2');
const ec2Client = require('../config/aws');

class AWSService {
  static async fetchEC2Instances() {
    try {
      const command = new DescribeInstancesCommand({});
      const response = await ec2Client.send(command);

      const instances = [];

      for (const reservation of response.Reservations) {
        for (const instance of reservation.Instances) {
          const instanceData = this.transformInstance(instance);
          instances.push(instanceData);
        }
      }

      return instances;
    } catch (error) {
      console.error('Error fetching EC2 instances from AWS:', error);
      throw error;
    }
  }

  static transformInstance(instance) {
    const getTagValue = (tags, key) => {
      const tag = tags?.find((t) => t.Key === key);
      return tag ? tag.Value : null;
    };

    return {
      instance_id: instance.InstanceId,
      instance_name: getTagValue(instance.Tags, 'Name') || 'N/A',
      instance_type: instance.InstanceType,
      instance_state: instance.State?.Name || 'unknown',
      region: process.env.AWS_REGION || 'us-east-1',
      availability_zone: instance.Placement?.AvailabilityZone || null,
      public_ip_address: instance.PublicIpAddress || null,
      private_ip_address: instance.PrivateIpAddress || null,
      vpc_id: instance.VpcId || null,
      subnet_id: instance.SubnetId || null,
      security_groups: instance.SecurityGroups || [],
      tags: instance.Tags || [],
      launch_time: instance.LaunchTime || null,
      platform: instance.Platform || 'linux',
      architecture: instance.Architecture || null,
      monitoring_state: instance.Monitoring?.State || 'disabled',
      key_name: instance.KeyName || null,
      iam_instance_profile: instance.IamInstanceProfile?.Arn || null,
    };
  }
}

module.exports = AWSService;
