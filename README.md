# Rutanvini Beauty Care

React + Tailwind CSS form with a Vercel serverless API that emails form submissions using Gmail SMTP.

## Set up email

1. Enable 2-Step Verification on the Gmail account that will send the messages, then create a Google App Password.
2. Put that Gmail address in `GMAIL_USER` and the App Password in `GMAIL_APP_PASSWORD` in `.env`. Spaces in the App Password are okay. Do not use your normal Gmail password. Keep `.env` private; it is ignored by Git.
3. Install dependencies with `npm install`, then start the frontend and local API together using `npm run dev`.
4. Open the Vite URL printed in the terminal. Form submissions are emailed to `rutanvini@gmail.com` and `rutvisolanki2@gmail.com`; the submitted email address receives a confirmation.

The form reports success only after both messages are accepted by Gmail. If sending fails, the API logs safe mail-error details and the form displays a retry message. Restart the API after changing `.env`.

## Publish on Vercel

1. Push the project to a GitHub repository. Make sure `.env` is not committed; it is excluded by `.gitignore`.
2. In Vercel, choose **Add New → Project**, import the repository, and deploy with the Vite framework preset. The build command should be `npm run build` and the output directory should be `dist`.
3. In the Vercel project, open **Settings → Environment Variables** and add `GMAIL_USER` and `GMAIL_APP_PASSWORD` for Production (and Preview if you want preview deployments to send email). Use a Gmail App Password, not the normal Gmail password.
4. Redeploy after adding the variables. The form endpoint is deployed as `/api/submissions`.

For local development, `.env` is read by the local Express API. Vercel runs the same handler as a serverless function in production.
