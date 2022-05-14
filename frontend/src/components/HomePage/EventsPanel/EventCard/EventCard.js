function EventCard({ event }) {
  const { previewImage } = event;

  return (
    <div className="card">
      <div className="preview-image-container">
        <img className="preview-image" src={previewImage} />
      </div>
      <div className="card-info">
        <p>{event.name}</p>
      </div>
    </div>
  );
}

export default EventCard;
