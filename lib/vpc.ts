import { Stack, StackProps } from 'aws-cdk-lib';
import { SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class VpcStack extends Stack {
  // create var to instance VPC to be shared
  public readonly vpc: Vpc;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // For more configuration, click link above.
    // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.Vpc.html

    // set value to var
    this.vpc = new Vpc(this, "TheVpcShared", {
      cidr: "10.0.0.0/16",
      natGateways: 1,
      maxAzs: 3,
      subnetConfiguration: [
        {
          cidrMask: 20,
          name: "public",
          subnetType: SubnetType.PUBLIC
        },
        {
          cidrMask: 20,
          name: "application",
          subnetType: SubnetType.PRIVATE_WITH_NAT,
        },
        {
          cidrMask: 20,
          name: "data",
          subnetType: SubnetType.PRIVATE_ISOLATED,
        },
      ]
    })
  }
}
