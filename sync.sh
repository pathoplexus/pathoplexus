#!/bin/bash

helpFunction()
{
   echo ""
   echo "Usage: $0 [-l] [-c commit_hash] [-a]"
   echo -e "\t-l  Rely on system's Git credentials instead of using the LOCULUS_PAT environmental variable"
   echo -e "\t-c  Specify a commit hash to check out (optional)"
   echo -e "\t-a  Use the loculusVersion from pathoplexus_app/values.yaml as the commit to checkout"
   exit 1 # Exit script after printing help
}

localRun='false'
commitHash=''
useAppVersion='false'

while getopts "lc:a" opt
do
   case "$opt" in
      l ) localRun='true' ;;
      c ) commitHash="$OPTARG" ;;
      a ) useAppVersion='true' ;;
      ? ) helpFunction ;; # Print helpFunction in case parameter is non-existent
   esac
done

# Define the master repository URL
if [[ "$localRun" == 'true' ]]; then 
    echo "Running website locally"
    MASTER_REPO_URL="git@github.com:loculus-project/loculus.git"
else
    echo "Running website in github actions"
    MASTER_REPO_URL="https://$LOCULUS_PAT@github.com/loculus-project/loculus.git"
fi

# Determine the path to the script, and thereby the descendant repository
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
DESCENDANT_REPO_PATH=$SCRIPT_DIR/monorepo

# ensure the descendant repository path exists, create it if it doesn't
mkdir -p "$DESCENDANT_REPO_PATH"

# Clone the master repository to a temporary directory
TEMP_DIR=$(mktemp -d)
git clone "$MASTER_REPO_URL" "$TEMP_DIR/master_repo"

# If -a is set, extract loculusVersion from values.yaml and use it as commitHash
if [ "$useAppVersion" = 'true' ]; then
    if [ -f "./pathoplexus_app/values.yaml" ]; then
        commitHash=$(grep 'loculusVersion:' "./pathoplexus_app/values.yaml" | awk '{print $2}' | tr -d '"')
        echo "Using loculusVersion from values.yaml: $commitHash"
    else
        echo "Error: pathoplexus_app/values.yaml not found. Cannot extract loculusVersion."
        exit 1
    fi
fi

# If a commit hash is specified or extracted from values.yaml, check it out
if [ -n "$commitHash" ]; then
    (cd "$TEMP_DIR/master_repo" && git checkout "$commitHash")
fi

# Navigate to the script directory, which is assumed to be the descendant repository root
cd "$DESCENDANT_REPO_PATH" || exit

# Compare the content of the master and descendant, updating .gitignore as necessary
(cd "$TEMP_DIR/master_repo" && find . -type f ) | while read -r file; do
    if [ ! -f "$DESCENDANT_REPO_PATH/$file" ]; then
        if [[ "$file" != "./.gitignore"* ]] && [[ "$file" != ./.git/* ]]; then
            # Add the file path, relative to the repository root, to .gitignore
            # Remove the leading "./" from the file path
            printf "%q\n" "${file:2}" >> "$DESCENDANT_REPO_PATH/.gitignore"
        fi
    fi
done

# Sort and remove duplicates from .gitignore
sort -u "$DESCENDANT_REPO_PATH/.gitignore" -o "$DESCENDANT_REPO_PATH/.gitignore"

# Copy the contents of the master repository to the descendant repository
# excluding .git directory, without overwriting existing files
rsync -av --ignore-existing --exclude='.git' "$TEMP_DIR/master_repo/" "$DESCENDANT_REPO_PATH/"

# Remove the temporary directory
rm -rf "$TEMP_DIR"

echo "Setup script completed."
