# Lingua Time: Date and Time Picker for ShadCN

<img width="1440" alt="Screenshot 2024-09-10 at 2 15 06 AM" src="https://github.com/user-attachments/assets/6ecc9d92-1ba9-4059-a527-4604413904d7">

## Installation

Pull this component into your project:

```shell
pnpx shadcn@canary add https://raw.githubusercontent.com/nainglinnkhant/lingua-time/refs/heads/main/public/r/lingua-time.json
```

Use with `react-form-hook`:

```tsx
<DateTimePicker
  name={name}
  dateTime={value}
  setDateTime={onChange}
  onBlur={onBlur}
  disabled={disabled}
  autoComplete="off"
  aria-describedby={undefined}
/>
```

## Development

Install the dependencies:

```bash
bun i
```

Run the development server:

```bash
bun dev
```
