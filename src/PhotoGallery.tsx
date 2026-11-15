import { useRef, useState } from 'react'
import { clubPhoto } from './club'

type Photo = { image: string; caption: string }

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [selected, setSelected] = useState(0)
  const photo = photos[selected]

  function step(offset: number) {
    setSelected((index) => (index + offset + photos.length) % photos.length)
  }

  return (
    <>
      <div className="gallery-grid">
        {photos.map(({ image, caption }, index) => (
          <button className="gallery-tile" type="button" key={image} aria-label={'Увеличить: ' + caption} onClick={() => {
            setSelected(index)
            dialog.current?.showModal()
          }}>
            <img src={clubPhoto(image)} alt="" width="508" height="508" loading="lazy" />
            <span>{caption} <span aria-hidden="true">↗</span></span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="photo-dialog"
        aria-labelledby="photo-caption"
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close() }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault()
            step(event.key === 'ArrowLeft' ? -1 : 1)
          }
        }}
      >
        <div className="photo-view">
          <button className="dialog-close" type="button" aria-label="Закрыть фотографию" onClick={() => dialog.current?.close()}>×</button>
          <img src={clubPhoto(photo.image)} alt="" width="508" height="508" />
          <div className="photo-controls">
            <button type="button" aria-label="Предыдущая фотография" onClick={() => step(-1)}>←</button>
            <p id="photo-caption" aria-live="polite">{photo.caption}</p>
            <button type="button" aria-label="Следующая фотография" onClick={() => step(1)}>→</button>
          </div>
        </div>
      </dialog>
    </>
  )
}
