Deployment guide

Frontend (Vercel)
- Push `project-bolt-sb1-kskkxney/project` directory to a GitHub repo.
- In Vercel, import the repo and select the frontend project folder.
- Build command: `npm run build`
- Output directory: `dist`
- Set any environment variables (e.g., `VITE_API_BASE_URL`) in Vercel if your frontend talks to the API.

Backend (Render / Railway recommended)
1. Create a GitHub repo for the Django project (root: `myIDS/` - contains `manage.py`).
2. Add the repo to Render (or Railway) and choose "Web Service".
3. Set the build and start commands (Render):
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn myIDS.wsgi --log-file -`
4. Set environment variables in the host (Render):
   - `DATABASE_URL` (Postgres connection string)
   - `DJANGO_SECRET_KEY` (secure random string)
   - `DJANGO_DEBUG` = `False`
   - `DJANGO_ALLOWED_HOSTS` = `yourdomain.com,subdomain.example.com`
   - Email settings if used: `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, etc.
5. On deploy (or via SSH/console):
   - `python manage.py migrate`
   - `python manage.py collectstatic --noinput`
   - `python manage.py createsuperuser` (optional)

Local prep commands
```bash
# from project root (where manage.py is)
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
``` 

Notes
- Use Render's managed Postgres or Railway's Postgres addon for production DB.
- Do not hardcode `SECRET_KEY` or DB credentials in `settings.py`.
- If you want, I can create a GitHub repo and push these changes for you, then connect Vercel/Render.
