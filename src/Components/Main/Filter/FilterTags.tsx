import './FilterTags.css';

interface FilterTagProps {
  title: string;
  onRemove: (title: string) => void;
}

const FilterTag = (props: FilterTagProps) => {
  const { title, onRemove } = props;
  return (
    <span className="filter__tag">
      <span className="filter__tag_title">{title} </span>
      <button className="filter__tag_close" onClick={() => onRemove(title)}>
        <svg
          viewBox="0 0 28 28"
          data-rs-internal="removable-tag__close-icon"
          className="tags_crossIcon__svgWrapper"
          style={
            {
              "--rs-icon-ar-width": "28",
              "--rs-icon-ar-height": "28",
            } as React.CSSProperties
          }
        >
          <svg viewBox="0 0 16 16" className="tags_crossIcon__svg">
            <path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06"></path>
          </svg>
          <svg viewBox="0 0 20 20" className="tags_crossIcon__svg">
            <path d="M3.293 3.293a1 1 0 0 1 1.414 0L10 8.586l5.293-5.293a1 1 0 1 1 1.414 1.414L11.414 10l5.293 5.293a1 1 0 0 1-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L8.586 10 3.293 4.707a1 1 0 0 1 0-1.414"></path>
          </svg>
          <svg viewBox="0 0 24 24" className="tags_crossIcon__svg">
            <path d="M3.44 3.44a1.5 1.5 0 0 1 2.12 0L12 9.878l6.44-6.44a1.5 1.5 0 0 1 2.12 2.122L14.122 12l6.44 6.44a1.5 1.5 0 0 1-2.122 2.12L12 14.122l-6.44 6.44a1.5 1.5 0 0 1-2.12-2.122L9.878 12l-6.44-6.44a1.5 1.5 0 0 1 0-2.12"></path>
          </svg>
          <svg viewBox="0 0 28 28" className="tags_crossIcon__svg">
            <path d="M4.44 4.44a1.5 1.5 0 0 1 2.12 0L14 11.878l7.44-7.44a1.5 1.5 0 0 1 2.12 2.122L16.122 14l7.44 7.44a1.5 1.5 0 0 1-2.122 2.12L14 16.122l-7.44 7.44a1.5 1.5 0 0 1-2.12-2.122L11.878 14l-7.44-7.44a1.5 1.5 0 0 1 0-2.12"></path>
          </svg>
        </svg>
      </button>
    </span>
  );
};

const FilterTags = (props: { tags: string[], onRemove: (title:string) => void }) => {
  const { tags, onRemove } = props;
  console.log(props);
  return (
    <div className="filter__tags">
      {tags.map((tagProps, index) => (
        <FilterTag key={index} title={tagProps} onRemove={onRemove} />
      ))}
    </div>
  );
};

export { FilterTags };
