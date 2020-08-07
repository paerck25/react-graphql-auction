import React from 'react'
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';

const ProfileCarousel = ( {open,setOpen,src} ) => {
    return (
        <div>
            <AutoRotatingCarousel
                autoplay={false}
                open={open}
                onClose={() => setOpen(false)}
                onStart={() => setOpen(false)}
                style={{ position: 'absolute' }}
            >
                <img src={src}/>
            </AutoRotatingCarousel>
        </div>
    )
}

export default ProfileCarousel
