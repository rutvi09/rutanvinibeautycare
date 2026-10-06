# Rutanvini Beauty Care

React + Tailwind CSS form with an API that stores form submissions in Supabase.

## Set up Supabase

1. Create a Supabase project.
2. In the Supabase SQL Editor, run the SQL in [`supabase/migrations/20261006000000_create_submissions.sql`](./supabase/migrations/20261006000000_create_submissions.sql) to create the submissions table.
3. Copy `.env.example` to `.env` and set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` using the project URL and publishable key from your Supabase project. You can use `SUPABASE_ANON_KEY` instead if you have the legacy anon key. The key is restricted by the table's row-level security policy, which allows inserts only. Keep `.env` private; it is ignored by Git.
4. Install dependencies with `npm install`, then start the frontend and local API together using `npm run dev`.
5. Open the Vite URL printed in the terminal. Form submissions are stored in the `public.submissions` table.

The form reports success only after Supabase accepts the submission. If saving fails, the API logs the Supabase response status and the form displays a retry message. Restart the API after changing `.env`.

## Publish on Vercel

1. Push the project to a GitHub repository. Make sure `.env` is not committed; it is excluded by `.gitignore`.
2. In Vercel, choose **Add New → Project**, import the repository, and deploy with the Vite framework preset. The build command should be `npm run build` and the output directory should be `dist`.
3. In the Vercel project, open **Settings → Environment Variables** and add `SUPABASE_URL` and either `SUPABASE_PUBLISHABLE_KEY` or `SUPABASE_ANON_KEY` for Production (and Preview if you want preview deployments to save submissions). Do not use a service-role/secret key for this form.
4. Redeploy after adding the variables. The form endpoint is deployed as `/api/submissions`.

For local development, `.env` is read by the local Express API. Vercel runs the same handler as a serverless function in production.

## GitHub Pages

GitHub Pages publishes the built static site from `dist` using the included Actions workflow. The page itself works there, but GitHub Pages cannot run the `/api/submissions` endpoint; deploy to Vercel and configure the Supabase environment variables to enable form submissions.
