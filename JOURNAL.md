# Learning Journal

*Last updated: 2026-02-08 23:28:51*

**Total entries:** 2

## Table of Contents
- [📌 Host](#section-host) (1)
- [💡 Learned](#section-learned) (1)

---

## 📌 Section: Host

*1 entries*

### 📌 Entry 1

**Description:** 1234")).toThrow();

**File:** `frontend/node_modules_root/zod/src/v4/classic/tests/template-literal.test.ts` (line 692)

**Language:** `typescript`

**Code snippet:**
```typescript
expect(() => connectionString.parse("mongodb://@host:1234")).toThrow();
  expect(() => connectionString.parse("mongodb://host:1234/defaultauthdb?authSourceadmin")).toThrow();
  expect(() => connectionString.parse("mongodb://host:1234/?authSourceadmin")).toThrow();
  expect(() => connectionString.parse("mongodb://host:1234/defaultauthdb?&authSource=admin")).toThrow();
  expect(() => connectionString.parse("mongodb://host:1234/?&authSource=admin")).toThrow();
});
```


## 💡 Section: Learned

*1 entries*

### 💡 Entry 1

**Description:** How to display the note at the center of the screen using fixed and inset csss properties

**File:** `frontend/src/components/Notesfield.tsx` (line 201)

**Language:** `typescript`

**Code snippet:**
```typescript
//@learned: How to display the note at the center of the screen using fixed and inset csss properties 
            className={`fixed bg-white z-2 ${isMaximized ? "inset-0" : "inset-4 md:inset-8 lg:inset-16"
                }`}
        >
            <div className="border-2 border-black flex flex-col h-full">
                <div className="border-b-4 border-black p-4 flex justify-between bg-white flex-shrink-0">
```


