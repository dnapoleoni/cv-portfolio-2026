import type { ResolvedTimelineEntry } from '@/data/roles';

interface TimelineProps {
  entries: ResolvedTimelineEntry[];
}

function getTypeLabel(type?: string) {
  switch (type) {
    case 'contract':
      return 'Contract';
    case 'redundancy':
      return 'Role made redundant';
    default:
      return null;
  }
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <ol className="timeline" role="list">
      {entries.map((entry, i) => {
        const typeLabel = getTypeLabel(entry.type);
        return (
          <li key={i} className="timeline-item">
            <div className="timeline-date-row">
              <time className="timeline-date">{entry.date}</time>
              {typeLabel && <span className="timeline-type">{typeLabel}</span>}
            </div>
            <h3 className="timeline-role">{entry.role}</h3>
            <p className="timeline-company">{entry.company}</p>
            <p className="timeline-desc">{entry.description}</p>
          </li>
        );
      })}
    </ol>
  );
}
