# signal-data-grid

## future development thoughts

- table feature: data fetching
- table feature: fetching middleware function (allow users to transform data to our format)
- table feature: fetch crud operations
- table feature: CSV upload
- table feature: CSV download
- table feature: column sorting
- table feature: row grouping
- table feature: computed cells, totals, summary, custom
- column feature: expandable columns, show/hide
- row feature: add row
- row feature: delete row
- row feature: multi-select or group edit (don't want to sacrifice current UX for this feature, no extra click to edit)
- cell feature: date field options
- cell feature: cell formating function
- validation: cell validation, function or library or html5?
- validation: best way to show validation errors, bg or popover?
- styling: allow passing of classNames or leave to tailwind theming
- styling: editable column icon?
- styling: row striping
- styling: mobile - stacking or overflow scroll

### fundamental: row data

Array<Record<string, string | number | boolean | null>> seems like the corect choice for data being provided.
Should more proceessing be done at the table level to provide a more complete datastructure?

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/react-signals-data-grid-biamky)
