import { getTypeLabel } from '@/lib/experiences';
import type { ResolvedTimelineEntry } from '@/types';

interface TimelineProps {
  entries: ResolvedTimelineEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <ol className="timeline">
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
