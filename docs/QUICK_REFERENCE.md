# 📋 Quick Reference Card - Cosmic Player

## 🎯 Quick Navigation

| Need to...                    | Go to...                               |
| ----------------------------- | -------------------------------------- |
| Learn the basics              | `docs/CODE_GUIDE.md`                   |
| See what's documented         | `docs/DOCUMENTATION_UPDATE.md`         |
| Understand video player logic | `src/hooks/use-cosmic-player.ts`       |
| Modify player UI              | `src/components/cosmic-player.tsx`     |
| Change controls               | `src/components/player-controls.tsx`   |
| Edit background effects       | `src/components/cosmic-background.tsx` |
| Customize theme colors        | `tailwind.config.ts`                   |
| Add a new page                | `src/app/`                             |

## 🔑 Key Concepts (5-Minute Overview)

### 1. How Data Flows

```
useCosmicPlayer Hook (creates state)
    ↓
PlayerContext (shares state)
    ↓
Child Components (use state)
```

### 2. Main Components

- **CosmicPlayer**: Main container
- **CosmicBackground**: Animated space theme
- **PlayerControls**: Bottom control bar
- **AppHeader**: Top navigation

### 3. Important Files

```
src/
  ├── hooks/
  │   └── use-cosmic-player.ts    ← Player logic (THE BRAIN)
  ├── contexts/
  │   └── player-context.tsx      ← State sharing
  └── components/
      ├── cosmic-player.tsx       ← Main UI (THE BODY)
      ├── cosmic-background.tsx   ← Animations
      └── player-controls.tsx     ← Controls UI
```

## 🛠️ Common Tasks

### Add a Button

```tsx
<Button onClick={handleClick} className="bg-purple-500">
  Click Me
</Button>
```

### Add State

```tsx
const [myState, setMyState] = useState(false);
```

### Add Function

```tsx
const handleAction = () => {
  // Your code here
};
```

### Add CSS Class

```tsx
<div className="flex items-center gap-4 bg-black/80">Content</div>
```

## 🎨 Color Variables

```css
--cosmic-purple  /* Primary purple */
--cosmic-pink    /* Accent pink */
--cosmic-blue    /* Cool blue */
--cosmic-cyan    /* Bright cyan */
--cosmic-green   /* Success green */
```

Usage:

```tsx
className = 'text-cosmic-purple bg-cosmic-pink/20';
```

## 🔧 Useful Commands

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck

# Lint code
npm run lint
```

## 🎓 Learning Shortcuts

### Complete Beginner?

1. Read `docs/CODE_GUIDE.md`
2. Open `src/app/page.tsx`
3. Follow the comments

### Know React?

Start at `src/hooks/use-cosmic-player.ts`

### Know Next.js?

Check `src/app/layout.tsx` and route structure

### Want to style?

Look at `tailwind.config.ts`

## 📝 Comment Legend

```typescript
// ===== SECTION =====        ← Major section marker

/**
 * Multi-line explanation      ← Function/component docs
 * with details
 */

// Single line explanation     ← Inline comments

{/* JSX comment */}            ← UI element notes
```

## 🐛 Common Issues & Fixes

### Issue: Component not updating

**Fix**: Make sure you're using the setter function

```tsx
// ❌ Wrong
myState = newValue;

// ✅ Correct
setMyState(newValue);
```

### Issue: Can't access player state

**Fix**: Make sure component is inside PlayerProvider

```tsx
<PlayerProvider value={playerState}>
  <YourComponent /> {/* ✅ Can access context */}
</PlayerProvider>
```

### Issue: Hydration error

**Fix**: Use useEffect for client-only code

```tsx
useEffect(() => {
  // Code that runs only on client
}, []);
```

## 🎯 Quick Code Snippets

### Create New Component

```tsx
/**
 * My Component
 * Description of what it does
 */
export function MyComponent() {
  return <div>Hello!</div>;
}
```

### Add Click Handler

```tsx
const handleClick = () => {
  console.log('Clicked!');
};

<button onClick={handleClick}>Click</button>;
```

### Conditional Rendering

```tsx
{
  isVisible && <div>Show this</div>;
}
{
  isTrue ? <ComponentA /> : <ComponentB />;
}
```

### Loop Through Array

```tsx
{
  items.map((item, index) => <div key={index}>{item.name}</div>);
}
```

## 📚 Resources

- [React Docs](https://react.dev/learn)
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 💡 Pro Tips

1. **Read comments first** - They explain the "why"
2. **Experiment safely** - Git lets you undo mistakes
3. **Start small** - Change one thing at a time
4. **Use console.log** - Debug by printing values
5. **Check DevTools** - F12 opens browser tools

## 🚀 Next Actions

- [ ] Read CODE_GUIDE.md
- [ ] Explore a component file
- [ ] Change a color value
- [ ] Add a console.log
- [ ] Modify button text
- [ ] Create new component
- [ ] Add new feature

---

**Keep this handy while coding!** 📌
