-- Create ec2_instances table
CREATE TABLE IF NOT EXISTS ec2_instances (
    id SERIAL PRIMARY KEY,
    instance_id VARCHAR(50) UNIQUE NOT NULL,
    instance_name VARCHAR(255),
    instance_type VARCHAR(50),
    instance_state VARCHAR(50),
    region VARCHAR(50),
    availability_zone VARCHAR(50),
    public_ip_address VARCHAR(50),
    private_ip_address VARCHAR(50),
    vpc_id VARCHAR(50),
    subnet_id VARCHAR(50),
    security_groups JSONB,
    tags JSONB,
    launch_time TIMESTAMP,
    platform VARCHAR(50),
    architecture VARCHAR(20),
    monitoring_state VARCHAR(20),
    key_name VARCHAR(100),
    iam_instance_profile VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_instance_id ON ec2_instances(instance_id);
CREATE INDEX IF NOT EXISTS idx_instance_state ON ec2_instances(instance_state);
CREATE INDEX IF NOT EXISTS idx_region ON ec2_instances(region);
CREATE INDEX IF NOT EXISTS idx_instance_type ON ec2_instances(instance_type);
CREATE INDEX IF NOT EXISTS idx_launch_time ON ec2_instances(launch_time DESC);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_ec2_instances_updated_at 
    BEFORE UPDATE ON ec2_instances 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
