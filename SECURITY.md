# Security

## Never report secrets in a public issue

If a credential is ever accidentally committed:

1. revoke/rotate it immediately
2. remove it from Git history
3. inspect deployment logs and access history
4. do not rely on deleting only the latest commit

## Local Hub

Hub #0001 is not a dependency of this repository. Do not create development instructions that ask contributors to mount, copy, export, or inspect the live Mac installation.
