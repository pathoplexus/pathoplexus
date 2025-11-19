Start by running `./sync.sh` to fill the monorepo directory with the right stuff.

You cannot make any changes to the files that are listed in `.gitignore` (any such changes will be discarded). The files brought in by the sync are such non-editable files as they come from an overlay.

## Important: Commit Safety

**ALWAYS double-check what you are committing before creating commits.** The monorepo contains files that are cloned in via the sync script, and you must be careful not to accidentally commit these files.

Before committing:
1. Run `git status` to see what files will be included
2. Run `git diff` to review the actual changes
3. Verify that you are not committing extraneous files from the monorepo overlay
4. Only commit files that you intentionally modified for the current task
