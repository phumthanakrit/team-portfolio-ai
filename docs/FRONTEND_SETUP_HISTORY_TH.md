# Frontend Setup & Development History — บันทึกขั้นตอน Step 01–35

เอกสารนี้รวบรวมสิ่งที่ทำใน Frontend ตั้งแต่เริ่มสร้างโครงการจน Push โค้ดและเอกสารขึ้น GitHub ใช้เป็นบันทึกการทำงานและเป็นแนวทางให้สมาชิกใหม่ทำความเข้าใจลำดับการพัฒนา

> บันทึกจากขั้นตอนและผลที่ผู้พัฒนายืนยันในแชต ไม่ใช่ log ดิบจากเครื่องทุกคำสั่ง หากสมาชิกเปลี่ยนโค้ดหลังจากนี้ ให้เพิ่มรายการใหม่ต่อท้ายเอกสารนี้

## Phase A — เริ่มต้น Repository และ Frontend Foundation

### Step 01 — สร้างโครงสร้างโครงการหลัก

สร้างโฟลเดอร์โปรเจกต์ `team-portfolio-ai` และแยกพื้นที่งานเป็น `frontend`, `backend`, `database`, `docs` พร้อมตรวจ Node.js และ npm ใน Windows PowerShell

### Step 02 — สร้าง React + TypeScript + Vite

สร้าง Frontend ใหม่ด้วย React, TypeScript และ Vite ทดสอบ Development Server เพื่อยืนยันว่าแอปเริ่มทำงานได้

### Step 03 — วางโครงสร้าง Frontend

แยกโฟลเดอร์ตามหน้าที่ เช่น `components`, `pages`, `hooks`, `services`, `data`, `types`, `styles` และ assets เพื่อป้องกันไม่ให้ทุกอย่างรวมอยู่ในไฟล์เดียว

### Step 04 — ติดตั้ง UI, icons และ test tooling ที่จำเป็น

ติดตั้ง Tailwind CSS v4 และ Lucide React ตรวจ Lint/Build และตรวจ `npm audit` พบปัญหา dependency chain ที่เกี่ยวกับ `minimatch` และแก้ด้วย npm override ที่กำหนดไว้ใน `package.json` หลังแก้ ตรวจ `npm audit` ได้ 0 vulnerabilities ตามผลที่ผู้พัฒนายืนยันในขณะนั้น

### Step 05 — จัดทำ Design Tokens

กำหนด Global CSS และ Tailwind theme tokens ใน `frontend/src/index.css` เช่น กลุ่มสีพื้นหลัง/พื้นผิว สีหลัก และ accent เพื่อให้ Component ใช้ระบบ visual language เดียวกัน

### Step 06 — เพิ่ม Routing

ตั้งค่า React Router ใน `main.tsx` และกำหนดหน้า Portfolio (`/`) และ Chat (`/chat`) ใน `App.tsx` รวม fallback route

## Phase B — สร้าง Group Portfolio

### Step 07 — สร้าง Navbar

สร้าง `Navbar.tsx` เป็น Navigation ที่ใช้ร่วมกันและทดสอบ Responsive บนหน้าจอเล็ก/ใหญ่

### Step 08 — สร้าง Team Hero และ data source

สร้าง `TeamHero.tsx` และเริ่มจัดข้อมูลกลุ่มไว้ใน `portfolioData.ts` เพื่อไม่ hardcode ข้อมูลกระจายในหน้าเว็บ

### Step 09 — สร้าง MemberCard และ MemberSection

กำหนด TypeScript types สำหรับสมาชิกตาม role และสร้าง `MemberCard.tsx` กับ `MemberSection.tsx` รองรับกลุ่มที่มีสมาชิก 3 คน ใช้ข้อมูลแบบ typed tuple ตามรูปแบบที่กำหนดไว้ในโค้ด

### Step 10 — สร้าง Team Contact

สร้าง `TeamContact.tsx` และเชื่อม Contact data จาก `portfolioData.ts` แก้การใช้ไอคอนแบรนด์ที่ไม่มี export ใน Lucide React โดยใช้ไอคอนทั่วไปที่มีอยู่แทน และปรับ utility class ให้สอดคล้อง Tailwind CSS v4

