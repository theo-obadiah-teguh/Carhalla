#!/bin/bash

# This is a simple script to simplify SQL terminal login
source ../.env
mysql -h $RDS_HOST --user=$RDS_USER --password=$RDS_PASS --ssl-ca=$RDS_CA --ssl-mode=VERIFY_IDENTITY 2>/dev/null