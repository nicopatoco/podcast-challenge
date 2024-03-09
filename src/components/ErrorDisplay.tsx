type ErrorDisplayProps = {
  error: string;
};

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  return <div>Error fetching podcasts: {error}</div>;
}