**สิ่งที่ต้องทำต่อ:** แทนชื่อสมาชิกตัวอย่าง, รายละเอียด, skills และ URL ตัวอย่างด้วยข้อมูลจริงที่สมาชิกอนุญาตให้เผยแพร่

## Phase C — สร้าง Chat UI และ API Layer

### Step 11 — สร้าง Chat UI แบบโต้ตอบ

สร้าง `ChatPage.tsx`, `MessageBubble.tsx`, `TypingIndicator.tsx` และ `ChatComposer.tsx` พร้อม state สำหรับข้อความ, input, loading และ scroll-to-bottom ในช่วงเริ่มต้นใช้ Mock response เพื่อทดสอบ UI ก่อนมี Backend

### Step 12 — กำหนด Chat API Contract

สร้าง TypeScript types สำหรับ API request/response/error และจัดทำ `docs/chat-api-contract.md` โดยใช้ `POST /api/chat` เป็น endpoint หลัก

### Step 13 — สร้าง Fetch API Service

สร้าง `frontend/src/services/chatApi.ts` ให้เป็นชั้นกลางสำหรับเรียก API แยกจาก UI จัดการ Network/HTTP/JSON errors และกำหนด error class สำหรับ API

### Step 14 — เชื่อม ChatPage กับ API service

ปรับ ChatPage ให้เรียก `sendChatMessage()` แทน Mock response ใน flow หลัก เพิ่มการจัดการ conversation ID, API status, error และ Retry การทดสอบในช่วงนี้ใช้ mock ของ service จึงยังไม่ใช่การทดสอบ Backend จริง

### Step 15 — เพิ่ม New Chat

เพิ่มการเริ่มบทสนทนาใหม่และ reset state ที่เกี่ยวข้อง เช่น messages, conversation ID, error และ input ตาม flow ของหน้า Chat

### Step 16 — ปรับ Accessibility

เพิ่ม status semantics และ attributes เช่น `role="log"`, `aria-live`, `aria-busy`, การอ้างอิงข้อความช่วยเหลือของ Composer และตำแหน่ง auto-scroll

### Step 17 — ตั้งค่า Vite Proxy และ Environment

เพิ่ม Vite proxy สำหรับ `/api` โดยอ่าน `API_PROXY_TARGET` และตั้ง `VITE_API_BASE_URL` ให้เว้นว่างใน Local Development เพื่อให้ใช้ Proxy สร้าง `frontend/.env.example` และ `.env.local` ในเครื่อง

### Step 18 — เพิ่ม Validation และ Timeout

ปรับ API client ให้ตรวจข้อความว่าง จำกัดความยาวข้อความไม่เกิน 2,000 ตัวอักษร ตรวจ `conversationId` และใช้ AbortController timeout 30 วินาที

> Backend ต้องทำ Validation ซ้ำเอง เพราะ Client-side validation ไม่ใช่ขอบเขตความปลอดภัยของ API

## Phase D — Automated Testing

### Step 19 — ตั้งค่า Vitest และ API Service Tests

ตั้ง scripts `test` และ `test:watch` ใน `package.json` ปรับ Vitest config ให้รองรับ `.ts`/`.tsx` tests และสร้าง `chatApi.test.ts` ได้ 9 tests

### Step 20.1 — ติดตั้ง React Testing Libraries

เพิ่ม Testing Library, user-event, jest-dom และ jsdom สำหรับทดสอบ React components

### Step 20.2 — ทดสอบ MessageBubble

สร้าง `MessageBubble.test.tsx` จำนวน 3 tests ครอบคลุมการแสดงข้อความและ timestamp

### Step 20.3 — ทดสอบ ChatComposer

สร้าง `ChatComposer.test.tsx` จำนวน 7 tests ครอบคลุมการแสดง input, การพิมพ์, ปุ่มส่ง, Enter, Shift+Enter และสถานะ loading/disabled

### Step 20.4 — ทดสอบ ChatPage

สร้าง `ChatPage.test.tsx` จำนวน 6 tests ครอบคลุม Empty State, Suggested Prompt, success, loading, error/retry, conversation ID และ New Chat แก้ Partial Mock ให้คง export `ChatApiException` และเพิ่ม `jest-dom` import ในไฟล์ทดสอบ

**ผลรวมที่ยืนยัน:** 4 test files, 25 tests passed; ESLint และ Production Build ผ่าน

## Phase E — ตรวจ Production Preview

