# Krishi Disaster Recovery Plan

## Objectives
- **RTO (Recovery Time Objective)**: 4 hours
- **RPO (Recovery Point Objective)**: 1 hour

## Backup Strategy
- **DB**: Hourly snapshots on Render/AWS.
- **S3**: Real-time replication of user uploads.

## Recovery Steps
1. Provision new infrastructure via Terraform.
2. Restore latest DB snapshot.
3. Deploy application containers.
4. Verify health via `/health` endpoint.
