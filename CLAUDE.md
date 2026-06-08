# billit-website — CLAUDE.md

빌릿(billit) **소개용 정적 마케팅 홈페이지**. 캠퍼스 무인(QR) 대여 서비스의 랜딩 사이트다.

> ⚠️ 루트 `billit/`의 실서비스 플랫폼(backend / frontend / admin, P2P 렌탈)과는 **별개**다. 이 디렉토리는 그 서비스를 알리는 랜딩 페이지만 담는다. 실제 대여 진입점은 외부 링크 `https://billit.co.kr`.

---

## 서비스 한 줄 정의

노트북 충전기 · 거치대 · 무선마우스 3종("빌릿패키지")을 **캠퍼스 무인 스테이션에서 QR 스캔으로 즉시 대여 → 사용 → 같은 곳에 반납**. 앱 설치·회원가입 없음. 현재 거점: 건국대학교 상허기념도서관(24시간).

---

## 기술 스택

- **빌드리스 정적 사이트** — 프레임워크·번들러·npm 없음. HTML/CSS/JS 파일을 브라우저에서 직접 연다.
- **외부 의존성 2개 (CDN)**:
  - [Lucide](https://unpkg.com/lucide@latest) — 아이콘 (`data-lucide` 속성 + `lucide.createIcons()`)
  - [Pretendard Variable](https://cdn.jsdelivr.net/gh/orioncactus/pretendard) — 본문 폰트
- **JS**: 순수 바닐라 IIFE. 모든 블록이 요소 존재를 가드하므로 어느 페이지에서 로드해도 안전.
- 디자인 토큰은 plain CSS 커스텀 프로퍼티. 실서비스 앱(Tailwind 4 `@theme`)의 토큰을 미러링한 버전.

---

## 파일 구조

```
billit-website/
├── index.html          # 메인 랜딩 (Hero/Pain/패키지/이용법/스테이션/Why/FAQ/CTA)
├── how.html            # 이용 방법 상세
├── stations.html       # 스테이션 거점 안내
├── faq.html            # 요금·FAQ
├── terms.html          # → https://billit.co.kr/docs/terms.html 로 리다이렉트 (정본은 billit-frontend, noindex)
├── privacy.html        # → https://billit.co.kr/docs/privacy.html 로 리다이렉트 (정본은 billit-frontend, noindex)
├── favicon.ico / favicon.svg   # 파비콘 (billit-frontend에서 가져옴, 데스크탑/웹 전용)
├── assets/
│   ├── billit-tokens.css   # 디자인 토큰 단일 소스 (색/타이포/간격/그림자) — DESIGN.md 참조
│   ├── site.css            # 컴포넌트 스타일
│   ├── motion.css          # 스크롤 리빌 애니메이션
│   ├── site.js             # 헤더 스크롤 / 모바일 메뉴 / FAQ 아코디언 / 스크롤 리빌
│   ├── logo-wordmark.svg / logo-wordmark-white.svg / app-mark.svg
│   ├── ku-location.png     # 스테이션 위치 지도 이미지 (index·stations 카드)
│   └── og-image.png        # OG 공유 카드 이미지 (1200×630)
└── screenshots/        # 디자인 검수용 캡처 (.gitignore 처리됨, 커밋 대상 아님)
```

- **페이지 진입점은 `index.html`.** (구 파일명 `billit 소개 홈페이지.html`에서 변경됨)
- 4개 페이지가 동일한 `assets/` 3종 CSS + `site.js`를 공유한다.
- 페이지 간 링크: 서브페이지 헤더 로고/네비는 `index.html` 및 `index.html#package`로 연결.

---

## 로컬 미리보기

핫 리로드(저장 시 브라우저 자동 새로고침)는 `live-server`로 동작한다. 빌드 단계는 여전히 없다.

```bash
cd billit-website
npm install          # 최초 1회 — live-server devDependency 설치
npm run dev          # → http://localhost:3000 (저장 시 자동 리로드)
```

> 포트 3000은 `billit-frontend`(사용자 앱)와 같으므로 둘을 동시에 띄우지 않는다.

의존성 없이 빠르게 확인만 하려면 `python3 -m http.server 8000`도 가능하다(이 경우 수동 새로고침).

---

## 작업 규칙

- **디자인 토큰을 직접 수정하지 말고 `assets/billit-tokens.css`의 CSS 변수를 통해** 색/간격/타이포를 바꾼다. 컴포넌트(`site.css`)는 raw 값 대신 시맨틱 별칭(`--fg-strong`, `--bg-brand-strong` 등)을 쓴다. 규칙은 `DESIGN.md` 참조.
- **새 섹션 추가 시 스크롤 리빌 적용**: `site.js`의 리빌 셀렉터 목록(`.section-head`, `.*-grid` 등)에 클래스명을 추가해야 애니메이션이 붙는다.
- **아이콘 추가**: `<i data-lucide="아이콘명" class="ic"></i>` 마크업만 넣으면 `site.js`가 렌더. JS로 DOM을 새로 그린 경우 `lucide.createIcons()` 재호출 필요.
- **접근성 유지**: 토글류는 `aria-expanded`, 아이콘 버튼은 `aria-label`. `prefers-reduced-motion` 존중(리빌 자동 비활성).

---

## 배포 / SEO

- **배포 도메인**: `about.billit.co.kr` (서브도메인). apex `billit.co.kr`은 서비스 웹앱 전용, `www`는 apex로 리디렉션됨.
  - 도메인을 바꾸면 전 페이지의 `og:url`·`canonical`·`og:image` 절대경로를 함께 수정해야 한다.
- **메타/OG**: 메인 4페이지에 description·OG·Twitter Card·canonical·theme-color(`#00C896`) 적용. OG 공유 이미지는 `assets/og-image.png`(1200×630, 로고 기반 카드).
- **약관/개인정보**: `terms.html`·`privacy.html`은 `robots noindex`(법률문서, 검색 제외).
- **콘텐츠 사실관계**: 요금=빌릿패키지 시간당 500원(2·4시간 단위), 동시 대여 가능(백엔드 제한 없음), **회원가입은 필요**하되 "복잡한 가입 절차"는 없음("회원가입 불필요"로 쓰지 말 것). 사업자 정보·요금·약관 모두 반영 완료 — 더 이상 "준비 중" 플레이스홀더 없음.

---

## 커밋 규칙 (루트 공통)

```
{prefix}: {title}
prefix: Feat(기능), Chore(설정), Refactor(리팩토링/파일이동), Remove(삭제), Fix(버그수정)
```
`git push`는 사용자가 직접 수행. Claude Code는 push하지 않는다.
