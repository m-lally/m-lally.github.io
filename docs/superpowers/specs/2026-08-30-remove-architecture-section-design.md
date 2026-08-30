# Remove standalone Architecture section

## Goal

Remove the standalone Architecture section that appears immediately before Experience on the single-page work profile site.

## Scope

- Delete only the complete `<section class="site-section systems section-padding" aria-labelledby="systems-title">` block in `index.html`.
- Preserve all other page content, including SEO metadata, navigation, skills, experience descriptions, and any other uses of the word “architecture”.
- Do not modify CSS, JavaScript, generated assets, or unrelated markup.

## Validation

- Confirm the Architecture heading and section content are absent from `index.html`.
- Confirm the Experience section remains present immediately after the preceding section.
- Run the project’s relevant lint and test commands, plus the build if needed to verify the static site remains valid.
