#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

commitHash=''

MASTER_REPO_URL="https://github.com/loculus-project/loculus.git"

# Determine the path to the script, and thereby the descendant repository
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
DESCENDANT_REPO_PATH=$SCRIPT_DIR/monorepo

# ensure the descendant repository path exists, create it if it doesn't
mkdir -p "$DESCENDANT_REPO_PATH"

# Extract commit hash from values.yaml
if [ -f "./pathoplexus_app/values.yaml" ]; then
    commitHash=$(grep 'loculusVersion:' "./pathoplexus_app/values.yaml" | awk '{print $2}' | tr -d '"')
    echo "Using loculusVersion from values.yaml: $commitHash"
else
    echo "Error: pathoplexus_app/values.yaml not found. Cannot extract loculusVersion."
    exit 1
fi

# Validate commit hash
if [ -z "$commitHash" ]; then
    echo "Error: Empty commit hash. Cannot proceed with shallow clone."
    exit 1
fi

# Perform a shallow clone of the specific commit
TEMP_DIR=$(mktemp -d)
git init "$TEMP_DIR/master_repo" || { echo "Error: Failed to initialize repository. Exiting."; exit 1; }
cd "$TEMP_DIR/master_repo"
git remote add origin "$MASTER_REPO_URL" || { echo "Error: Failed to add remote. Exiting."; exit 1; }
git fetch --depth 1 origin "$commitHash" || { echo "Error: Failed to fetch commit $commitHash. Exiting."; exit 1; }
git checkout FETCH_HEAD || { echo "Error: Failed to checkout commit $commitHash. Exiting."; exit 1; }

# Navigate to the script directory, which is assumed to be the descendant repository root
cd "$DESCENDANT_REPO_PATH" || { echo "Error: Failed to change directory to $DESCENDANT_REPO_PATH. Exiting."; exit 1; }

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
rsync -av --ignore-existing --exclude='.git' "$TEMP_DIR/master_repo/" "$DESCENDANT_REPO_PATH/" || { echo "Error: Failed to sync repositories. Exiting."; exit 1; }

# Remove the temporary directory
rm -rf "$TEMP_DIR"

echo "Synchronisation of files from Locculus completed successfully."