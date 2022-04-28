#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc';
import { RdsStack } from '../lib/rds'

const app = new cdk.App();

// instance stack with const to use below
const sharedVpc = new VpcStack(app, 'VpcStack');

new RdsStack(app, 'RdsStack', {
  // set var and value in the stack gonna be used
  vpc: sharedVpc.vpc
})