CREATE TABLE ec2instances (
  id SERIAL PRIMARY KEY,
  instanceid VARCHAR(50) UNIQUE,
  instancename VARCHAR(255),
  instancetype VARCHAR(50),
  instancestate VARCHAR(50),
  region VARCHAR(50),
  availabilityzone VARCHAR(50),
  publicipaddress VARCHAR(50),
  privateipaddress VARCHAR(50),
  vpcid VARCHAR(50),
  subnetid VARCHAR(50),
  securitygroups JSONB,
  tags JSONB,
  launchtime TIMESTAMP,
  platform VARCHAR(50),
  architecture VARCHAR(20),
  monitoringstate VARCHAR(20),
  keyname VARCHAR(100), 
  iaminstanceprofile VARCHAR(255),
  createdat TIMESTAMP DEFAULT now(),
  updatedat TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_instanceid ON ec2instances(instanceid);
CREATE INDEX idx_instancestate ON ec2instances(instancestate);
CREATE INDEX idx_region ON ec2instances(region);
CREATE INDEX idx_instancetype ON ec2instances(instancetype);
CREATE INDEX idx_launchtime ON ec2instances(launchtime DESC);
