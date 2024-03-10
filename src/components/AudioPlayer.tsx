type Props = {
  src: string;
};

export default function AudioPlayer({ src }: Props) {
  return (
    <audio className="w-full" src={src} controls>
      <source src={src} type="audio/mpeg" />
    </audio>
  );
}
