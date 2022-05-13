function EventCard ({ event }) {
    const { previewImage } = event;

    return <div className="card">
        <img src={previewImage} />
    </div>;
}

export default EventCard;
