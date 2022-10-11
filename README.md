# Type-22

Based on keybr.com and my earlier project, typer.

## Main Mode: Generated Lessons
*Heavily* inspired by keybr.com but uses real, commonly used words for training instead of word fragments generated based on phonetic rules.
User is presented with a lesson

## Components
### Lesson Display
- Shows the words the user is to type in
- **Sub-Components**
  - Key
    - **State**
      - AwaitingInput
        - (waiting for user to press *this* key)
      - AwaitingCorrectedInput
      - Inactive (letters are to be typed before this one)


### Development

First, run the development server.

```
bun dev
```

Open http://localhost:3000 with your browser to see the result.
