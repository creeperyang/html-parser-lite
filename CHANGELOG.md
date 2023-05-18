# 1.0.0

- Main API change: `parse(html, options)`.

# 0.2.2

- Fix attrutes parse error (case: `alt=""` --> `alt='""'`);
- Node (type: `ELEMENT_NODE`) will always has `id` & `className` properties, and the value is always string (empty string if not set).
