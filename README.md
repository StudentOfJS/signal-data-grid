# signal-data-grid

## features

- uses tailwind, easy to theme
- uses signals to prevent uneccessary renders when updating fields
- uses default html5 for table and inputs
- column sorting
- empty field highlighting
- changed field highlighting
- editable and non-editable cells
- date picker cell
- cell validation

## future development
- table feature: CSV upload
- table feature: CSV download
- table feature: row grouping
- table feature: computed cells, totals, summary, custom
- column feature: expandable columns, show/hide
- row feature: add row
- row feature: delete row
- row feature: multi-select or group edit (don't want to sacrifice current UX for this feature, no extra click to edit)
- cell feature: date field options
- cell feature: cell formating function
- styling: allow passing of classNames or leave to tailwind theming
- styling: editable column icon?
- styling: mobile - stacking complete 

### fundamental: row data

Array<Record<string, string | number | boolean | null>> seems like the corect choice for data being provided.
Should more proceessing be done at the table level to provide a more complete datastructure?

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/react-signals-data-grid-biamky)
