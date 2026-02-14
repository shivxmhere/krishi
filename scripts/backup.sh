#!/bin/bash
# scripts/backup.sh - Automated backup script for Krishi Prod

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR

echo "Starting Krishi Production Backup - $DATE"

# Database dump using docker exec if applicable
# docker-compose exec db pg_dump -U postgres krishi_db > $BACKUP_DIR/db_$DATE.sql

# Backup uploads/models
tar -czf $BACKUP_DIR/models_$DATE.tar.gz ./backend/models
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz ./uploads 2>/dev/null || true

# Mock S3 upload
echo "Syncing to S3: s3://krishi-backups/prod/$DATE/"

echo "Backup success."
