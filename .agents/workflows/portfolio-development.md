---
description: Vishal Portfolio Development Workflow
---

This workflow governs the full development lifecycle for making changes, previewing them, and deploying to production.

// turbo
1. Start the local development server to preview changes.
   `npm run dev`

2. Ask the user what changes or updates they would like to make today. Understand the requirements and the files involved.

3. Execute the code changes in the repository. Strictly adhere to the "Darkroom" cinematic aesthetic and ensure the required aesthetic skills (`ui-ux-pro-max`, `3d-web-experience`, `scroll-experience`) are leveraged.

4. Stop and prompt the user to review the changes locally on `http://localhost:3000`. Wait for their explicit approval.

// turbo
5. If the user approves the changes, stage and commit the work using descriptive conventional commit messages.
   `git add .`
   `git commit -m "feat/style/fix: description of the high-end UI change"`

// turbo
6. Ask the user if they want to push to GitHub to trigger the live deployment. If yes, push the committed changes to the main branch.
   `git push origin main`

7. Notify the user that pushing to GitHub will trigger the automated deployment workflow. Remind them they can refresh their live domain in a few minutes to see the updates in production.
