function EventCard({ event }) {
  const { previewImage } = event;

  return (
    <div className="card-container">
      <div className="card">
        <img className="preview-image" src={previewImage} />
        <p>{event.name}</p>
      </div>
    </div>
  );
}

export default EventCard;
