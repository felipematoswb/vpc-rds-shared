import { Stack, StackProps } from 'aws-cdk-lib';
import { SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { Credentials, DatabaseInstance, DatabaseInstanceEngine, PostgresEngineVersion } from 'aws-cdk-lib/aws-rds';
import { InstanceType, InstanceClass, InstanceSize } from 'aws-cdk-lib/aws-ec2';

export interface RDSStackProps extends StackProps {
  vpc: Vpc
}

export class RdsStack extends Stack {
  constructor(scope: Construct, id: string, props: RDSStackProps) {
    super(scope, id, props);

    const vpc = props.vpc
    
    // For more configuration, click link above.
    // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_rds.DatabaseInstance.html
    new DatabaseInstance(this, "InstanceRDS", {
      engine: DatabaseInstanceEngine.postgres({version: PostgresEngineVersion.VER_12_10}),
      vpc: vpc,
      credentials: Credentials.fromGeneratedSecret("instanceAdmin"),
      instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
      vpcSubnets:{ subnetType: SubnetType.PRIVATE_ISOLATED, },
      multiAz: false
    })
  }
}
