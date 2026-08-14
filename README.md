# NOY Yapı — noyyapi.com

Naif Oğulları Yapı için hafif çelik yapı tanıtım sitesi. React + TypeScript + Vite + Tailwind CSS ile geliştirildi; giriş sistemi yoktur, tek sayfalık tanıtım sitesidir.

## Geliştirme

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # dist/ klasörünü üretir
npm run preview # üretilen build'i yerelde önizler
```

## Yayına alma

`main` dalına yapılan her push, `.github/workflows/deploy.yml` üzerinden otomatik olarak GitHub Pages'e deploy eder (Settings → Pages → Source: "GitHub Actions" olarak ayarlanmalı).

Özel domain (`noyyapi.com`) `public/CNAME` dosyası ile tanımlıdır; domain sağlayıcınızda gerekli DNS kayıtlarını eklemeniz gerekir.