### Step 21 — เปิด Production Preview

ใช้ `npm run preview -- --host 127.0.0.1` และตรวจ Portfolio, Navbar, สมาชิก 3 คน, Contact, Chat, direct `/chat` URL และ Browser Console ผู้พัฒนายืนยันว่าผ่านทุกข้อ

ข้อจำกัด: ตรวจการเปิดหน้า/การแสดงผลของ Frontend เท่านั้น ไม่ใช่การยืนยันว่า Backend หรือ AI ตอบจริง

## Phase F — GitHub Actions และความปลอดภัยของ Git

### Step 22 — สร้าง Frontend CI Workflow

สร้าง `.github/workflows/frontend-ci.yml` ให้ GitHub Actions รัน:

1. Checkout
2. Setup Node.js 24
3. `npm ci`
4. `npm run lint`
5. `npm run test`
6. `npm run build`

Trigger เมื่อ Push/Pull Request เปลี่ยนไฟล์ `frontend/**` หรือ Workflow และสามารถ Manual ผ่าน `workflow_dispatch`

### Step 23 — ตรวจ Frontend .gitignore

ยืนยันว่า `frontend/.env.local` ถูก Ignore จากกฎ `*.local` ใน `frontend/.gitignore` และ `.env.local` ไม่ถูก Git track

### Step 24 — สร้าง Root .gitignore

เพิ่ม Ignore rules ระดับ Repository สำหรับ dependencies, build outputs, environment files, logs, temporary files, editor และ OS files พร้อมอนุญาต `.env.example`

### Step 25 — ตรวจไฟล์ก่อน Stage

ตรวจ Untracked Files, Environment Files และ potential secret files ไม่พบไฟล์ประเภท private key/credentials ในรายการตรวจสอบ และ `.env.local` ไม่อยู่ใน Untracked Files

### Step 26 — Stage และแก้ whitespace

เพิ่มไฟล์โครงการเข้า Staging Area ตรวจพบ trailing whitespace ใน `ChatPage.tsx` และแก้ไข จากนั้น Stage ไฟล์ที่ตกหล่นและตรวจ `git diff --cached --check` จนผ่าน

### Step 27 — ตรวจ Staged Changes

ยืนยัน 40 ไฟล์ รวม 7,901 insertions ไม่มี Unstaged/Untracked changes และตรวจ `.env.example` ว่าไม่มี API secrets

### Step 28 — สร้าง Initial Commit

ตั้งค่า Git Identity และสร้าง Commit:

```text
574f8bd feat: initialize team portfolio and AI chat frontend
```

Working Tree สะอาดหลัง Commit

### Step 29 — สร้าง GitHub Repository

สร้าง Repository แบบ Private:

```text
https://github.com/waru1549/team-portfolio-ai
```

กำหนดให้ Repository ว่าง ไม่มี README/.gitignore/license auto-generated เพื่อหลีกเลี่ยงประวัติ Remote ที่ชนกับ Local Commit

### Step 30 — เชื่อม Remote และ Push Initial Commit

เพิ่ม `origin`, เปลี่ยน Branch จาก `master` เป็น `main` และ Push Initial Commit สำเร็จ จากนั้นยืนยันว่า `main` track `origin/main` และ Working Tree Clean

### Step 31 — ตรวจ GitHub Actions

GitHub Actions รัน Workflow `Frontend CI` สำหรับ Commit `574f8bd` ผลรวม SUCCESS โดย Checkout, Setup Node.js, Install Dependencies, ESLint, Tests และ Build ผ่านครบ

## Phase G — เอกสารและ README บน GitHub

### Step 32 — สร้าง Root README

สร้าง `README.md` ที่ Root เพื่ออธิบายโครงการ, สถานะ, tech stack, repository structure, วิธีติดตั้ง, scripts, API และ security notes

### Step 33 — Stage README

Stage เฉพาะ `README.md` และตรวจ `git diff --cached --check` ผ่าน

### Step 34 — Commit README และจัดการไฟล์ตกค้าง

สร้าง Commit:

```text
27a66ae docs: add project root README
```

