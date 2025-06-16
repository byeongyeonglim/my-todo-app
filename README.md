# Todo List Web App

사용자별 할 일 관리와 시간대별 타임라인 시각화를 제공하는 모던 웹앱입니다.

## 🛠️ 기술스택 & 주요 라이브러리

- ⚛️ **React** (Create React App 기반)
- 📅 **dayjs** (날짜/시간 처리)
- 🗂️ **MUI** (DatePicker, TimePicker 등 입력 UI)
- 🔗 **axios** (REST API 통신)
- 🗄️ **json-server** (로컬/네트워크 DB, 데이터 영속성)
- 🎨 **styled CSS** (모듈별 분리, 반응형)

## 🚀 배포 및 접속 방법

1. **빌드**
   ```
   npm run build
   ```
2. **gh-pages 등으로 배포**
   - `github-pages-guide.txt` 참고
   - 배포 후 주소 예시:  
     `https://<github-username>.github.io/<repo-name>/`
   - 브라우저에서 위 주소로 접속

## 주요 기능 및 구조

- 사용자별 할 일 CRUD 및 날짜/시간 범위 지정
- 오늘의 할 일 타임라인 시각화 (바 차트)
- json-server 연동으로 멀티 디바이스 지원
- 반응형, 미니멀/트렌디 UI

---

자세한 개발/배포 방법은 기존 CRA 문서를 참고하세요.
