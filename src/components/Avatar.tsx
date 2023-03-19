import React, { useState } from 'react';
import Header from "@/components/Header";

function Avatar() {
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState('default-image.jpg');

    function loadImage() {
        const img = new Image();
        // FIXME Load Backend User Avatar
        img.src = '';
        img.onload = () => {
            setLoading(false);
            setImageUrl(img.src);
        };
        img.onerror = () => {
            setLoading(false);
        };
    }

    if (loading) {
        return <img src="/def_avatar.svg"
                    alt=""
                    className="cursor-container rounded" />;
    } else {
        return <img src={imageUrl}
                    onError={loadImage}
                    className="cursor-container rounded"/>;
    }
}
export default Avatar;
