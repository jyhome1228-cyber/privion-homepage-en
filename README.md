# Privion Homepage

Privion 홈페이지 구축을 위한 정적 HTML/CSS/JS 퍼블리싱 파일입니다.

본 저장소는 Figma 디자인 기준으로 제작된 페이지 구조, 공통 CSS/JS, 이미지 에셋, PDF 다운로드 파일, 검색 기능, 약관 페이지, 개인정보처리방침 페이지를 관리하기 위한 저장소입니다.

---

## 1. 페이지 구성

- HOME
- 기술 소개
- 제품 목록
- 제품 상세 DL100
- 제품 상세 DL100S
- 제품 상세 DL150
- 제품 상세 DL150S
- 적용 분야
- 문의
- 검색
- 이용약관
- 개인정보처리방침

---

## 2. 주요 파일 구조

```text
privion-homepage/
├── index.html
├── technology.html
├── product.html
├── product-dl100.html
├── product-dl100s.html
├── product-dl150.html
├── product-dl150s.html
├── application.html
├── contact.html
├── search.html
├── terms.html
├── privacy.html
│
├── assets/
│   ├── css/
│   │   └── privion.css
│   ├── js/
│   │   ├── privion-common.js
│   │   └── privion-search.js
│   ├── data/
│   │   └── search-data.json
│   ├── images/
│   │   ├── logo/
│   │   ├── home/
│   │   ├── technology/
│   │   ├── product/
│   │   ├── application/
│   │   ├── contact/
│   │   └── og/
│   └── download/
│       └── privion-dl-series-catalog.pdf
│
├── header.html
├── footer.html
├── head-meta.html
├── robots.txt
└── sitemap.xml
