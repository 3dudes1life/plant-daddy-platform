PLANT DADDY — CONSUMER ALPHA 1.1.0
UI / UX READABILITY PASS

UPLOAD
Replace the root index.html in the existing plant-daddy-platform GitHub repo.
No Bash required.

DATA
- UI-only release.
- Local schema remains v7.
- Existing localStorage key remains plantDaddy.build10.state.
- Build 1.0 Garden data carries forward automatically on the same site/browser.

READABILITY / UX PASS
- Raised light and dark theme contrast for body, secondary, muted, helper and placeholder text.
- Stronger 2px form borders and larger form labels.
- Readable placeholders and entered values in light/dark mode.
- Clearer primary/secondary/disabled button states.
- Visible keyboard focus rings.
- Larger tap targets.
- Larger tiny labels used in metrics, cards and navigation.
- Dark-theme fixes for accent-filled buttons/badges and gradient insight cards.
- Better short-screen bottom-sheet sizing and safe-area spacing.
- Reduced-motion support.
- Added Settings > Readability 1.1 summary.

CONTRAST TOKEN CHECKS (approx.)
Light primary text / white: 16.93:1
Light secondary / white: 8.14:1
Light muted-placeholder / white: 5.45:1
White / primary green: 6.57:1
Dark primary text / field: 16.83:1
Dark secondary / field: 12.44:1
Dark muted / field: 8.76:1
Dark placeholder / field: 9.56:1
Dark filled-control text / green: 11.98:1

VALIDATION
- JavaScript syntax check passes.
- First-run onboarding runtime flow passes.
- Demo Garden runtime flow passes.
- Demo Lab runtime flow passes.
- Readability 1.1 modal runtime check passes.
- 71 inline action handlers checked; no missing functions.
- No fetch(), XMLHttpRequest, Cloudflare, MQTT URL, or /Users/ path present.

No cloud, accounts, real hardware, Hub #0001 or Mac Plant Daddy connection is added in 1.1.
