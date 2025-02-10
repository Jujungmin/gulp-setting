# gulp세팅해보기!
프로젝트에서 gulp 사용으로 세팅까지 스스로 해보는게 좋을  거 같아 시작해보았다.

## 내가 구현하고자 하는 부분
- gulp 설치
- gulpfile 작업
- 파일구조 만들기
- gulp 플러그인 설치


## gulp 설치
- 처음 gulp 5.0 설치, gulpfile문법을 4.0으로 하여 제대로 구현이 되지 않았다.
- 5.0 은 2024년에 출시된 것으로 4.0이 안정적일 거라 생각해 4.0 으로 선택했다.
- 전역(global)로 설치하지 않고 로컬로만 관리
### 1. node와 npm 먼저 설치
### 2. gulp 설치
``` bash
$ npm install --save-dev gulp@4.0.2
& gulp -v // 4.0.2
```

### 3. gulpfile.js 만들기
   - packagefile.js를 만들고 이곳에서 세팅한다.
``` javascript
const gulp = require('gulp');

gulp.task('default', function() {
  console.log(`gulp default 수행!`);
});

// 터미널에서 gulp default
```

### 4. 파일구조만들기
1. `src(source)`, `dist(distribution)` 폴더 만들기
> `src` 내가 작업할 곳
> `dist` 작업한 것을 gulp에 의해 빌드된 곳

``` bash
src/
  |- common/
    |- css/
    |- fonts/
    |- js/
  |- pc/
    |- css/
    |- html/
      |- include/
    |- js/
  |- status.html
dist
node-modules
gulpfile.js
package.json
package-lock.json
```

#### 4-1. 먼저 플러그인 설치
1. `npm install gulp-concat --save-dev`
   - 자바스크립트 파일을 하나의 파일로 병합해 주는 플러그인


- 만일 설치 시 다운그레이드 해야 할 경우
  1. `npm uninstall 삭제할모듈이름`
  2. `npm install 모듈이름@원하는버전`
---

``` json
// package.json
{
  "devDependencies": {
    "browser-sync": "^3.0.3",
    "gulp": "^5.0.0",
    "gulp-concat": "^2.6.1",
    "gulp-file-include": "^2.3.0",
    "gulp-sass": "^5.1.0",
    "gulp-sourcemaps": "^3.0.0",
    "gulp-uglify": "^3.0.2",
    "gulp-watch": "^4.3.11",
    "sass": "^1.84.0"
  },
  "dependencies": {
    "del": "^5.0.0"
  }
}
```

- 설치한 플러그인 설명
1. `browser-sync`
- 기능: 로컬 개발 서버를 생성, 파일 변경 시 브라우저 자동으로 새로고침
- 사용목적
  - HTML,CSS,JS 파일이 변경될 때 브라우저를 자동 업데이트
  - 여러 브라우저나 디바이스 간 동기화된 테스트 가능
1. `gulp-concat`
 - 기능: 여러 파일을 하나의 파일로 병합
 - 사용목적: 여러 CSS 또는 JS 파일을 하나로 합쳐 네트워크 요청 수를 줄임
2. `gulp-file-inlcude`
 - 기능: HTML 파일에서 다른 파일을 포함할 수 있도록 지원
 - 사용목적: HTML 템플릿 시스템 구현(헤더, 푸터 포함)
3. `gulp-sass`
- 기능: SCSS(Sass) 파일을 CSS로 컴파일
4. `gulp-sourcemaps`
 - 기능: 소스맵을 생성하여 컴파일된 코드와 원본 코드 간의 매핑 정보 제공 
5. `gulp-uglify`
- 기능: JS파일을 압축하여 크기를 줄이고 최적화
6. `gulp-watch`
- 기능: 지정된 파일의 변경 사항을 감지하고 변경 시 특정 작업(task)을 실행
- 사용목적: 실시간으로 파일 변경을 감지하여 자동으로 빌드 프로세스 실행
7. `sass`(Dart Sass)
 - Sass의 공식 구현체로 SCSS파일을 CSS로 컴파일하는 데 사용
 - 사용목적: 최신 Sass문법(@use, @foward 등)을 지원하며 빠른 컴파일 속도 제공

---

### Reference
[프로젝트 빌드 자동화 도구 gulp.js 시작하기](https://minzcode.tistory.com/entry/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%B9%8C%EB%93%9C-%EC%9E%90%EB%8F%99%ED%99%94-%EB%8F%84%EA%B5%AC-gulpjs-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0)
https://github.com/eu81273/gulp-step-by-step/tree/master/step01_hello_world<br/>
[Gulp.js](https://webclub.tistory.com/467)<br/>
[Gulp - 플러그인 설치 및 사용하기](https://lab.naminsik.com/3440)<br/>
[Gulp 4.0에서 추가되고 변경된 4개의 기능 정리](https://programmingsummaries.tistory.com/387)<br/>
[gulp 4.0 gulpfile.js 작성해 보기](https://blog.naver.com/mgveg/222296622608)<br/>
