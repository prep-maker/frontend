# PREP Maker

https://www.prep-maker.site/  
PREP Maker는 구조적 글쓰기를 도와주는 앱입니다. PREP 앱과 함께 P(주장, 주제) - R(이유, 설명) - E(예시) - P(주장, 주제 강조) 순서로 설득력있고 간결한 글을 쓸 수 있습니다.

## 사용법

![로그인 페이지](https://user-images.githubusercontent.com/80461702/159209265-baa73dbe-427e-490f-ae31-0c55e7bb9091.png)

1. 로그인을 합니다. 계정이 없으면 회원가입을 합니다.

![편집 페이지](https://user-images.githubusercontent.com/80461702/159209328-dae5e2ea-c01f-4e65-b333-366f276e25a9.png)
![편집 페이지](https://user-images.githubusercontent.com/80461702/159209337-00f274df-b928-415f-9fcd-d6224142c000.png)

2. 새 글을 생성합니다.
3. 블록을 생성합니다.
4. 블록 타입에 맞게 글을 씁니다.
5. 제목을 클릭하면 제목을 수정할 수 있습니다.
6. 블록 삭제 버튼을 눌러 블록을 삭제할 수 있습니다.

7. 블록을 드래그 앤 드롭하여 PREP 순서로 블록을 합체합니다. 문단 검사를 통과하지 못한 블록은 합체가 불가합니다.
8. 블록이 모두 합체되면 완료 버튼을 눌러 검토 페이지로 이동합니다.

![검토 페이지](https://user-images.githubusercontent.com/80461702/159209690-0d7ee104-5e7d-403a-8a48-59b5ad039bb1.png)

9. 검토페이지에서 문단을 클릭하여 문단을 수정할 수 있습니다.
10. 공유버튼을 눌러 다른 사람에게 공유할 수 있는 링크를 복사할 수 있습니다.

![피드백 페이지](https://user-images.githubusercontent.com/80461702/159209604-b1c9bd32-f023-47b1-af60-d52a42d889be.png)

11. 공유된 링크를 주소에 붙여넣으면 피드백 페이지가 열립니다.
12. 피드백 페이지에서 문단을 클릭하면 코멘트를 작성할 수 있습니다. 로그인하지 않은 사용자는 로그인 페이지로 이동할 수 있습니다.
13. 코멘트 작성 버튼을 누르면 pending 상태의 코멘트가 생성됩니다.
14. 완료 버튼을 눌러 전송, 취소를 선택할 수 있습니다. 전송 버튼을 누르면 코멘트가 저장됩니다. 취소 버튼을 누르면 pending 상태인 코멘트가 삭제됩니다.
15. 코멘트 작성자는 삭제 버튼을 눌러 작성된 코멘트를 삭제할 수 있습니다.

## 개발 기간

📆 2021. 2. 21. ~ 2021. 3. 13. (21일)

- 1주차(2.21. ~ 2.27.)
  - 브레인 스토밍
  - 목업 작성
  - 칸반보드 작성
  - 프로젝트 세팅
- 2주차(2.28. ~ 3.6.)
  - 기능 구현
  - 테스트 코드 작성
- 3주차(3.7. ~ 3.13.)
  - 프로젝트 기능 마무리
  - 테스트 코드 작성
  - 배포

## 기술스택

- Frontend
  - React
  - Redux
  - Typescript
  - Jest
  - Testing Library
- Backend
  - Express
  - Typescript
  - FxTS
  - Jest

## OOP

객체지향적 코드를 작성하고자 노력했습니다. 프론트엔드의 HttpClient 클래스는 싱글톤 패턴을 사용하여 앱이 실행되는 동안 인스턴스가 한번만 생성되도록 하였습니다. 프론트엔드, 백엔드 전반적으로 의존성 주입을 활용하여 모듈간 의존도를 낮추고자 하였습니다.

프론트엔드에서는 api 클래스의 인스턴스를 리덕스 thunk의 extra argument로 주입하였습니다. 덕분에 api 클래스를 모킹하여 테스트 코드를 더 수월하게 작성할 수 있습니다.

백엔드에서는 model, service, presenter, controller로 계층을 분리하였습니다. 데이터베이스와 연결되는 model 클래스와 인터페이스를 공유하는 stub 클래스를 작성하여 presenter 모듈의 테스트 코드에서 활용하였습니다.

## 타입스크립트

타입스크립트 덕분에 더 객체지향적인 코드를 작성할 수 있었습니다. 모듈끼리 인터페이스로 소통함으로서 안정적이면서도 모듈간 의존도가 낮은 앱을 만들 수 있었습니다.

외부에 노출할 필요가 없는 메소드들은 private 메소드로 지정함으로서 자바스크립트보다 더 강력하게 캡슐화할 수 있었습니다.

프로젝트가 90% 정도 완성되었을 때 기획 단계에서는 없었던 피드백 페이지를 추가하게 되었습니다. 이로 인해 백엔드 스키마를 수정해야 했습니다. 프로젝트가 많이 진행된 시점에 스키마를 수정해야한다는 점이 부담이었지만, 타입스크립트 덕분에 안정적이면서 비교적 적은 수정사항으로 새로운 기능을 추가할 수 있었습니다.

## FxTS

함수형 프로그래밍을 학습해보고자 함수형 라이브러리인 FxTS를 사용하였습니다. 제너레이터를 활용한 지연 평가 개념이 매우 흥미롭게 느껴졌습니다.

그런데 프론트엔드에서는 알아내지 못한 타입스크립트 컴파일 에러로 FxTS를 아예 활용하지 못했습니다. 원인을 밝혀 해결했다면 FxTS에 기여할 수 있었을텐데 그러지 못해 아쉬웠습니다.

백엔드에서도 DB에 동시에 여러 쿼리를 보내는 메소드를 작성할 때, FxTS를 활용한 것보다 Promise.all을 활용한 것이 약 50ms 빨랐기에 FxTS로 작성한 로직을 Promise.all로 수정해야 했습니다.

하지만 pipe 함수를 활용한 선언적 표현으로 가독성을 개선시킬 수 있다는 점은 매우 만족스러웠습니다. 특히 백엔드에서 에러를 처리할 때 try catch 구문을 FxTS의 pipe 함수와 catchError라는 유틸함수로 대체하여 전반적으로 가독성을 개선시킨 점이 가장 만족스럽습니다.
