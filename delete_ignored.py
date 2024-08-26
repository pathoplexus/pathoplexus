import os

import shutil

def delete_matching_files(root_dir, ignore_patterns):
    """Delete files and directories matching .gitignore patterns."""
    
    for pattern in ignore_patterns:
        #unescaped pattern
        pattern = pattern.replace('\\', '')
        match = os.path.join(root_dir, pattern)
        if not os.path.exists(match):
            print(f"No matches for {pattern}")
            continue
        
    
        if os.path.isdir(match):
            shutil.rmtree(match)
        else:
            shutil.os.remove(match)
        # remove empty dirs
        for dirpath, dirnames, filenames in os.walk(root_dir, topdown=False):
            if not dirnames and not filenames:
                os.rmdir(dirpath)
def read_gitignore_patterns(gitignore_path):
    """Read and return patterns from a .gitignore file."""
    with open(gitignore_path, 'r') as file:
        patterns = [line.strip() for line in file if line.strip() and not line.startswith('#')]
    return patterns

def main():
    monorepo_dir = 'monorepo'
    gitignore_path = os.path.join(monorepo_dir, '.gitignore')
    

    if not os.path.exists(gitignore_path):
        print(f"No .gitignore found in {monorepo_dir}")
        return

    ignore_patterns = read_gitignore_patterns(gitignore_path)
    delete_matching_files(monorepo_dir, ignore_patterns)
    print("Deletion process completed.")
    os.remove('monorepo/.gitignore')

if __name__ == "__main__":
    main()
