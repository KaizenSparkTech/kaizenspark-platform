# KaizenSpark Platform - Git Workflow & Contribution Guide

Welcome interns! As we build the KaizenSpark Platform, we need a clean, conflict-free way to collaborate. Since multiple people are working on the same codebase, **following these Git rules is mandatory**. 

Failure to follow this guide usually results in "Merge Conflicts," which can break the codebase and take hours to fix.

## 1. The Golden Rule: Sync Every Time You Code
The #1 reason merge conflicts happen is writing code on top of an outdated branch.

**Before you start working every single day, you MUST pull the latest changes from `develop`:**

```bash
# 1. Switch to your local develop branch
git checkout develop

# 2. Pull the latest code from GitHub
git pull origin develop
```

## 2. The Branching Model
We NEVER commit directly to `develop` or `main`. All work must happen on a separate branch.

When you start a new task, create a new branch from `develop`. We use prefixes to keep things organized:
- `feature/` for new features (e.g., `feature/auth-login-ui`)
- `fix/` for bug fixes (e.g., `fix/user-model-typo`)

**Creating your branch:**
```bash
# Make sure you are on updated develop first!
git checkout develop

# Create and switch to your new branch
git checkout -b feature/your-feature-name
```

## 3. Writing Code & Committing
Make sure your commits are small and descriptive. 

```bash
# Check what files you changed
git status

# Add your changes
git add .

# Commit with a clear message
git commit -m "feat: add user login form UI"
```

## 4. Pushing and Creating a Pull Request (PR)
When your feature is complete and working locally (both frontend and backend), it's time to share it.

```bash
# Push your branch to GitHub
git push origin feature/your-feature-name
```

Once pushed, go to the GitHub repository and click **"Compare & pull request"**.
- Ensure the "base" branch is set to `develop`.
- Give your PR a clear title.
- Request a review from a mentor or peer.

## 5. What If You Get a Merge Conflict?
If someone else merges code into `develop` while you are working on your branch, you might get a merge conflict when you try to create a PR.

**To fix this, update your branch with the latest `develop`:**
```bash
# 1. Update your local develop branch
git checkout develop
git pull origin develop

# 2. Switch back to your feature branch
git checkout feature/your-feature-name

# 3. Merge the new develop code into your branch
git merge develop
```
If there is a conflict, Git will pause. Open the conflicting files in your editor (VS Code will highlight them), choose which code to keep, then:
```bash
git add .
git commit -m "Merge develop and resolve conflicts"
git push origin feature/your-feature-name
```

## Checklist Before Opening a PR
- [ ] Did you pull from `develop` recently?
- [ ] Is your code on a properly named `feature/` or `fix/` branch?
- [ ] Did you test your code locally? (e.g., frontend compiles, API runs)
- [ ] Does your PR point to the `develop` branch?
