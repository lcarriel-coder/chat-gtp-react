


export const propsConsStreamUseCase = async (prompt: string) => {

    try {

        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        })


        if (!resp.ok) throw new Error('No se pudo realizar la comparación');

        const reader = resp.body?.getReader();
        console.log("reader",reader);
        
        if (!reader) {
            return null;
        }

        return reader;
        // const decoder = new TextDecoder();

        // let text = '';

        // while (true) {
        //     const { value, done } = await reader.read();
        //     if (done) {
        //         break;
        //     }
 
        //     const decodedChunk = decoder.decode(value, { stream: true });
        //     text += decodedChunk;
        // }


        // return {
        //     ok: true,
        //     ...data
        // }


    } catch (error) {

        return null;
        // return {
        //     ok: false,
        //     content: 'No se pudo realizar la comparación'
        // }
    }
}