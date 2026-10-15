# Legacy release layers

This folder holds the historical UI release layers that are still loaded by the current portfolio. They remain in their original order so the published interface keeps its existing appearance and behavior.

The project root intentionally contains only the current entry files. Do not delete or reorder these release layers without a browser regression pass: several later files intentionally override earlier render functions.

The Git tag `portfolio-before-archive-2026-10-16` preserves the project exactly as it was before this reorganization.
