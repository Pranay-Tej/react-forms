# React Forms

React Forms concepts and libraries

---

## Controlled forms

- Text Input
- Select
- Multi Select
- Radio Group
- Checkbox Group

---

## React Hook Form

- Basic form
  - `useForm()`
  - `register`
  - `errors`
  - `defaultValue`
  - `reset`
  - Inbuilt validators
- Multi Select
- Radio Group
- Checkbox Group
- Custom Validation
  - `validate`
- Cross-field Validation
  - `watch` + `useRef`
- Dynamic Validation
  - `mode: "all"`
  - `watch` + `useRef`
  - `watch` without `useRef`
  - `useWatch` with `multiple fields` + `useEffect`
  - `touchedFields`
- Async field validation
  - `validate` with `async` function
- Async field populate
  - `useWatch`
- API Integration
  - populate form values
  - handle dependent values with `useEffect` + `useWatch` + manual `setValue`
- MUI
  - Usage with MUI components

### Learning Resources

- [Official docs](https://react-hook-form.com/)
- [Examples](https://github.com/react-hook-form/react-hook-form/tree/master/examples)
- [CodeSandbox Examples](https://codesandbox.io/examples/package/react-hook-form)

---

## Development server

- Rename `.env.example` to `.env.local`

```bash
# run json-server for mock api
npm run api

# run dev server
npm run dev
```
