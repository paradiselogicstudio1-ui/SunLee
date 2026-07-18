From the project directory, run:


cd ~/vscode/MyOwnProject/websiteSanli
1-npm run dev
This starts the Vite dev server (default at http://localhost:5173). Open that URL in your browser — / is the storytelling home page, /materials-consultancy and /production-consultancy are the two service pages.

2-npm run server


For a production build:


npm run build    # outputs to dist/
npm run preview  # serves the built dist/ locally
Note: a dev server may already be running in the background from this session (PID on port 5173) — check with lsof -i :5173 or curl http://localhost:5173/ before starting another one.

