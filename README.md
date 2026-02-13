This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## How to Change Commit Message

### Change the Last Commit Message (Not Pushed)

If you want to change the message of your most recent commit that hasn't been pushed yet:

```bash
git commit --amend -m "New commit message"
```

Or to edit the message in your default editor:

```bash
git commit --amend
```

### Change the Last Commit Message (Already Pushed)

If you've already pushed the commit, you'll need to force push (use with caution):

```bash
git commit --amend -m "New commit message"
git push --force-with-lease
```

**Warning:** Force pushing rewrites history. Only do this if you're sure no one else has pulled your changes.

### Change an Older Commit Message

To change a commit message from further back in your history:

1. Start an interactive rebase:
```bash
git rebase -i HEAD~n
```
Replace `n` with the number of commits back you want to go.

2. In the editor, change `pick` to `reword` (or `r`) for the commit(s) you want to change.

3. Save and close the editor.

4. Git will open another editor for each commit you're rewording. Update the message and save.

5. If you've already pushed, force push:
```bash
git push --force-with-lease
```

### Best Practices

- **Don't rewrite public history**: Avoid changing commits that others have based work on.
- **Use meaningful commit messages**: Write clear, descriptive messages that explain what and why.
- **Be cautious with force push**: Use `--force-with-lease` instead of `--force` for safer force pushing.
