# Page snapshot

```yaml
- banner:
  - button:
    - img
  - heading "회원가입" [level=1]
- text: 새 계정 만들기 아이디 *
- textbox "아이디를 입력하세요"
- text: 비밀번호 *
- textbox "비밀번호를 입력하세요 (6자 이상)"
- text: 비밀번호 확인 *
- textbox "비밀번호를 다시 입력하세요"
- button "회원가입"
- link "이미 계정이 있으신가요? 로그인":
  - /url: /register
- alert
- button "Open Next.js Dev Tools":
  - img
```