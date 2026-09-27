# Checkpoint 自動歸檔與瘦身規範 (Checkpoint Archiving & Slimming Policy)

## 🎯 規範目標 (Goal)
避免 `Checkpoints.md` 隨專案開發累積過多紀錄（例如超過 20~30 個版本），導致 AI 助手 (Antigravity) 每次讀取時消耗過多 Token 與影響回應速度。

---

## 規則細則 (Rules)

### 1. 滾動式 5 次 Checkpoint 上限 (Rolling 5-Checkpoint Limit)
- 主 `Checkpoints.md` 僅維持 **最新 1 個穩定版本 + 上限 5 個次要變更紀錄 (Minor Checkpoints)**。
- 每次進行小修復或功能變更時，紀錄為 `v1.01`, `v1.02` ... `v1.05`。

### 2. 每滿 5 次自動歸檔整合 (Auto-Consolidation & Version Upgrade)
- 當累積到 **第 6 個 Checkpoint**，或是使用者宣告完成「穩定版」時：
  1. **升級版本號**：將前 5 次的變更總結歸納為下一個穩定版本（例如 `[v1.1]`）。
  2. **封存舊紀錄**：將已結案的舊細節紀錄轉存至同目錄下的 `Checkpoints_Archive.md`。
  3. **瘦身主檔案**：清空主 `Checkpoints.md` 中已歸檔的舊細節，確保主檔行數永遠維持在 **100 行以內**。

### 3. GitHub 遠端同步 (GitHub Sync)
- 每次完成 Checkpoint 歸檔或變更後，同步執行：
  - `git add Checkpoints.md Checkpoints_Archive.md`
  - `git commit -m "docs: checkpoint update [vX.X]"`
  - `git push origin main`
