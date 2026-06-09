<<<<<<< HEAD
# IDS Project (FYP-2)

Professional, deployable packaging of the IDS project (frontend + backend).

Overview
- This repository contains a Django-based backend (located under `IDS/IDS/myIDS`) and a frontend app (under `IDS/IDS/project-bolt-sb1-kskkxney/project`).
- The goal: provide clear setup, run, and deployment instructions so frontend and backend can be published to GitHub and deployed.

Repository structure (key folders)
- `IDS/IDS/myIDS/` — Django project and app (`myapp`).
- `IDS/IDS/myIDS/models/` — ML model files (do not commit large binaries; reference them).
- `IDS/IDS/project-bolt-sb1-kskkxney/project/` — frontend (Vite + React + TypeScript).

Before pushing
1. Remove or ignore sensitive files: database files (`db.sqlite3`), local `.env` files, virtual environments. See `.gitignore`.
2. Check `IDS/IDS/myIDS/settings.py` and remove any hard-coded secrets or API keys. Use environment variables instead.

Quick local setup

Backend (Django)

1. Create and activate a Python virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate   # macOS / Linux
.\.venv\Scripts\Activate.ps1  # Windows PowerShell
```
2. Install dependencies:
```bash
pip install -r IDS/IDS/myIDS/requirements.txt
```
3. Apply migrations and run server:
```bash
python IDS/IDS/myIDS/manage.py migrate
python IDS/IDS/myIDS/manage.py runserver
```

Frontend (React + Vite)

1. Change to frontend folder and install:
```bash
cd IDS/IDS/project-bolt-sb1-kskkxney/project
npm install
```
2. Run dev server:
```bash
npm run dev
```

How to publish to GitHub
1. Create a new repository on GitHub (name it like `FYP-IDS` or similar).
2. Initialize git, add files, commit, and add remote:
```bash
git init
git add .
git commit -m "Initial project import"
# create remote via GitHub UI or `gh repo create` and then:
git remote add origin git@github.com:<username>/<repo>.git
git branch -M main
git push -u origin main
```

Recommended repo hygiene
- Do not push large ML model binaries; add them to a release or external storage (Git LFS, Google Drive). 
- Add a `LICENSE` if you want others to reuse your code.
- Add a short `CONTRIBUTING.md` if you expect collaborators.

Need me to push?
- I can initialize git and push for you if you provide the GitHub repo name or grant `gh` CLI access. Otherwise I can give exact commands to run locally.

Contact
- If you want, I can also add comments to key backend files and clean settings where secrets are present.
=======
# FYP-2
>>>>>>> dbf53a5e341b96155c3466515e14f51e3197b6e6
