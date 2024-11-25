#!/bin/bash
doppler run --config dev -- docker-compose --env-file .env.local "$@"