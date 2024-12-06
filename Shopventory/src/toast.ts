import { toastController } from '@ionic/core';

// Function to show a toast notification
export async function toast(message: string, duration = 2000) {
    const toast = await toastController.create({
        message,
        duration,
        position: 'bottom', // Optional: You can set the position ('top', 'middle', 'bottom')
    });
    return toast.present();
}

