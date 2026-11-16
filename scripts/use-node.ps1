# Ensures the project always runs with the Node version pinned in .nvmrc,
# so newer Node upgrades don't break other projects tied to older versions.
$ErrorActionPreference = "Stop"

$nvmrcPath = Join-Path $PSScriptRoot "..\.nvmrc"
$requiredVersion = (Get-Content $nvmrcPath -Raw).Trim()

nvm use $requiredVersion