ระหว่างตรวจ Working Tree พบไฟล์ชื่อผิดปกติที่เป็น Git Diff Output ถูกบันทึกไว้เป็นไฟล์โดยไม่ตั้งใจ ตรวจชื่อ, Unicode code points, hash และเนื้อหาก่อนยืนยันว่าเป็น Diff text ที่ไม่ใช่ต้นฉบับ README แล้วลบเฉพาะไฟล์ตกค้างดังกล่าว จากนั้น `git status` กลับมา Clean

### Step 35 — Push README Commit

Push Commit `27a66ae` ไป `origin/main` ตรวจ Local/Remote commit hash ตรงกัน, Branch status เป็น `main...origin/main` และยืนยันว่า Root README แสดงบน GitHub แล้ว

## Phase H — KUAi Frontend Enhancement และ Quality Assurance

หลังจาก Step 35 ได้มีการพัฒนาและปรับปรุง Frontend ต่อเนื่อง โดยรักษาโครงสร้าง React + TypeScript + Vite เดิมไว้ ไม่ได้เริ่มโครงการใหม่

### Step 36.1 — ปรับ Branding, Favicon และ SEO Metadata

ปรับภาพลักษณ์ผลิตภัณฑ์เป็น **KUAi — Know Us. Ask AI.**

ไฟล์ที่เกี่ยวข้อง:

- `frontend/index.html`
- `frontend/public/favicon.svg`

สิ่งที่เปลี่ยนแปลง:

- เปลี่ยน Page Title เป็น `KUAi | Know Us. Ask AI.`
- เพิ่ม Meta Description และ Robots Metadata
- เพิ่ม Open Graph Metadata สำหรับ Social Sharing
- เพิ่ม Twitter/X Metadata
- เปลี่ยน Vite Starter Favicon เป็น KUAi Favicon

### Step 36.2 — เพิ่ม English / Thai Support ใน Chat UI

ปรับ Chat Components ให้ใช้ Language Context เดิมของโปรเจกต์

ไฟล์ที่เกี่ยวข้อง:

- `frontend/src/components/chat/MessageBubble.tsx`
- `frontend/src/components/chat/MessageBubble.test.tsx`
- `frontend/src/components/chat/TypingIndicator.tsx`
- `frontend/src/components/chat/TypingIndicator.test.tsx`
- `frontend/src/pages/ChatPage.test.tsx`

สิ่งที่เปลี่ยนแปลง:

- รองรับ User/Assistant Labels ทั้ง EN และ TH
- รองรับ Typing Indicator ทั้ง EN และ TH
- เพิ่ม Automated Tests สำหรับข้อความทั้งสองภาษา
- เพิ่ม ChatPage Integration Test สำหรับ Thai Typing Indicator

ผลการทดสอบเฉพาะส่วนที่เกี่ยวข้องผ่านครบ

### Step 36.3 — ปรับ Unicode Character Counter

ปรับ `ChatComposer.tsx` จากการนับด้วย UTF-16 string length เป็น `Intl.Segmenter` เพื่อแบ่งข้อความตาม Grapheme Clusters

ไฟล์ที่เกี่ยวข้อง:

- `frontend/src/components/chat/ChatComposer.tsx`
- `frontend/src/components/chat/ChatComposer.test.tsx`

สิ่งที่เปลี่ยนแปลง:

- นับข้อความภาษาไทยตาม Grapheme Clusters
- รองรับ Combined Emoji
- จำกัดข้อความสูงสุด 2,000 Grapheme Clusters
- รองรับการตรวจสอบข้อความที่ถูก Paste เกินขีดจำกัด

เพิ่ม Automated Tests สำหรับ Thai Grapheme Count, Combined Emoji และ Maximum Message Length

### Step 36.4 — เพิ่ม Project Image Fallback

สร้าง `ProjectCover.tsx` เพื่อแยกการแสดงภาพหน้าปกโครงการออกจาก Project Card

ไฟล์ที่เกี่ยวข้อง:

- `frontend/src/components/portfolio/ProjectCover.tsx`
- `frontend/src/components/portfolio/TeamProjectSection.tsx`
- `frontend/src/components/portfolio/TeamProjectSection.test.tsx`

สิ่งที่เปลี่ยนแปลง:

- แสดง Placeholder เมื่อไม่มี `coverImage`
- ใช้ `onError` เมื่อรูปภาพโหลดไม่สำเร็จ
- รักษา Gradient Background และ Layout เดิม
- รองรับข้อความ Placeholder ภาษาอังกฤษและภาษาไทย

