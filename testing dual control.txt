5) One-time installs (do once)
# backend deps
cd Backend
npm i
# frontend deps
cd ../frontend
npm i
# root tool
cd ..
npm i -D concurrently

6) Daily workflow (what you’ll run later)

From the repo root:

npm run dev


That launches:

FE (Vite) on 5173 with HMR

BE (Express) on 3001 with nodemon
