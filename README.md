# YENMADE 醃造所 - 手工醃造，家的味道

Demo Website：https://lihan-06.github.io/YenMade-ReactProject/

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?logo=supabase)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite)
![Bootstrap](https://img.shields.io/badge/Styling-Bootstrap-7952B3?logo=bootstrap)

## 📖 專案說明

「吃進嘴裡的是美味，留在心裡的是家庭歲月。」

**YENMADE 醃造所** 是一個致力於傳承家傳食譜的電商平台。我們將傳統的醃製手藝與現代行銷結合，讓那些隱藏在各家餐桌上的靈魂小菜——不論是爽脆的醃黃瓜還是溫潤的梅子番茄，都能透過數位平台走向市場。本專案為一個完整的 React 電商實作，涵蓋從商品瀏覽、會員系統到多步驟結帳的流暢體驗。

## 🛠 使用技術

### 前端開發 (Frontend)

- **React**: 元件化前端框架，提升開發效率與代碼複用性。
- **JSX**: 撰寫語意化元件結構與 UI 組成。
- **JavaScript (ES6+)**: 處理專案邏輯、資料轉換與非同步操作 (`async/await`)。
- **React Hook**: 使用 `useState`、`useEffect` 管理複雜的元件狀態與生命週期。
- **React Router DOM**: 實作單頁應用 (SPA) 路由管理與頁面無縫切換。

### 樣式與環境建置

- **SCSS**: 模組化樣式管理，利用巢狀語法與變數提升 CSS 維護性。
- **Bootstrap 5**: 搭配 SCSS 客製化 UI 組件與響應式格線系統 (Grid System)。
- **Vite**: 高效的前端建置工具，並透過環境變數管理 API Base URL。

## 📦 使用套件與工具

- **HTTP 請求**: Axios (串接 Supabase 自動生成的 REST API)。
- **版本控制**: Git / GitHub。
- **套件管理**: Node.js / npm。

## 🖥 後端 API 與資料庫設計

本專案採用 **Supabase** (Backend-as-a-Service) 作為後端支撐：

- **PostgreSQL 資料庫**：使用 **SQL** 設計資料表結構與 **Foreign Key (外鍵)** 關聯。
- **Authentication**: 處理會員註冊、登入驗證機制。
- **REST API**: 前端透過 Axios 進行 CRUD 資料操作。
- **資料安全**: 配置 Row Level Security (RLS) 政策，確保使用者權限安全。

## 🌟 前台功能簡介

- **首頁**：新品展示、商品製作說明、消費者回饋。
- **產品列表**：提供產品分類篩選、分頁瀏覽功能。
- **產品詳情**：詳盡的產品圖文介紹、成分、規格說明及產品價格。
- **關於我們**：品牌故事、品牌理念。
- **部落格**：食譜、購買經驗分享、學術文章...等品牌相關文章。
- **常見問題**：FQA列表及搜尋功能。
- **購物車**：支援商品新增、數量修改、刪除功能。
- **結帳流程**：多步驟表單（收件資訊、配送方式、付款選擇）並建立正式訂單。

## 🚀 安裝和使用指南

### 1. 複製專案

```bash
git clone [https://github.com/LiHan-06/YenMade-ReactProject.git](https://github.com/LiHan-06/YenMade-ReactProject.git)
cd YenMade-ReactProject
```
