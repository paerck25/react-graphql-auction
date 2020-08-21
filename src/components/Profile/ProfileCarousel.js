import React from 'react'
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import Dialog from '@material-ui/core/Dialog';


const ProfileCarousel = ( {open,setOpen,src} ) => {
    return (
        <Dialog 
        style={{width:'auto',height:'auto'}}
        open={open}
        onClose={() => setOpen(false)}
        onStart={() => setOpen(false)}
        >
            <img src={src}/>
        </Dialog>
    )
}

export default ProfileCarousel

