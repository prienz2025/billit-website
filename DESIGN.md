# billit — DESIGN.md

billit 마케팅 사이트의 **디자인 소스 오브 트루스**. 코드의 단일 토큰 파일은 `assets/billit-tokens.css`이며, 이 문서는 그 의도와 사용 규칙을 설명한다. 값과 문서가 어긋나면 `billit-tokens.css`가 정답이다.

---

## 1. 디자인 원칙

- **Toss풍 미니멀 + 캠퍼스 친화적 경쾌함**: 쿨그레이 뉴트럴 위에 emerald mint 브랜드 컬러로 포인트.
- **모바일 퍼스트**: 기본 컬럼 420px, 데스크톱 콘텐츠 폭 1120px로 확장. 타입 스케일도 모바일 기준이며 hero는 데스크톱에서 키운다.
- **한국어 가독성 우선**: 본문 줄간격을 넉넉히(1.6~1.75), 큰 한글 제목에는 음수 자간(-0.02~-0.03em).
- **부드러운 친근함**: 둥근 모서리(카드 16px, hero 패널 28px), 낮은 대비의 소프트 그림자.
- **절제된 모션**: 스크롤 진입 시 1회 리빌. `prefers-reduced-motion`이면 전부 비활성.

---

## 2. 컬러

### 브랜드 — billit green (emerald mint)
`--billit-500 #00C896`이 캐논 브랜드 컬러. 600+부터 흰 배경 위 AA 대비를 만족하도록 스케일이 튜닝됨.

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--billit-500` | `#00C896` | **메인 브랜드** — hero 그라데이션·아이콘·오버라인·점 등 비텍스트 채움 전용 |
| `--bg-brand-strong` | `#007A5A` | 흰 텍스트를 얹는 그린 표면 (대비 5.3:1, AA) |
| `--fg-brand` | `--billit-700 #008865` | 밝은 배경 위 브랜드 텍스트 |
| `--billit-50` | `#E7FBF4` | subtle 브랜드 배경 |

> **규칙**: 텍스트를 얹는 그린 면에는 `--billit-500`을 쓰지 말 것. 반드시 `--bg-brand-strong`(흰 텍스트) 또는 `--fg-brand`(그린 텍스트)를 쓴다.

### 뉴트럴 — 쿨그레이 (Toss-like)
`--gray-50 #F9FAFB`(페이지 배경) ~ `--gray-900 #191F28`(본문 최암). 텍스트는 시맨틱 별칭 사용:

| 별칭 | 매핑 | 용도 |
|------|------|------|
| `--fg-strong` | gray-900 | 제목 |
| `--fg-default` | gray-800 | 본문 |
| `--fg-muted` | gray-600 | 보조 |
| `--fg-subtle` | gray-500 | 캡션·플레이스홀더 |

### 시맨틱 상태
`--success #15B886`(브랜드 그린과 혼동 피하려 약간 더 차가운 그린) · `--info #3182F6` · `--warning #FF9500` · `--danger #F04452`. 각 `-bg` / `-fg` 변형 존재.

### 다크 섹션
그린 틴트 차콜: `--dark-900 #0B1813` ~ `--dark-600 #25453B`. 텍스트는 `--dark-on #F2F4F6`, 보조 `--dark-on-muted #9AA8A1`. 스테이션·푸터 등 다크 섹션에 사용.

---

## 3. 타이포그래피

- **폰트**: Pretendard Variable (CDN). 폴백 체인은 `--font-sans` 참조. 로컬 라이선스 폰트가 있으면 `fonts/`에 넣고 `@font-face`로 교체.
- **웨이트**: 400 / 500 / 600 / 700 / 800
- **자간**: 큰 한글 음수 트래킹(`--ls-tight -0.03em` ~ `--ls-snug -0.02em`), 오버라인 등 영문 대문자만 `--ls-wide 0.04em`.

### 타입 스케일 (모바일 기준 px) — 시맨틱 클래스 `.ds-*`

| 클래스 | size | weight | line-height | 용도 |
|--------|------|--------|-------------|------|
| `.ds-display` | 36 (데스크톱 48~56) | 800 | 1.25 | hero |
| `.ds-h1` | 28 | 700 | 1.35 | |
| `.ds-h2` | 24 | 700 | 1.35 | 섹션 타이틀 |
| `.ds-h3` | 20 | 600 | 1.35 | |
| `.ds-h4` | 18 | 600 | 1.35 | |
| `.ds-body-lg` | 17 | 400 | 1.6 | |
| `.ds-body` | 16 | 400 | 1.6 | 기본 본문 |
| `.ds-body-sm` | 15 | 400 | 1.6 | |
| `.ds-label` | 14 | 500 | 1.35 | |
| `.ds-caption` | 13 | 400 | 1.35 | |
| `.ds-overline` | 12 | 700 | 1.2 | 대문자·자간 넓힘, 그린 |

---

## 4. 간격 · 레이아웃

- **4px 베이스 스케일**: `--space-1`(4px) ~ `--space-24`(96px).
- **컨테이너**: 데스크톱 `--container-max 1120px`, 모바일 `--container-mobile 420px`.
- **섹션 수직 리듬**: `--section-y 80px`.

## 5. 라운딩

`--radius-xs 6` · `sm 8` · `md 12`(버튼·인풋 기본) · `lg 16`(카드) · `xl 20` · `2xl 28`(hero 패널) · `full 9999`.

## 6. 그림자 (소프트, 저대비)

`--shadow-xs/sm/md/lg`는 `rgba(23,31,40, …)` 기반 엘리베이션. 브랜드 강조 버튼은 `--shadow-brand 0 8px 24px rgba(0,200,150,.28)`.

---

## 7. 컴포넌트 패턴 (site.css)

- **버튼**: `.btn` + 변형 `--primary` / `--secondary` / `--dark` / `--ghost`, 크기 `--sm` / `--lg`. 기본 라운딩 `--radius-md`.
- **배지**: `.badge` + `--brand` / `--success` / `--solid`. 상태 점은 `.dot`.
- **카드**: pain / package / step / why / station 등 섹션별 카드. 라운딩 `--radius-lg`, `--shadow-sm~md`.
- **섹션 헤더**: `.section-head` (+`--center`), 내부 `.overline` → `.section-title` → `.section-sub` 순서.
- **다크 섹션**: `.section--dark`, 민트 배경 섹션은 `.section--mint`.
- **아이콘**: Lucide. `<i data-lucide="name" class="ic">`.

## 8. 모션 (motion.css + site.js)

- 스크롤 리빌: 대상에 `.reveal` 부여 → 뷰포트 진입 시 `.in` → 1.1s 후 클래스 제거(1회성).
- 그리드 자식은 `--i` 인덱스로 stagger.
- 적용 대상 셀렉터는 `site.js` 상단 목록에서 관리한다. **새 섹션·그리드를 추가하면 이 목록에 클래스명을 등록**해야 리빌이 동작한다.
- `prefers-reduced-motion: reduce`면 리빌 로직 전체 skip.

---

## 9. 접근성 체크리스트

- 텍스트 위 그린 면은 `--bg-brand-strong` 이상(AA) 사용.
- 토글(FAQ·모바일 메뉴)은 `aria-expanded` 동기화.
- 아이콘 단독 버튼은 `aria-label` 필수.
- 모션은 reduce 설정 존중.
