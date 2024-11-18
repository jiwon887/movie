### 🎬 Movie Info App

영화 검색 및 소개 기능을 제공하는 리액트 기반의 웹 애플리케이션입니다

---

### 🚀 프로젝트 기본 정보

- **프로젝트 이름**: Movie Info App
- **설명**: 영화 및 TV 프로그램 정보를 검색하고 관리할 수 있는 웹 애플리케이션
- **주요 기능**:
  - 인기 영화 및 TV 프로그램 목록 제공
  - 영화 검색 및 필터링
  - 위시리스트 저장
  - 사용자 로그인 및 회원가입 기능

---

### 🛠 기술 스택

- **Frontend**: React.js, HTML, CSS
- **State Management**: React Hooks (useState, useEffect)
- **API**: [TMDB API](https://www.themoviedb.org/documentation/api)
- **User Management**: LocalStorage, SessionStorage
- **Routing**: React Router

---

### ⚙️ 설치 및 실행 가이드

### 1. 프로젝트 클론
```bash
git clone https://github.com/jiwon887/movie.git

### 2. 패키지 설치
``` bash
npm install

### 3. 애플리케이션 실행
npm start

기본적으로 <http://localhost:3000>에서 실행됩니다

### 4. 회원가입

회원가입 시 비밀번호는 본인 **TMDB** API키로 사용해야합니다

### 📂 프로젝트 구조

movie/
├── public/          
├── src/
│   ├── components/       
│   │   ├── Movie.js       # 기본 페이지
│   │   ├── Popular.js     # 인기 영화 목록
│   │   ├── Search.js      # 영화 검색
│   │   ├── Filter.js      # 영화 필터링 찾기
│   │   ├── Wishlist.js    # 즐겨찾기
│   │   ├── Signup.js      # 회원가입 페이지
│   │   └── Login.js       # 로그인 페이지
│   ├── APP.css            # css 전체 모음     
│   ├── utils/       
│   ├── App.js             # 메인 컴포넌트 및 라우팅
│   └── index.js     
