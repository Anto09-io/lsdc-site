/**
 * Embed YouTube responsive (16:9). Sans youtubeId, affiche un placeholder
 * sombre avec une icône play — à remplacer dès que la vidéo est prête
 * (aucun autre changement de code nécessaire, juste passer l'ID).
 */
export default function VideoEmbed({
  youtubeId,
  title,
}: {
  youtubeId?: string;
  title: string;
}) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-surface ring-1 ring-carbon/10">
      {youtubeId ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet">
            <div className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-ink" />
          </div>
          <p className="text-sm text-carbon/40">Vidéo à venir</p>
        </div>
      )}
    </div>
  );
}
