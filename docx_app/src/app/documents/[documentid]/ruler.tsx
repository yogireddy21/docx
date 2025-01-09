const markers = Array.from({ length: 83 }, (_, i) => i);

const Ruler = () => {
    return (
        <div className="h-6 border-b border-gray-300 flex items-end relative select-none print:hidden">
            <div
                id="ruler-container"
                className="max-w-[816px] mx-auto w-full h-full relative"
            >
                <div className="absolute inset-x-0 bottom-0 h-full">
                    <div className="relative h-full w-[816px]">
                        {/* Rendering each marker */}
                        {markers.map((i) => (
                            <div
                                key={i}
                                className="absolute bottom-0"
                                style={{
                                    left: `${(100 / markers.length) * i}%`,
                                }}
                            >
                                {/* Shorter ticks for major markers */}
                                {i % 10 === 0 ? (
                                    <div className="h-3 w-[1px] bg-gray-700" />
                                ) : (
                                    <div className="h-2 w-[1px] bg-gray-500" />
                                )}

                                {/* Show numbers at specific positions (1, 2, 3) */}
                                {i === 1 || i === 2 || i === 3 ? (
                                    <div
                                        className="absolute bottom-5 text-xs text-gray-700"
                                        style={{
                                            left: "-50%",
                                            transform: "translateX(-50%)",
                                        }}
                                    >
                                        {i}
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ruler;
