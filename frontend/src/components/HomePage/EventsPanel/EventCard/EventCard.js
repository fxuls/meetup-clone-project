function EventCard({ event }) {
  const { previewImage } = event;

  return (
    <div className="card">
      <div className="preview-image-container">
        <img className="preview-image" src={previewImage} />
      </div>
      <p>{event.name}</p>
    </div>
  );
}

export default EventCard;
