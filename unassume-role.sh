#!/bin/bash


# To run:
# . ./unassume-role.sh

# Unset existing credentials except for region
unset $(compgen -v AWS_ | grep -v '^AWS_(?:DEFAULT_)?REGION')

aws sts get-caller-identity
