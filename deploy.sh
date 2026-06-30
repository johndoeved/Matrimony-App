#!/bin/bash

# Deployment script for Dhobi Matrimony Server

echo "==========================================="
echo "🚀 Starting Deployment Process..."
echo "==========================================="

echo "1. Pulling latest code from GitHub..."
git pull origin master

echo "2. Rebuilding Docker Containers (Zero Downtime)..."
docker-compose up -d --build

echo "3. Cleaning up old, unused images to save disk space..."
docker image prune -f

echo "==========================================="
echo "✅ Deployment Successful!"
echo "==========================================="
