#!/bin/bash

# This is a simple script to simplify SQL terminal login
# SQL DB Details
host_link="database-1.cfygwy4i0v9o.us-east-2.rds.amazonaws.com"
port=3306

# Simple prompt and command
read -p "Enter username: " user
mysql -h $host_link -P $port -u $user -p