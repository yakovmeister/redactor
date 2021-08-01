<div align="center">
  <img src="https://github.com/yakovmeister/redactor/blob/master/logo.png?raw=true">
  <h1>lib-redactor</h1>
  <p>Another library that will help you ██████ texts with ease.</p>
  <a href="https://github.com/yakovmeister/redactor/actions/workflows/ci.yml"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/yakovmeister/redactor/CI"></a>
  <a href="http://www.wtfpl.net/"><img
       src="https://github.com/yakovmeister/redactor/blob/master/wtfpl-badge.png?raw=true"
       width="82" height="20" alt="WTFPL" /></a>
  <a href="https://codeclimate.com/github/yakovmeister/redactor/maintainability"><img src="https://api.codeclimate.com/v1/badges/4442667edb00e0b281dc/maintainability" /></a>
  <a href="https://codeclimate.com/github/yakovmeister/redactor/test_coverage"><img src="https://api.codeclimate.com/v1/badges/4442667edb00e0b281dc/test_coverage" /></a>
  <a href="https://snyk.io/test/npm/lib-redactor"><img src="https://snyk.io/test/npm/lib-redactor/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/npm/lib-redactor" style="max-width:100%;"></a>
  <a href="https://www.npmjs.com/package/lib-redactor"><img alt="npm" src="https://img.shields.io/npm/dm/lib-redactor"></a>
</div>
<br />
<br />

## Installation  
  
```
npm install -S lib-redactor
```  
  
## Usage  
  
```typescript
import redactor from "lib-redactor";
  
const redactMe = {
  first_name: "John",
  last_name: "Doe",
  phone_number: "6969696969",
  email: "john.doe69@email.com"
};

const redactionRule = redactor(["phone_number", "email"]);

const redacted = redactionRule(redactMe);

console.log(redacted);
/// will log the following:
/// {
///   "first_name": "John",
///   "last_name": "Doe",
///   "phone_number: "6████████9",
///   "email": "j██████████████████m"
/// }
```  
### Changing mask character  
  
```typescript
import redactor from "lib-redactor";
  
const redactMe = {
  first_name: "John",
  last_name: "Doe",
  phone_number: "6969696969",
  email: "john.doe69@email.com"
};
const options = {
  maskCharacter: "X"
};
const redactionRule = redactor(["phone_number", "email"], options);

const redacted = redactionRule(redactMe);

console.log(redacted);
/// will log the following:
/// {
///   "first_name": "John",
///   "last_name": "Doe",
///   "phone_number: "6XXXXXXXX9",
///   "email": "jXXXXXXXXXXXXXXXXXXm"
/// }
```  
## License  
lib-redactor is [WTFPL licensed](LICENSE).