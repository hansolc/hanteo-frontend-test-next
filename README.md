# Next-Tabs

## 사용기술

- pnpm
- scss
- react v18
- next v14
- zod
- tanstack/react-query

## 아키텍쳐

```
src/
├── apps/
│ ├── api
| ├── banner
| ├── components
| ├── ...
├── components
| ├── ...
├── hooks
| ├── ...
├── lib
├── schema
├── styles
├── types
├── utils
```

Apps 내의 Compoennts 는 해당 경로의 컴포넌트이며 최상위 components, hooks 폴더는 각각 프로젝트 전체에 사용될 것으로 예상되는 컴포넌트와 커스텀 훅 입니다.

## 주요기능

### 1. query string tab 키를 보고 Header의 인덱스를 정합니다.

- `useEffect`을 통해 query string 값이 변경되면 className=cur 이 된 노드를 가져와 `scrollIntoView` 을 통해 화면에 보이게 위치시켰습니다.

### 2. 슬라이더형 배너

- 총 3개의 dummy data인 배너를 통해 슬라이드 형태로 좌,우 스와이프 이동은 금지하였습니다. mount시 무한루프 이벤트를 등록해 `translateX` 로 이동하며 `next/link` 을 통해 /banner/[1,2,3] 페이지 이동을 구현하였습니다.

### 3. 카테고리 콘텐츠 무한 스크롤

- root/page.tsx 서버 컴포넌트에서 api을 요청하여 카테고리 컨텐치 정보를 받아와 props로 넘겨줍니다.
- `SwipeWrapper` 컴포넌트로 해당 노드에서 좌,우 스와이프 감지시 query string tab 값을 변경하도록 하였습니다.
- `ContentList` 컴포넌트에서 `tanstackquery`의 `useInfiniteScroll` 훅을 통해 무한 스크롤을 구현하였습니다.
- data는 카테고리별 정보를 담고 있고, 미리 서버에서 받아온 콘텐츠 정보를 렌더링 후 가장 마지막에 노드를 추가하고 `useObserver` 훅에 등록합니다
- 해당 노드가 감지되면 `useInfiniteScroll`의 `fetchNextPage` 을 통해 등록한 api을 pagination 하여 호출하고 다음 노드에 붙여 무한 스크롤처럼 동작하도록 구현하였습니다.

### 4. Serverless 환경 구성

- Next.js 의 이점을 활용하고자 별도의 백엔드 서버 없이 데이터를 가져온는 간단한 Api Routes을 구현하였습니다.(app/api/contents/route.ts)
- 실제 DB접근은 하지 않고 배열을 만들어 return 합니다.

### 5. 서버 타입검증

- 안전한 서버 타입검증을 위해 `zod`을 도입하였습니다.