เพิ่ม Automated Tests สำหรับกรณีไม่มีรูปภาพและกรณีรูปภาพโหลดไม่สำเร็จ

### Step 36.5 — Cleanup Vite Starter Assets

ตรวจสอบ Import, References และ Git Tracking ก่อนลบไฟล์ที่ไม่ใช้งาน

ไฟล์ที่ลบ:

- `frontend/src/App.css`
- `frontend/src/assets/react.svg`
- `frontend/src/assets/vite.svg`
- `frontend/public/icons.svg`

ไฟล์ที่เก็บไว้:

- `frontend/src/index.css`
- `frontend/src/assets/hero.png`
- `frontend/public/favicon.svg`

หลัง Cleanup ตรวจสอบด้วย Git References Search, Production Build, Automated Tests, ESLint และ Production Preview

### Step 36.6 — ปรับปรุง Project Documentation

ปรับเอกสารให้ตรงกับ Branding, Architecture และสถานะปัจจุบันของ KUAi

ไฟล์ที่เกี่ยวข้อง:

- `README.md`
- `frontend/README.md`
- `docs/PROJECT_OVERVIEW_TH.md`
- `docs/FRONTEND_FILE_MAP_TH.md`
- `docs/FRONTEND_SETUP_HISTORY_TH.md`

เพิ่มเติมเนื้อหาเกี่ยวกับ Bilingual Support, Unicode Character Counter, Project Image Fallback, Static Asset Cleanup และสถานะ Backend Integration

---

## 37. สถานะหลัง KUAi Frontend Enhancement

### ผลการตรวจสอบล่าสุดจาก Local Development

| รายการ | สถานะ |
|---|---|
| React + TypeScript + Vite Frontend | Implemented |
| KUAi Branding และ Favicon | Implemented |
| SEO และ Social Sharing Metadata | Implemented |
| Group Portfolio UI | Implemented |
| English / Thai Language Support | Implemented |
| Interactive Chat UI | Implemented |
| Unicode-aware Character Counter | Implemented |
| Project Image Fallback | Implemented |
| Frontend Chat API Client | Implemented |
| Chat API Contract | Documented |
| Automated Tests | 65/65 Passed |
| Test Files | 12/12 Passed |
| ESLint | Passed |
| TypeScript Check | Passed |
| Production Build | Passed |
| Local Production Preview | Passed |
| Static Asset Cleanup | Completed |
| Git Whitespace Check | Passed |

### Production และ Integration Status

| รายการ | สถานะ |
|---|---|
| Existing Production Website | Deployed |
| Production URL | https://team-portfolio-ai.vercel.app/ |
| Latest Local Changes | Not yet deployed |
| Latest Changes Git Commit | Pending |
| Latest Changes GitHub Push | Pending |
| GitHub Actions for Latest Local Changes | Not yet verified |
| Express Backend | Pending Integration |
| PostgreSQL Integration | Pending |
| Live AI Model Integration | Pending |
| Persistent Conversation History | Pending |
| Authentication / Authorization | Not yet implemented / verified |

**ข้อควรระวัง:** Production Preview เป็นการทดสอบ Local Production Build ไม่ใช่การยืนยันว่า Local Changes ถูก Deploy ขึ้น Production แล้ว

ผล GitHub Actions ที่เคยยืนยันสำหรับ Commit `574f8bd` และ `27a66ae` เป็นผลของ Commit ในอดีต ไม่ใช่ผล CI สำหรับการแก้ไข Local รอบล่าสุด

---

## 38. แนวทางเพิ่มประวัติในอนาคต

หลัง Step 36 ให้เริ่มบันทึกงานใหม่ด้วย Step 37 เป็นต้นไป

ใช้ Template:

```markdown
### Step 37 — [ชื่อขั้นตอน]

- ไฟล์ที่แก้:
- เหตุผล:
- สิ่งที่เปลี่ยน:
- คำสั่งตรวจสอบ:
- ผลลัพธ์:
- Commit hash (ถ้ามี):
```

บันทึกเฉพาะงานที่ดำเนินการและตรวจสอบแล้วเท่านั้น

ไม่ควรระบุว่า Backend, Database, Live AI Integration หรือ Production Deployment ผ่าน หากยังไม่ได้ทดสอบในสภาพแวดล้อมจริง