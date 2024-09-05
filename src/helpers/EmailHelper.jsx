import emailjs from '@emailjs/browser'

const helpSendEmail = async (userName, userEmail, userPhone, myMessage) => {
    const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

    // console.log(`entry: ${userName}, ${userEmail}, ${myMessage}`);

    try {
        const response = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID, {
            user_name: userName,
            user_email: userEmail,
            user_phone: userPhone,
            message: myMessage,
        }, {
            publicKey: PUBLIC_KEY,
        }
        );
        // console.log(`emailjs DONE! response: ${JSON.stringify(response)}`);
        return 'Success';
    }
    catch (error) {
        // console.log('Email.js FAILED...', error);
        return 'Something went wrong';
    }
}

export default helpSendEmail;