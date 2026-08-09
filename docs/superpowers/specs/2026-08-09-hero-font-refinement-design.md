# Hero Font Refinement Design

## Goal

Give the “Marc Lally” hero heading a thinner, more modern display treatment while retaining a punchy condensed character.

## Approved Design

- Replace Barlow Condensed ExtraBold with **Saira Condensed Medium** at weight 500.
- Apply Saira Condensed only to the hero `h1`.
- Continue using Manrope everywhere else.
- Preserve the heading's content, size, color, margins, line height, letter spacing, and responsive rules.

## Implementation

Replace the Barlow Condensed Google Fonts request with Saira Condensed weight 500, change `.profile h1` to the new family and weight, and synchronize the source SCSS with both committed CSS files. Do not alter any other site styling or behavior.

## Verification

Per the requested workflow, skip browser checks. Confirm source consistency, run `git diff --check`, and inspect the final diff before committing and pushing to `main`.
