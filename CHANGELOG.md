# 1.1.0

- Main API change: `parse(html, options)`.
- Adjust white space process logic.

# 0.2.2

- Fix attrutes parse error (case: `alt=""` --> `alt='""'`);
- Node (type: `ELEMENT_NODE`) will always has `id` & `className` properties, and the value is always string (empty string if not set).
