#!/bin/bash

# To run:
# . ./assume-role.sh <role-arn>

echo Unassume any existing role...

. ./unassume-role.sh

echo Getting credentials from AWS...

set -euo pipefail
creds="$(aws sts assume-role --query 'Credentials' --output json --role-arn "$1" --duration-seconds 3600 --role-session-name "$(aws sts get-caller-identity --query 'Arn' --output text | awk -F/ '{ print $NF }')")"
set +euo pipefail

echo Assuming role...

export AWS_ACCESS_KEY_ID="$(echo "$creds" | jq -r '.AccessKeyId')"
export AWS_SECRET_ACCESS_KEY="$(echo "$creds" | jq -r '.SecretAccessKey')"
export AWS_SESSION_TOKEN="$(echo "$creds" | jq -r '.SessionToken')"

aws sts get-caller-identity
