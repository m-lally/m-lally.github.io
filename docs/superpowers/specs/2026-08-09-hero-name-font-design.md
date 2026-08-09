# Hero Name Font Design

## Goal

Make the “Marc Lally” hero heading feel punchier, more modern, and more editorial without changing any other part of the personal profile site.

## Approved Design

- Use **Barlow Condensed ExtraBold** for the hero `h1` only.
- Continue using **Manrope** everywhere else.
- Load Barlow Condensed at weight 800 through the site's existing Google Fonts import.
- Preserve the heading's existing font size, weight, line height, letter spacing, color, margins, responsive rules, and content.

## Implementation Boundary

Update the font import and the `.profile h1` font family in the source SCSS, then regenerate or synchronize the committed CSS outputs. Do not alter HTML structure, JavaScript, copy, colors, spacing, layout, animation, or other typography.

## Verification

- Confirm the heading resolves to `"Barlow Condensed", sans-serif`.
- Run the existing unit and responsive layout tests.
- Review the diff to confirm that only the font import and hero heading family changed, aside from generated source-map metadata if regeneration requires it.
