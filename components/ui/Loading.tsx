export function Loading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="loading" role="status">
      <p>{message}</p>
    </div>
  );
}
